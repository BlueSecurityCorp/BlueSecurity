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
  'http://localhost:4321',
];

function corsHeaders(origin: string): Record<string, string> {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(data: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';

    // Wrap everything in try-catch so CORS headers are always returned
    try {
      // CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }

      if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405, origin);
      }

      let body: ContactBody;
      try {
        body = await request.json();
      } catch {
        return jsonResponse({ error: 'Invalid JSON' }, 400, origin);
      }

      // Validate required fields
      if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
        return jsonResponse({ error: 'Missing required fields' }, 400, origin);
      }

      // Build email
      const msg = createMimeMessage();
      msg.setSender({ name: 'BlueSecurity Contact', addr: 'contact@contact.bluesecurity.online' });
      msg.setRecipient('blue@bluesecurity.online');
      msg.setSubject(`[문의] ${body.inquiryType} - ${body.name}`);

      const textBody = [
        `이름: ${body.name}`,
        `이메일: ${body.email} (회신 시 이 주소로 보내주세요)`,
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

      const emailMessage = new EmailMessage(
        'contact@contact.bluesecurity.online',
        'blue@bluesecurity.online',
        msg.asRaw(),
      );
      await env.SEND_EMAIL.send(emailMessage);

      return jsonResponse({ ok: true }, 200, origin);
    } catch (e: any) {
      // Always return CORS headers even on unexpected errors
      return jsonResponse(
        { error: 'Internal server error', detail: e?.message ?? 'Unknown error' },
        500,
        origin,
      );
    }
  },
};
