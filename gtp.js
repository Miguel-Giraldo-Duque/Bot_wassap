import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: "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"// This is also the default, can be omitted
});


const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Is the sky red!"}],
  });

console.log(chatCompletion.choices[0].message);
