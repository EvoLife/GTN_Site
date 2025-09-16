export default async function handler(req, res) {
  // Устанавливаем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем preflight запросы
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, type } = req.body;
    
    if (!message || !type) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message and type are required' 
      });
    }

    // Telegram Bot конфигурация
    const TELEGRAM_BOT_TOKEN = '7608359591:AAHf7uO_sdSblv4Dy3MoDquECHOyxEh8lzA';
    const TELEGRAM_CHAT_ID = '48195187';

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML' // Используем HTML вместо Markdown для лучшей совместимости с русским текстом
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error('Telegram API error:', errorData);
      
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send message to Telegram',
        details: errorData
      });
    }

    const result = await telegramResponse.json();
    
    return res.status(200).json({ 
      success: true, 
      messageId: result.message_id 
    });

  } catch (error) {
    console.error('Function error:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message
    });
  }
}
