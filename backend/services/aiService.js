import axios from "axios";

export const generateTaskFromText = async (input) => {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is missing");
    }

    const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            model: "llama3-8b-8192",
            messages: [
                {
                    role: "system",
                    content: `
Convert user input into JSON with:
title (string),
description (string),
priority (low, medium, high),
dueDate (ISO or null)

Return ONLY JSON.
                    `
                },
                {
                    role: "user",
                    content: input
                }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    let text = response.data.choices[0].message.content;

    // clean response
    text = text.replace(/```json|```/g, "").trim();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.log("JSON PARSE ERROR:", text);
        return null;
    }
};