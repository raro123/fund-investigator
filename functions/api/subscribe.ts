interface Env {
  MAILERLITE_API_KEY?: string;
  MAILERLITE_GROUP_ID?: string;
}

interface PagesFunctionContext {
  request: Request;
  env: Env;
}

const MAILERLITE_SUBSCRIBERS_URL = 'https://connect.mailerlite.com/api/subscribers';

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const onRequestPost = async ({ request, env }: PagesFunctionContext) => {
  const apiKey = env.MAILERLITE_API_KEY;

  if (!apiKey) {
    return jsonResponse({ error: 'Email signup is temporarily unavailable. Please try again later.' }, 500);
  }

  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim().toLowerCase();

  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
  }

  const groups = env.MAILERLITE_GROUP_ID ? [env.MAILERLITE_GROUP_ID] : undefined;

  const response = await fetch(MAILERLITE_SUBSCRIBERS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      ...(groups ? { groups } : {}),
    }),
  });

  if (response.ok) {
    return jsonResponse({ ok: true });
  }

  if (response.status === 422) {
    return jsonResponse({ error: 'Please check the email address and try again.' }, 400);
  }

  return jsonResponse({ error: 'We could not reach the email service. Please try again in a minute.' }, 502);
};

export const onRequestGet = () =>
  jsonResponse({ error: 'Method not allowed.' }, 405);
