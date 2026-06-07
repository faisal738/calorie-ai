import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { foodName, quantity, unit } = await req.json();

  if (!foodName || foodName.trim().length < 2) {
    return NextResponse.json({ error: "Food name required" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
  }

  const prompt = `You are a nutrition expert. Analyze the nutritional content for: "${quantity || 1} ${unit || "serving"} of ${foodName}".

Respond ONLY with a valid JSON object. No markdown, no explanation, no extra text:
{
  "calories": <integer>,
  "protein": <number with 1 decimal>,
  "carbs": <number with 1 decimal>,
  "fat": <number with 1 decimal>,
  "fiber": <number with 1 decimal>
}

Base values on standard nutritional databases. Be accurate and realistic.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Gemini API error:", err);
      return NextResponse.json({ error: "Gemini API error" }, { status: 502 });
    }

    const geminiData = await response.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const nutrition = JSON.parse(cleaned);

    const required = ["calories", "protein", "carbs", "fat", "fiber"];
    for (const key of required) {
      if (typeof nutrition[key] !== "number") throw new Error(`Missing field: ${key}`);
    }

    return NextResponse.json({
      calories: Math.round(nutrition.calories),
      protein: parseFloat(nutrition.protein.toFixed(1)),
      carbs: parseFloat(nutrition.carbs.toFixed(1)),
      fat: parseFloat(nutrition.fat.toFixed(1)),
      fiber: parseFloat(nutrition.fiber.toFixed(1)),
      source: "ai",
    });
  } catch (err) {
    console.error("analyze-food error:", err);
    return NextResponse.json(
      { error: "Failed to analyze food. Please enter values manually." },
      { status: 500 }
    );
  }
}
