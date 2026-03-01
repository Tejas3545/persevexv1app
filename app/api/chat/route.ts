import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// Available Gemini Models (choose based on your needs):
// - "gemini-1.5-flash" - Fast & efficient (recommended for production)
// - "gemini-1.5-pro" - More powerful, slower but better quality
// - "gemini-2.0-flash-exp" - Latest experimental (if available in your region)
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// System prompt to configure the AI behavior
const SYSTEM_CONTEXT = `You are Persevex AI, a helpful customer support assistant for Persevex LLP - an innovative EdTech company in India.

Company Information:
- Name: Persevex LLP
- Location: 5a, 1A Cross Rd, Dollar Scheme Colony, 1st Stage, BTM 1st Stage, Bengaluru, Karnataka 560068
- Email: support@persevex.com
- Services: We offer cutting-edge courses in various domains including:
  * Software Development (Full Stack, MERN, Python, Java)
  * Data Science & AI/ML
  * Cloud Computing (AWS, Azure, GCP)
  * Digital Marketing
  * Financial Modeling
  * Engineering domains (AutoCAD, CATIA, SolidWorks, Drone Mechanics)
  * And many more specialized courses
- Features: Expert mentorship, hands-on projects, industry-recognized certifications, job placement assistance
- LMS Access: Students can register through our website for course access
- Recognition: NSDC and AICTE recognized institution

Your Role:
- Answer questions about courses, pricing, enrollment process
- Be friendly, professional, and helpful
- If asked about specific course details, encourage them to visit the courses page or contact support@persevex.com
- For enrollment, direct them to the enrollment form or LMS registration
- Keep responses concise (2-3 sentences max)
- If you don't know something specific, suggest they email support@persevex.com or call during business hours

Important:
- Never make up course prices or specific dates
- Always be encouraging about their learning journey
- Maintain a warm, supportive tone`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { 
          response: "I'm currently offline. Please email us at support@persevex.com or try again later. Our team will respond within 24 hours." 
        },
        { status: 200 }
      );
    }

    // Build conversation context
    const conversationContext = conversationHistory && conversationHistory.length > 0
      ? conversationHistory.map((msg: any) => 
          `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
        ).join('\n')
      : '';

    // Prepare the prompt
    const fullPrompt = `${SYSTEM_CONTEXT}

${conversationContext ? `Previous conversation:\n${conversationContext}\n` : ''}
User: ${message}
Assistant:`;

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", errorData);
      
      return NextResponse.json(
        { 
          response: "I'm having trouble connecting right now. Please email support@persevex.com for immediate assistance." 
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    
    // Extract the AI response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm here to help! Could you please rephrase your question?";

    return NextResponse.json({
      response: aiResponse.trim()
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    
    return NextResponse.json(
      { 
        response: "I'm experiencing technical difficulties. Please reach out to support@persevex.com and we'll assist you right away!" 
      },
      { status: 200 }
    );
  }
}
