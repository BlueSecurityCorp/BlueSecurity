import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext/browser';

interface Env {
  SEND_EMAIL: SendEmail;
}

interface ContactBody {
  name: string;
  email: string;
  company?: string;
  inquiryType: string;
  message: string;
}

const ALLOWED_ORIGINS = [
  'https://www.bluesecurity.online',
  'https://bluesecurity.online',
  'http://localhost:4321', // Astro dev
];

function corsHeaders(origin: string): Record<string, string> {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders(origin),
      });
    }

    let body: ContactBody;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }

    // Build email
    const msg = createMimeMessage();
    msg.setSender({ name: 'BlueSecurity 문의', addr: 'contact@contact.bluesecurity.online' });
    msg.setRecipient('blue@bluesecurity.online');
    msg.setHeader('Reply-To', { addr: body.email, name: body.name });
    msg.setSubject(`[문의] ${body.inquiryType} - ${body.name}`);

    const textBody = [
      `이름: ${body.name}`,
      `이메일: ${body.email}`,
      `회사명: ${body.company || '(미입력)'}`,
      `문의 유형: ${body.inquiryType}`,
      '',
      '--- 문의 내용 ---',
      '',
      body.message,
      '',
      '---',
      `발신 시각: ${new Date().toISOString()}`,
      `Origin: ${origin}`,
    ].join('\n');

    msg.addMessage({
      contentType: 'text/plain',
      data: textBody,
    });

    try {
      const emailMessage = new EmailMessage(
        'contact@contact.bluesecurity.online',
        'blue@bluesecurity.online',
        msg.asRaw(),
      );
      await env.SEND_EMAIL.send(emailMessage);
    } catch (e: any) {
      return new Response(JSON.stringify({ error: 'Failed to send email', detail: e.message }), {
        status: 500,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    });
  },
};
