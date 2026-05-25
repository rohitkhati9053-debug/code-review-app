const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are an expert code reviewer with 7+ years of development experience. 
Your role is to analyze and review code focusing on:
- Code Quality: Ensuring clean, maintainable, and well-structured code.
- Best Practices: Suggesting industry-standard coding practices.
- Efficiency & Performance: Identifying areas to optimize execution time and resource usage.
- Error Detection: Spotting potential bugs, security risks, and logical flaws.
- Scalability: Advising on how to make code adaptable for future growth.
- Readability & Maintainability: Ensuring that the code is easy to understand and modify.

Provide constructive feedback that is detailed yet concise, explaining why changes are needed.`
});

async function generateContent(prompt) {
    try {
        if (!prompt) {
            throw new Error('No code provided for review')
        }
        
        const result = await model.generateContent(prompt);
        const reviewText = result.response.text();
        
        console.log('Generated review successfully');
        return reviewText;
    } catch (error) {
        console.error('AI Service error:', error);
        throw new Error(`Failed to generate review: ${error.message}`);
    }
}

module.exports = generateContent
