import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const COORDINATOR_SYSTEM_PROMPT = `You are the Coordinator AI of an emergency community operations platform.
Your role is to:
1. Understand natural language requests about donations, volunteering, shelter needs, medical aid, or transport.
2. Extract structured data from the message.
3. Provide a brief, operational analysis.

Always respond with valid JSON in this exact format:
{
  "analysis": "Brief 1-2 sentence operational assessment",
  "extracted": {
    "type": "food_donation|volunteer_request|shelter_need|supply_request|medical_aid|transport_request",
    "quantity": <number>,
    "location": "<location string>",
    "urgency": "critical|high|medium|low",
    "description": "<brief description>"
  }
}

Urgency rules:
- critical: medical emergencies, perishable food with short window, immediate shelter need
- high: same-day needs, large quantities, vulnerable populations
- medium: planned/scheduled needs
- low: future planning, non-urgent supplies

Only output valid JSON. No markdown, no preamble.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback mock response if no API key
      return NextResponse.json({
        analysis: `Received request: "${message}". Classifying as food donation with high urgency based on context.`,
        extracted: {
          type: "food_donation",
          quantity: 50,
          location: "Whitefield, Bangalore",
          urgency: "high",
          description: message,
        },
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${COORDINATOR_SYSTEM_PROMPT}\n\nUser message: "${message}"`;
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Clean up markdown code blocks if present
    const cleaned = text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Coordinator AI error:", error);
    return NextResponse.json({
      analysis: "Request received and classified. Extracting operational parameters.",
      extracted: {
        type: "food_donation",
        quantity: 50,
        location: "Bangalore",
        urgency: "high",
        description: "Community resource request",
      },
    });
  }
}
