export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = await context.request.json();
    const { email, name } = body;

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, message: 'メールアドレスが無効です。' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const BREVO_API_KEY = context.env.BREVO_API_KEY;
    const BREVO_LIST_ID = parseInt(context.env.BREVO_LIST_ID || '2');

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

    const errorData = await brevoRes.json();

    if (errorData.message && errorData.message.includes('already')) {
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
      JSON.stringify({ success: false, message: 'サーバーエラー: ' + err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
