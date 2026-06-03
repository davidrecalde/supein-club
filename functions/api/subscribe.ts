interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
}

interface EventContext {
  request: Request;
  env: Env;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://supein.club',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestPost(context: EventContext) {
  const { request, env } = context;

  try {
    const body = await request.json() as { email: string; name?: string };
    const { email, name } = body;

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, message: 'メールアドレスが無効です。' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name || '' },
        listIds: [parseInt(env.BREVO_LIST_ID || '2')],
        updateEnabled: true,
      }),
    });

    if ([200, 201, 204].includes(brevoResponse.status)) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const errorData = await brevoResponse.json() as { message?: string };

    if (errorData.message?.includes('already')) {
      return new Response(
        JSON.stringify({ success: true, alreadySubscribed: true }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: '登録に失敗しました。再度お試しください。' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: 'サーバーエラーが発生しました。' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
