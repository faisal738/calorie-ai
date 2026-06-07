import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { foodName, quantity, unit, mode } = await req.json();

  if (!foodName || foodName.trim().length < 2) {
    return NextResponse.json({ error: "Food name required" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
  }

  // ---- SUGGEST MODE: return multiple matching foods with nutrition ----
  if (mode === "suggest") {
    const prompt = `You are a nutrition expert with a comprehensive food database. The user is searching for: "${foodName}".

Suggest up to 6 specific food items that match this search. Include common Indian, Western, Asian, and Mediterranean foods.
Each item must have accurate nutritional values per standard serving.

Respond ONLY with a valid JSON array. No markdown, no explanation, no extra text:
[
  {
    "name": "<specific food name>",
    "calories": <integer>,
    "protein": <number>,
    "carbs": <number>,
    "fat": <number>,
    "fiber": <number>,
    "serving_size": "<standard serving description e.g. 1 bowl (200g), 1 piece (30g)>"
  }
]

Rules:
- Each food name must be specific (e.g. "Chicken Biryani" not just "Chicken")
- Nutritional values must be per serving_size, NOT per 100g
- Be accurate and realistic based on standard nutritional databases
- Include variety — don't suggest 6 variations of the same dish`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 800,
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
      const suggestions = JSON.parse(cleaned);

      if (!Array.isArray(suggestions)) throw new Error("Expected array");

      const validated = suggestions
        .filter((s: Record<string, unknown>) =>
          typeof s.name === "string" &&
          typeof s.calories === "number" &&
          typeof s.protein === "number" &&
          typeof s.carbs === "number" &&
          typeof s.fat === "number"
        )
        .map((s: Record<string, unknown>) => ({
          name: s.name,
          calories: Math.round(Number(s.calories)),
          protein: parseFloat(Number(s.protein).toFixed(1)),
          carbs: parseFloat(Number(s.carbs).toFixed(1)),
          fat: parseFloat(Number(s.fat).toFixed(1)),
          fiber: parseFloat(Number(s.fiber || 0).toFixed(1)),
          serving_size: s.serving_size || "1 serving",
        }));

      return NextResponse.json({ suggestions: validated, source: "ai" });
    } catch (err) {
      console.error("suggest-food error:", err);
      return NextResponse.json({ suggestions: [], source: "ai" });
    }
  }

  // ---- ANALYZE MODE (default): return nutrition for a specific food ----
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
