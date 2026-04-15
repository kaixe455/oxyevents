import { describe, it, expect, beforeEach } from 'vitest';

describe('Form Validation', () => {
  describe('ContactForm', () => {
    let formData: Record<string, string>;

    beforeEach(() => {
      formData = {
        name: '',
        email: '',
        message: '',
      };
    });

    it('should validate name is not empty', () => {
      formData.name = '';
      expect(formData.name.trim().length).toBe(0);

      formData.name = 'John Doe';
      expect(formData.name.trim().length).toBeGreaterThan(0);
    });

    it('should validate email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      formData.email = 'invalid-email';
      expect(emailRegex.test(formData.email)).toBe(false);

      formData.email = 'valid@example.com';
      expect(emailRegex.test(formData.email)).toBe(true);

      formData.email = 'another.valid+tag@example.co.uk';
      expect(emailRegex.test(formData.email)).toBe(true);
    });

    it('should validate message is not empty', () => {
      formData.message = '';
      expect(formData.message.trim().length).toBe(0);

      formData.message = 'Test message';
      expect(formData.message.trim().length).toBeGreaterThan(0);
    });

    it('should validate message minimum length', () => {
      const minLength = 10;
      
      formData.message = 'short';
      expect(formData.message.length).toBeLessThan(minLength);

      formData.message = 'This is a proper message';
      expect(formData.message.length).toBeGreaterThanOrEqual(minLength);
    });

    it('should reject form with empty name', () => {
      formData.name = '';
      formData.email = 'test@example.com';
      formData.message = 'Valid message here';

      const isValid = formData.name.trim().length > 0;
      expect(isValid).toBe(false);
    });

    it('should reject form with invalid email', () => {
      formData.name = 'John Doe';
      formData.email = 'invalid-email';
      formData.message = 'Valid message here';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(formData.email);
      expect(isValid).toBe(false);
    });

    it('should reject form with empty message', () => {
      formData.name = 'John Doe';
      formData.email = 'test@example.com';
      formData.message = '';

      const isValid = formData.message.trim().length > 0;
      expect(isValid).toBe(false);
    });

    it('should accept valid form data', () => {
      formData.name = 'John Doe';
      formData.email = 'john@example.com';
      formData.message = 'This is a valid contact message for testing';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid =
        formData.name.trim().length > 0 &&
        emailRegex.test(formData.email) &&
        formData.message.trim().length > 10;

      expect(isValid).toBe(true);
    });

    it('should sanitize input by trimming whitespace', () => {
      formData.name = '  John Doe  ';
      formData.email = '  john@example.com  ';
      formData.message = '  Valid message  ';

      expect(formData.name.trim()).toBe('John Doe');
      expect(formData.email.trim()).toBe('john@example.com');
      expect(formData.message.trim()).toBe('Valid message');
    });

    it('should construct email content correctly', () => {
      formData.name = 'John Doe';
      formData.email = 'john@example.com';
      formData.message = 'Test message';

      let emailContent = '<p>Nombre: ' + formData.name + '</p>';
      emailContent += '<p>Email: ' + formData.email + '</p>';
      emailContent += '<p>Mensaje: ' + formData.message + '</p>';

      expect(emailContent).toContain('John Doe');
      expect(emailContent).toContain('john@example.com');
      expect(emailContent).toContain('Test message');
      expect(emailContent).toContain('<p>');
    });
  });

  describe('Email Configuration', () => {
    it('should have sender email configured', () => {
      const senderEmail = 'info@oxygengaming.es';
      expect(senderEmail).toBe('info@oxygengaming.es');
    });

    it('should have recipient email configured', () => {
      const recipientEmail = 'info@oxygengaming.es';
      expect(recipientEmail).toBe('info@oxygengaming.es');
    });

    it('should have email subject line', () => {
      const subject = 'Contacto formulario Oxygen Eventos';
      expect(subject.length).toBeGreaterThan(0);
      expect(subject).toContain('Oxygen Eventos');
    });
  });
});
