export default async function handler(req, res) {
  // Добавляем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, data } = req.body;
  const botToken = process.env.GTN_TELEGRAM_BOT;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    let message = '';
    
    if (type === 'application') {
      // Форма заявки
      message = `🚀 *Новая заявка на участие в GTN*\n\n` +
        `👤 *Имя:* ${data.firstName} ${data.lastName}\n` +
        `📧 *Email:* ${data.email}\n` +
        `📍 *Местоположение:* ${data.location}\n` +
        `💼 *Роль:* ${data.role}\n` +
        `🔗 *Портфолио:* ${data.portfolio || 'Не указано'}\n\n` +
        `🎯 *Что хочет создавать:*\n${data.build}\n\n` +
        `💡 *Как будет способствовать:*\n${data.contribute}\n\n` +
        `❓ *Почему GTN:*\n${data.why}`;
    } else if (type === 'contact') {
      // Форма контактов
      message = `📨 *Новое сообщение через форму контактов*\n\n` +
        `👤 *Имя:* ${data.name}\n` +
        `📧 *Email:* ${data.email}\n` +
        `📋 *Тема:* ${data.subject}\n\n` +
        `💬 *Сообщение:*\n${data.message}`;
    }

    // Отправка сообщения в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return res.status(500).json({ message: 'Failed to send message to Telegram', error: errorData });
    }

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
