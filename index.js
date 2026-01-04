const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios'); // Required for API communication

const client = new Client({
    authStrategy: new LocalAuth() // Persists your login session
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('--- SCAN THIS QR WITH YOUR WHATSAPP ---');
});

client.on('ready', () => {
    console.log('Chatbot is ONLINE and ready to serve!');
});

client.on('message', async (msg) => {
    // 1. Get your Flowise Prediction URL from the Flowise Canvas </> button
    const FLOWISE_URL = "https://cloud.flowiseai.com/api/v1/prediction/4e5cbf1b-2a44-44d6-aa31-c1a1eb02b4d2";

    try {
        // Forwarding the WhatsApp message to the AI Brain
        const response = await axios.post(FLOWISE_URL, {
            "question": msg.body
        });
        
        // 2. Reply back to WhatsApp with the AI's response
        msg.reply(response.data.text || response.data);
    } catch (e) {
        console.error('Error connecting to Flowise:', e.message);
    }
});

client.initialize();