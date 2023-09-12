import readline from "readline"
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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"// This is also the default, can be omitted
});


const userface = readline.createInterface({
    input : process.stdin,
    output: process.stdout
})

userface.prompt()
userface.on("line" , async input =>{
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": input }],
    });  
    console.log(chatCompletion.choices[0].message.content)
    userface.prompt()
} )

