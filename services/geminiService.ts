export async function sendMessageToGemini(message: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return "Sorry, the AI service is not configured. Please set up your Gemini API key.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "Sorry, I'm having trouble connecting to the AI service. Please try again later.";
  }
}

