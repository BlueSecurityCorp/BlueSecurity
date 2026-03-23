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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

function buildEmailHtml(body: ContactBody, timestamp: string): string {
  const name = escapeHtml(body.name);
  const email = escapeHtml(body.email);
  const company = escapeHtml(body.company || '(미입력)');
  const inquiryType = escapeHtml(body.inquiryType);
  const message = escapeHtml(body.message);

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#0a0e1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0e1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="padding:32px 40px;background:linear-gradient(135deg,#1e3a8a,#0f1d3d);border-radius:16px 16px 0 0;border-bottom:2px solid #3b82f6;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Blue</span><span style="font-size:20px;font-weight:800;color:#60a5fa;letter-spacing:-0.5px;">Security</span>
              </td>
              <td align="right">
                <span style="display:inline-block;padding:4px 12px;border-radius:20px;background-color:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.3);color:#93c5fd;font-size:12px;font-weight:600;">${inquiryType}</span>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:24px;font-weight:700;color:#ffffff;">새로운 문의가 접수되었습니다</p>
          <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">${timestamp}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:0;background-color:#0f1629;">

          <!-- Contact Info -->
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 40px 24px;">
            <tr><td style="padding-bottom:20px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#60a5fa;">문의자 정보</p>
            </td></tr>

            <!-- Name -->
            <tr><td style="padding-bottom:16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#151d38;border:1px solid #1e3a8a;border-radius:10px;padding:14px 18px;">
                <tr>
                  <td width="80" style="font-size:12px;color:#64748b;font-weight:600;vertical-align:top;">이름</td>
                  <td style="font-size:15px;color:#e2e8f0;font-weight:600;">${name}</td>
                </tr>
              </table>
            </td></tr>

            <!-- Email -->
            <tr><td style="padding-bottom:16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#151d38;border:1px solid #1e3a8a;border-radius:10px;padding:14px 18px;">
                <tr>
                  <td width="80" style="font-size:12px;color:#64748b;font-weight:600;vertical-align:top;">이메일</td>
                  <td><a href="mailto:${email}" style="font-size:15px;color:#60a5fa;text-decoration:none;font-weight:600;">${email}</a></td>
                </tr>
              </table>
            </td></tr>

            <!-- Company -->
            <tr><td style="padding-bottom:16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#151d38;border:1px solid #1e3a8a;border-radius:10px;padding:14px 18px;">
                <tr>
                  <td width="80" style="font-size:12px;color:#64748b;font-weight:600;vertical-align:top;">회사명</td>
                  <td style="font-size:15px;color:#e2e8f0;">${company}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px;">
            <tr><td style="height:1px;background:linear-gradient(to right,transparent,#1e3a8a,transparent);"></td></tr>
          </table>

          <!-- Message -->
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 40px 32px;">
            <tr><td style="padding-bottom:14px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#60a5fa;">문의 내용</p>
            </td></tr>
            <tr><td style="background-color:#151d38;border:1px solid #1e3a8a;border-left:3px solid #3b82f6;border-radius:10px;padding:20px 22px;">
              <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.7;">${message}</p>
            </td></tr>
          </table>

          <!-- Reply Button -->
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
            <tr><td align="center">
              <a href="mailto:${email}?subject=Re: [BlueSecurity] ${escapeHtml(body.inquiryType)} 문의 답변" style="display:inline-block;padding:12px 32px;background-color:#2563eb;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">
                ${name}님에게 답장하기
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px;background-color:#0a0e1a;border-radius:0 0 16px 16px;border-top:1px solid #1c2647;">
          <p style="margin:0;font-size:12px;color:#475569;text-align:center;">
            이 메일은 <a href="https://www.bluesecurity.online/contact" style="color:#60a5fa;text-decoration:none;">www.bluesecurity.online</a> 문의 폼에서 자동 발송되었습니다.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildPlainText(body: ContactBody, timestamp: string): string {
  return [
    `[BlueSecurity 문의 접수]`,
    '',
    `이름: ${body.name}`,
    `이메일: ${body.email}`,
    `회사명: ${body.company || '(미입력)'}`,
    `문의 유형: ${body.inquiryType}`,
    `접수 시각: ${timestamp}`,
    '',
    '── 문의 내용 ──',
    '',
    body.message,
    '',
    '──',
    'www.bluesecurity.online 문의 폼에서 자동 발송',
  ].join('\n');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';

    try {
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

      if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
        return jsonResponse({ error: 'Missing required fields' }, 400, origin);
      }

      const timestamp = new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const msg = createMimeMessage();
      msg.setSender({ name: 'BlueSecurity Contact', addr: 'contact@contact.bluesecurity.online' });
      msg.setRecipient('blue@bluesecurity.online');
      msg.setSubject(`[문의] ${body.inquiryType} - ${body.name}`);

      // HTML version (primary)
      msg.addMessage({
        contentType: 'text/html',
        data: buildEmailHtml(body, timestamp),
      });

      // Plain text fallback
      msg.addMessage({
        contentType: 'text/plain',
        data: buildPlainText(body, timestamp),
      });

      const emailMessage = new EmailMessage(
        'contact@contact.bluesecurity.online',
        'blue@bluesecurity.online',
        msg.asRaw(),
      );
      await env.SEND_EMAIL.send(emailMessage);

      return jsonResponse({ ok: true }, 200, origin);
    } catch (e: any) {
      return jsonResponse(
        { error: 'Internal server error', detail: e?.message ?? 'Unknown error' },
        500,
        origin,
      );
    }
  },
};
