const aiService = require("../services/ai.service")

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code

        if (!code) {
            return res.status(400).json({ error: "Code is required" })
        }

        if (typeof code !== 'string') {
            return res.status(400).json({ error: "Code must be a string" })
        }

        const response = await aiService(code)
        
        res.json({ review: response })
    } catch (error) {
        console.error('Review error:', error)
        res.status(500).json({ error: error.message || 'Failed to generate review' })
    }
}