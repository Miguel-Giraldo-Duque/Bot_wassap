import OpenAI from 'openai';
import { createRequire } from "module";
import { json } from 'express';
const require = createRequire(import.meta.url);

const openai = new OpenAI({
    apiKey: "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"// This is also the default, can be omitted
});


const qrcode = require('qrcode-terminal');

//Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

//Genera el código qr para conectarse a whatsapp-web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//Si la conexión es exitosa muestra el mensaje de conexión exitosa
client.on('ready', () => {
    console.log('Conexion exitosa nenes');
});


//Aquí sucede la magia, escucha los mensajes y aquí es donde se manipula lo que queremos que haga el bot



client.on('message', async message => { 
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message }],
    });     
    
    client.sendMessage(message.from, chatCompletion.choices[0].message.content);
    console.log(chatCompletion.choices[0].message.content)
}); 


client.initialize();

