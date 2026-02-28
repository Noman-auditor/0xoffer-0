/**
 * services/mailer.js
 * ──────────────────
 * Thin email abstraction. Swap the provider (Resend, Nodemailer,
 * SendGrid, Postmark) by changing the `send` implementation.
 * Currently: Resend (https://resend.com) — free tier 3,000/month.
 */

class Mailer {
  constructor() {
    this.provider = process.env.MAIL_PROVIDER || 'console'; // console | resend | sendgrid
    this.from     = process.env.MAIL_FROM || 'noreply@example.com';
  }

  async send({ to, subject, text, html, replyTo }) {
    switch (this.provider) {

      case 'resend': {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from:     this.from,
          to,
          subject,
          text,
          html:     html || `<pre>${text}</pre>`,
          reply_to: replyTo,
        });
        break;
      }

      case 'sendgrid': {
        const sgMail = await import('@sendgrid/mail');
        sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.default.send({
          from: this.from,
          to, subject, text,
          html: html || `<pre>${text}</pre>`,
          replyTo,
        });
        break;
      }

      case 'nodemailer': {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        await transporter.sendMail({
          from: this.from,
          to, subject, text,
          html:     html || `<pre>${text}</pre>`,
          replyTo,
        });
        break;
      }

      default: {
        // 'console' provider — useful for development
        console.log('\n📧 [MAILER] Email would be sent:');
        console.log('  To:     ', to);
        console.log('  From:   ', this.from);
        console.log('  Subject:', subject);
        console.log('  ReplyTo:', replyTo);
        console.log('  Body:   ', text);
        console.log('');
      }
    }
  }
}

export const mailer = new Mailer();
