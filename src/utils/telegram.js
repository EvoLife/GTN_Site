const TELEGRAM_BOT_TOKEN = '7608359591:AAHf7uO_sdSblv4Dy3MoDquECHOyxEh8lzA';
const TELEGRAM_CHAT_ID = '1234567890'; // Замените на ваш реальный chat_id

export async function sendToTelegram(type, data) {
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
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Failed to send message to Telegram');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}
