import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [review])

  async function reviewCode() {
    if (!code.trim()) {
      setReview('⚠️ Please enter some code to review')
      return
    }
    
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:4000/ai/get-review', { code })
      setReview(response.data.review)
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Unknown error occurred'
      setReview(`❌ Error: ${errorMsg}`)
      console.error('Review failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review"
            style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}
          >
            {loading ? 'Reviewing...' : 'Review'}
          </div>
        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
