import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { mockNGOs, mockVolunteers } from "@/data/mockData";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const OPERATIONS_SYSTEM_PROMPT = `You are the Operations AI of an emergency community operations platform.
You receive structured data about a need/request and must perform autonomous operational coordination.

Given the request data and available resources, you must:
1. Select the best matching NGO from the provided list
2. Select the best volunteer for the job
3. Estimate response time
4. List the specific actions you are taking
5. Describe the outreach sent

Respond with valid JSON only:
{
  "summary": "1-2 sentence operational summary of what you are doing",
  "result": {
    "matchedNGO": "<NGO name>",
    "assignedVolunteer": "<Volunteer name>",
    "estimatedTime": "<X minutes/hours>",
    "actions": ["action 1", "action 2", "action 3"],
    "outreachSent": "<brief description of alerts sent>"
  }
}

Only output valid JSON. No markdown.`;

export async function POST(req: NextRequest) {
  try {
    const { extracted } = await req.json();

    // Build context from mock data
    const ngoList = mockNGOs
      .filter((n) => n.status === "active")
      .map((n) => `${n.name} (${n.type}, ${n.location}, specialties: ${n.specialties.join(", ")})`)
      .join("\n");

    const volunteerList = mockVolunteers
      .filter((v) => v.status === "available")
      .map((v) => `${v.name} (${v.location}, skills: ${v.skills.join(", ")}, rating: ${v.rating})`)
      .join("\n");

    if (!process.env.GEMINI_API_KEY) {
      // Fallback mock response
      const fallbackNGO = mockNGOs.find((n) =>
        n.specialties.includes(extracted.type) && n.status === "active"
      ) || mockNGOs[0];
      const fallbackVol = mockVolunteers.find((v) => v.status === "available") || mockVolunteers[0];

      return NextResponse.json({
        summary: `Operations AI dispatched. Matched ${fallbackNGO.name} and assigned ${fallbackVol.name} for ${extracted.type} in ${extracted.location}.`,
        result: {
          matchedNGO: fallbackNGO.name,
          assignedVolunteer: fallbackVol.name,
          estimatedTime: "12–18 minutes",
          actions: [
            `Matched ${fallbackNGO.name} based on specialty and proximity to ${extracted.location}`,
            `Assigned ${fallbackVol.name} as primary volunteer (rating: ${fallbackVol.rating})`,
            `WhatsApp pickup request sent to ${fallbackVol.name}`,
            `Backup volunteers on standby within 8km radius`,
          ],
          outreachSent: `WhatsApp alert to ${fallbackVol.name} + broadcast to 5 nearby volunteers`,
        },
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${OPERATIONS_SYSTEM_PROMPT}

Request Details:
${JSON.stringify(extracted, null, 2)}

Available NGOs:
${ngoList}

Available Volunteers:
${volunteerList}

Perform operational coordination and respond with JSON.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleaned = text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Operations AI error:", error);
    const fallbackNGO = mockNGOs[0];
    const fallbackVol = mockVolunteers.find((v) => v.status === "available") || mockVolunteers[0];
    return NextResponse.json({
      summary: "Operations AI executing coordination workflow.",
      result: {
        matchedNGO: fallbackNGO.name,
        assignedVolunteer: fallbackVol.name,
        estimatedTime: "15 minutes",
        actions: [
          "Nearest NGO identified and contacted",
          "Volunteer assigned based on proximity and skills",
          "Outreach messages dispatched",
        ],
        outreachSent: "WhatsApp alerts sent to 3 volunteers",
      },
    });
  }
}
