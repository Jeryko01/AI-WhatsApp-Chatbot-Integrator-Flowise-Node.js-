# AI WhatsApp Chatbot Integrator (Flowise + Node.js)

This repository contains a smart WhatsApp chatbot implementation that integrates the **whatsapp-web.js** library with **Flowise AI** as a document-based Natural Language Processing (NLP) engine.

## 📺 Video Tutorial
Click the image below to watch the complete step-by-step video tutorial on how to set up this project:

[![Watch the tutorial](http://img.youtube.com/vi/X7Xd6jC7Bh8/0.jpg)](https://youtu.be/X7Xd6jC7Bh8)

---

## 🚀 Key Differences (Modification)
This project was developed by modifying the standard workflow of the public library to make it more dynamic:
* **Standard Workflow (GitHub):** Receives a message and replies with static text (e.g., "Hello").
* **Modified Workflow:** Receives a message from the user, sends it to the Flowise API via Axios, processes the answer based on a custom document database (PDF/Docx), and returns the intelligent response back to WhatsApp.

## 💡 Inspiration & Credits
This project was inspired by and built upon the following amazing resources:
* **[pedroslopez/whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)**: The core library providing the WhatsApp Web API wrapper.
* **[FlowiseAI](https://flowiseai.com/)**: The orchestration platform that allows us to build powerful RAG (Retrieval-Augmented Generation) flows using custom PDF documents.

## 🛠️ Tools and Libraries
* **whatsapp-web.js**: Gateway for Node.js to WhatsApp Web.
* **Axios**: Used to bridge the communication between WhatsApp and the AI server.
* **qrcode-terminal**: For terminal-based QR authentication.

## 📋 Installation Steps
1. **Prepare Folder:** `mkdir whatsapp-ai-bot && cd whatsapp-ai-bot`
2. **Init Node:** `npm init -y`
3. **Install Deps:** `npm install whatsapp-web.js qrcode-terminal axios`
4. **Run:** `node index.js`

## 💻 Example Usage

Copy and paste this code into your `index.js` file. Make sure to replace the `FLOWISE_URL` with your actual endpoint from the Flowise dashboard.

```javascript
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
    const FLOWISE_URL = "[https://cloud.flowiseai.com/api/v1/prediction/YOUR_FLOWISE_ID](https://cloud.flowiseai.com/api/v1/prediction/YOUR_FLOWISE_ID)";

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
