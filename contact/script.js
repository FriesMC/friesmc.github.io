document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Получаем данные формы
    const formData = {
        name: document.getElementById('name').value.trim(),
        telegram: document.getElementById('telegram').value.trim(),
        problem: document.getElementById('problem').value,
        comment: document.getElementById('comment').value.trim()
    };
    
    // Валидация
    if (!formData.name || !formData.telegram || !formData.problem) {
        showAlert('Пожалуйста, заполните обязательные поля', 'danger');
        return;
    }
    
    // Отправка данных
    try {
        await sendToTelegram(formData);
        showAlert('Сообщение отправлено! Мы свяжемся с вами в Telegram.', 'success');
        this.reset();
    } catch (error) {
        console.error('Ошибка:', error);
        showAlert('Ошибка при отправке. Пожалуйста, попробуйте позже.', 'danger');
    }
});

async function sendToTelegram(data) {
    // Используем бесплатный прокси-сервис (замените на свои значения)
    const botToken = '7461042577:AAE40_KkgdkfAXsq1E3SFi2_6TeIZ5p_SxU';
    const chatId = '-4636420852';
    
    const text = `📢 Новая заявка:\n\n` +
                `👤 Имя: ${data.name}\n` +
                `📱 Telegram: ${data.telegram}\n` +
                `❗ Проблема: ${data.problem}\n` +
                `📝 Комментарий: ${data.comment || 'Не указан'}`;
    
    // Отправляем через Telegram Bot API
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
        })
    });
    
    if (!response.ok) {
        throw new Error('Ошибка Telegram API');
    }
}

function showAlert(message, type) {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert alert-${type} mt-3`;
    alert.classList.remove('d-none');
    
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 5000);
}