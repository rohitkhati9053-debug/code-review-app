const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are an expert code reviewer with 7+ years of development experience.`
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
