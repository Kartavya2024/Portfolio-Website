import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Backend API Test Suite', () => {
  // Test 1: Health check endpoint
  describe('GET /api/health', () => {
    it('should return 200 OK and valid JSON health payload', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('database');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  // Test 2: Resume PDF download endpoint
  describe('GET /api/resume/pdf', () => {
    it('should serve valid PDF with correct content-type and disposition headers', async () => {
      const res = await request(app).get('/api/resume/pdf');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe('application/pdf');
      expect(res.headers['content-disposition']).toContain('attachment');
      expect(res.headers['content-disposition']).toContain('Kartavya_Garhwal_Resume.pdf');
      expect(Number(res.headers['content-length'])).toBeGreaterThan(100);
    });
  });

  // Test 3: Resume DOCX download endpoint
  describe('GET /api/resume/docx', () => {
    it('should serve valid DOCX document with proper Office Open XML headers', async () => {
      const res = await request(app).get('/api/resume/docx');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe(
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      expect(res.headers['content-disposition']).toContain('attachment');
      expect(res.headers['content-disposition']).toContain('Kartavya_Garhwal_Resume.docx');
      expect(Number(res.headers['content-length'])).toBeGreaterThan(100);
    });
  });

  // Test 4: Contact Form Validation & Security
  describe('POST /api/contact', () => {
    it('should reject requests with missing name with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ email: 'test@example.com', message: 'Hello this is a valid test message.' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toMatch(/name/i);
    });

    it('should reject requests with invalid email address with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ name: 'Test User', email: 'not-an-email', message: 'Hello this is a test message.' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toMatch(/valid email/i);
    });

    it('should reject requests with message shorter than 10 characters with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ name: 'Test User', email: 'user@example.com', message: 'Short' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toMatch(/10 and 2000 characters/i);
    });

    it('should detect honeypot spam and reject submission', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Spam Bot',
          email: 'bot@spam.com',
          message: 'Trying to spam this contact form',
          _hp: 'http://spam-link.com',
        });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toMatch(/spam/i);
    });

    it('should return 503 Service Unavailable when MongoDB is not connected', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Kartavya Recruiter',
          email: 'recruiter@techcorp.com',
          message: 'We are very impressed by your portfolio and would like to interview you!',
        });
      // In testing without live MONGODB_URI, readyState is 0 (disconnected), so it must return 503
      expect(res.status).toBe(503);
      expect(res.body.error).toMatch(/database|MONGODB_URI/i);
    });

    it('should save contact message and return 201 when MongoDB is connected', async () => {
      const mongoose = await import('mongoose');
      const originalReadyState = mongoose.default.connection.readyState;
      const originalSave = (await import('../src/models/Contact')).default.prototype.save;

      try {
        // Simulate connected state
        Object.defineProperty(mongoose.default.connection, 'readyState', {
          value: 1,
          configurable: true,
        });

        // Mock Contact.prototype.save
        const Contact = (await import('../src/models/Contact')).default;
        Contact.prototype.save = async function () {
          this._id = 'mocked_mongo_id_12345';
          this.createdAt = new Date();
          return this;
        };

        const res = await request(app)
          .post('/api/contact')
          .send({
            name: 'Kartavya Recruiter',
            email: 'recruiter@techcorp.com',
            message: 'We are very impressed by your portfolio and would like to interview you!',
          });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toMatch(/saved successfully/i);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data.email).toBe('recruiter@techcorp.com');
      } finally {
        // Restore
        Object.defineProperty(mongoose.default.connection, 'readyState', {
          value: originalReadyState,
          configurable: true,
        });
        const Contact = (await import('../src/models/Contact')).default;
        Contact.prototype.save = originalSave;
      }
    });
  });

  // Test 5: 404 Route handling
  describe('Undefined Routes', () => {
    it('should return 404 with standard JSON format for non-existent routes', async () => {
      const res = await request(app).get('/api/does-not-exist');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toMatch(/Route not found/i);
    });
  });
});
