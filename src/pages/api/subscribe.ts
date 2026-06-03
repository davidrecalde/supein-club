import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, message: 'メールアドレスが無効です。' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
    const BREVO_LIST_ID = parseInt(import.meta.env.BREVO_LIST_ID || '2');

    if (!BREVO_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, message: 'API key not configured' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: { FIRSTNAME: name || '' },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (brevoRes.status === 201 || brevoRes.status === 204 || brevoRes.status === 200) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: corsHeaders }
      );
    }

    const errorData = await brevoRes.json() as { message?: string };

    if (errorData.message?.includes('already')) {
      return new Response(
        JSON.stringify({ success: true, alreadySubscribed: true }),
        { status: 200, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: errorData.message || 'エラーが発生しました。' }),
      { status: 500, headers: corsHeaders }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: 'サーバーエラー: ' + String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
