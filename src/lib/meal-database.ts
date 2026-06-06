// ============================================================
// Curated Meal Database — 80+ meals across 4 cuisines
// ============================================================

import type { Meal } from "./types";

export const MEALS: Meal[] = [
  // ========================
  // INDIAN CUISINE
  // ========================
  { id: "in-1", name: "Roti (Whole Wheat)", cuisine: "indian", meal_type: "lunch", calories: 120, protein: 4, carbs: 20, fat: 3, fiber: 3, serving_size: "1 piece (30g)" },
  { id: "in-2", name: "Dal Tadka", cuisine: "indian", meal_type: "lunch", calories: 200, protein: 10, carbs: 28, fat: 6, fiber: 8, serving_size: "1 bowl (200ml)" },
  { id: "in-3", name: "Paneer Tikka", cuisine: "indian", meal_type: "dinner", calories: 260, protein: 18, carbs: 8, fat: 18, fiber: 2, serving_size: "6 pieces (150g)" },
  { id: "in-4", name: "Chana Masala", cuisine: "indian", meal_type: "lunch", calories: 220, protein: 9, carbs: 30, fat: 7, fiber: 8, serving_size: "1 bowl (200g)" },
  { id: "in-5", name: "Vegetable Biryani", cuisine: "indian", meal_type: "lunch", calories: 350, protein: 8, carbs: 55, fat: 10, fiber: 4, serving_size: "1 plate (250g)" },
  { id: "in-6", name: "Idli with Sambar", cuisine: "indian", meal_type: "breakfast", calories: 250, protein: 9, carbs: 42, fat: 4, fiber: 5, serving_size: "3 idlis + sambar" },
  { id: "in-7", name: "Palak Paneer", cuisine: "indian", meal_type: "dinner", calories: 280, protein: 15, carbs: 10, fat: 20, fiber: 4, serving_size: "1 bowl (200g)" },
  { id: "in-8", name: "Rajma Chawal", cuisine: "indian", meal_type: "lunch", calories: 380, protein: 14, carbs: 58, fat: 8, fiber: 10, serving_size: "1 plate" },
  { id: "in-9", name: "Masala Dosa", cuisine: "indian", meal_type: "breakfast", calories: 300, protein: 6, carbs: 40, fat: 12, fiber: 3, serving_size: "1 dosa" },
  { id: "in-10", name: "Aloo Gobi", cuisine: "indian", meal_type: "dinner", calories: 180, protein: 5, carbs: 22, fat: 8, fiber: 4, serving_size: "1 bowl (180g)" },
  { id: "in-11", name: "Moong Dal Khichdi", cuisine: "indian", meal_type: "lunch", calories: 250, protein: 10, carbs: 40, fat: 5, fiber: 6, serving_size: "1 bowl (220g)" },
  { id: "in-12", name: "Butter Chicken", cuisine: "indian", meal_type: "dinner", calories: 350, protein: 28, carbs: 10, fat: 22, fiber: 1, serving_size: "1 bowl (200g)" },
  { id: "in-13", name: "Poha", cuisine: "indian", meal_type: "breakfast", calories: 220, protein: 5, carbs: 38, fat: 6, fiber: 2, serving_size: "1 plate (180g)" },
  { id: "in-14", name: "Upma", cuisine: "indian", meal_type: "breakfast", calories: 200, protein: 6, carbs: 32, fat: 6, fiber: 3, serving_size: "1 bowl (180g)" },
  { id: "in-15", name: "Chicken Curry", cuisine: "indian", meal_type: "dinner", calories: 320, protein: 26, carbs: 12, fat: 18, fiber: 2, serving_size: "1 bowl (200g)" },
  { id: "in-16", name: "Paratha (Stuffed)", cuisine: "indian", meal_type: "breakfast", calories: 250, protein: 6, carbs: 30, fat: 12, fiber: 3, serving_size: "1 paratha" },
  { id: "in-17", name: "Curd Rice", cuisine: "indian", meal_type: "lunch", calories: 200, protein: 6, carbs: 35, fat: 4, fiber: 1, serving_size: "1 bowl" },
  { id: "in-18", name: "Matar Paneer", cuisine: "indian", meal_type: "dinner", calories: 270, protein: 14, carbs: 14, fat: 18, fiber: 4, serving_size: "1 bowl (200g)" },
  { id: "in-19", name: "Sprouts Salad", cuisine: "indian", meal_type: "snack", calories: 120, protein: 8, carbs: 16, fat: 2, fiber: 5, serving_size: "1 bowl (150g)" },
  { id: "in-20", name: "Masala Chai + Biscuit", cuisine: "indian", meal_type: "snack", calories: 130, protein: 2, carbs: 20, fat: 4, fiber: 0, serving_size: "1 cup + 2 biscuits" },

  // ========================
  // WESTERN / CONTINENTAL
  // ========================
  { id: "we-1", name: "Grilled Chicken Breast", cuisine: "western", meal_type: "dinner", calories: 250, protein: 38, carbs: 0, fat: 10, fiber: 0, serving_size: "150g" },
  { id: "we-2", name: "Scrambled Eggs (2)", cuisine: "western", meal_type: "breakfast", calories: 180, protein: 14, carbs: 2, fat: 13, fiber: 0, serving_size: "2 eggs" },
  { id: "we-3", name: "Oatmeal with Berries", cuisine: "western", meal_type: "breakfast", calories: 220, protein: 8, carbs: 38, fat: 5, fiber: 6, serving_size: "1 bowl (250ml)" },
  { id: "we-4", name: "Caesar Salad", cuisine: "western", meal_type: "lunch", calories: 300, protein: 15, carbs: 12, fat: 22, fiber: 3, serving_size: "1 bowl" },
  { id: "we-5", name: "Pasta Primavera", cuisine: "western", meal_type: "dinner", calories: 380, protein: 12, carbs: 52, fat: 14, fiber: 4, serving_size: "1 plate (250g)" },
  { id: "we-6", name: "Steak with Roasted Veggies", cuisine: "western", meal_type: "dinner", calories: 420, protein: 35, carbs: 15, fat: 25, fiber: 4, serving_size: "1 serving" },
  { id: "we-7", name: "Greek Yogurt Parfait", cuisine: "western", meal_type: "breakfast", calories: 200, protein: 14, carbs: 28, fat: 4, fiber: 2, serving_size: "1 cup" },
  { id: "we-8", name: "Turkey Sandwich", cuisine: "western", meal_type: "lunch", calories: 320, protein: 22, carbs: 34, fat: 10, fiber: 3, serving_size: "1 sandwich" },
  { id: "we-9", name: "Grilled Salmon", cuisine: "western", meal_type: "dinner", calories: 300, protein: 30, carbs: 0, fat: 18, fiber: 0, serving_size: "150g fillet" },
  { id: "we-10", name: "Avocado Toast", cuisine: "western", meal_type: "breakfast", calories: 280, protein: 8, carbs: 26, fat: 16, fiber: 6, serving_size: "2 slices" },
  { id: "we-11", name: "Protein Smoothie", cuisine: "western", meal_type: "snack", calories: 250, protein: 25, carbs: 30, fat: 5, fiber: 3, serving_size: "1 glass (350ml)" },
  { id: "we-12", name: "Chicken Wrap", cuisine: "western", meal_type: "lunch", calories: 350, protein: 24, carbs: 30, fat: 14, fiber: 3, serving_size: "1 wrap" },
  { id: "we-13", name: "Quinoa Bowl", cuisine: "western", meal_type: "lunch", calories: 320, protein: 12, carbs: 45, fat: 10, fiber: 6, serving_size: "1 bowl" },
  { id: "we-14", name: "Mixed Nuts", cuisine: "western", meal_type: "snack", calories: 170, protein: 5, carbs: 6, fat: 15, fiber: 2, serving_size: "30g" },
  { id: "we-15", name: "Pancakes (3) + Maple Syrup", cuisine: "western", meal_type: "breakfast", calories: 400, protein: 8, carbs: 58, fat: 14, fiber: 1, serving_size: "3 pancakes" },
  { id: "we-16", name: "Cottage Cheese Bowl", cuisine: "western", meal_type: "snack", calories: 180, protein: 20, carbs: 8, fat: 6, fiber: 0, serving_size: "1 cup" },
  { id: "we-17", name: "Beef Burger (Homemade)", cuisine: "western", meal_type: "dinner", calories: 450, protein: 28, carbs: 32, fat: 22, fiber: 2, serving_size: "1 burger" },
  { id: "we-18", name: "Grilled Veggie Salad", cuisine: "western", meal_type: "lunch", calories: 200, protein: 6, carbs: 18, fat: 12, fiber: 5, serving_size: "1 large bowl" },
  { id: "we-19", name: "Hard Boiled Eggs (2)", cuisine: "western", meal_type: "snack", calories: 140, protein: 12, carbs: 1, fat: 10, fiber: 0, serving_size: "2 eggs" },
  { id: "we-20", name: "Baked Potato", cuisine: "western", meal_type: "lunch", calories: 200, protein: 4, carbs: 42, fat: 1, fiber: 4, serving_size: "1 medium" },

  // ========================
  // ASIAN CUISINE
  // ========================
  { id: "as-1", name: "Grilled Salmon Rice Bowl", cuisine: "asian", meal_type: "dinner", calories: 380, protein: 28, carbs: 42, fat: 10, fiber: 2, serving_size: "1 bowl" },
  { id: "as-2", name: "Chicken Stir-Fry", cuisine: "asian", meal_type: "dinner", calories: 300, protein: 26, carbs: 18, fat: 14, fiber: 3, serving_size: "1 plate" },
  { id: "as-3", name: "Miso Soup", cuisine: "asian", meal_type: "lunch", calories: 60, protein: 4, carbs: 6, fat: 2, fiber: 1, serving_size: "1 bowl (200ml)" },
  { id: "as-4", name: "Sushi Rolls (6 pcs)", cuisine: "asian", meal_type: "lunch", calories: 250, protein: 10, carbs: 38, fat: 5, fiber: 1, serving_size: "6 pieces" },
  { id: "as-5", name: "Pad Thai", cuisine: "asian", meal_type: "dinner", calories: 400, protein: 16, carbs: 52, fat: 14, fiber: 2, serving_size: "1 plate" },
  { id: "as-6", name: "Tofu Teriyaki", cuisine: "asian", meal_type: "dinner", calories: 250, protein: 16, carbs: 22, fat: 12, fiber: 2, serving_size: "1 serving" },
  { id: "as-7", name: "Edamame", cuisine: "asian", meal_type: "snack", calories: 120, protein: 11, carbs: 9, fat: 5, fiber: 5, serving_size: "1 cup (100g)" },
  { id: "as-8", name: "Pho (Beef)", cuisine: "asian", meal_type: "lunch", calories: 350, protein: 22, carbs: 42, fat: 8, fiber: 2, serving_size: "1 bowl" },
  { id: "as-9", name: "Bibimbap", cuisine: "asian", meal_type: "dinner", calories: 400, protein: 18, carbs: 52, fat: 14, fiber: 4, serving_size: "1 bowl" },
  { id: "as-10", name: "Congee (Rice Porridge)", cuisine: "asian", meal_type: "breakfast", calories: 180, protein: 4, carbs: 36, fat: 2, fiber: 1, serving_size: "1 bowl" },
  { id: "as-11", name: "Dim Sum (Steamed)", cuisine: "asian", meal_type: "lunch", calories: 280, protein: 14, carbs: 32, fat: 10, fiber: 2, serving_size: "6 pieces" },
  { id: "as-12", name: "Tom Yum Soup", cuisine: "asian", meal_type: "lunch", calories: 100, protein: 8, carbs: 8, fat: 4, fiber: 1, serving_size: "1 bowl" },
  { id: "as-13", name: "Japanese Curry Rice", cuisine: "asian", meal_type: "dinner", calories: 420, protein: 16, carbs: 58, fat: 12, fiber: 3, serving_size: "1 plate" },
  { id: "as-14", name: "Spring Rolls (Fresh)", cuisine: "asian", meal_type: "snack", calories: 120, protein: 4, carbs: 18, fat: 3, fiber: 2, serving_size: "2 rolls" },
  { id: "as-15", name: "Egg Drop Soup", cuisine: "asian", meal_type: "lunch", calories: 80, protein: 6, carbs: 4, fat: 4, fiber: 0, serving_size: "1 bowl" },
  { id: "as-16", name: "Chicken Ramen", cuisine: "asian", meal_type: "lunch", calories: 450, protein: 22, carbs: 55, fat: 14, fiber: 2, serving_size: "1 bowl" },
  { id: "as-17", name: "Thai Green Curry", cuisine: "asian", meal_type: "dinner", calories: 350, protein: 20, carbs: 18, fat: 22, fiber: 3, serving_size: "1 bowl" },
  { id: "as-18", name: "Steamed Fish with Ginger", cuisine: "asian", meal_type: "dinner", calories: 220, protein: 28, carbs: 6, fat: 10, fiber: 1, serving_size: "1 fillet" },
  { id: "as-19", name: "Seaweed Salad", cuisine: "asian", meal_type: "snack", calories: 70, protein: 2, carbs: 10, fat: 3, fiber: 2, serving_size: "1 small bowl" },
  { id: "as-20", name: "Onigiri (Rice Ball)", cuisine: "asian", meal_type: "snack", calories: 160, protein: 3, carbs: 30, fat: 1, fiber: 1, serving_size: "1 piece" },

  // ========================
  // MEDITERRANEAN / MIDDLE EASTERN
  // ========================
  { id: "md-1", name: "Hummus with Pita", cuisine: "mediterranean", meal_type: "snack", calories: 250, protein: 8, carbs: 32, fat: 11, fiber: 6, serving_size: "4 tbsp + 1 pita" },
  { id: "md-2", name: "Grilled Lamb Kebab", cuisine: "mediterranean", meal_type: "dinner", calories: 320, protein: 28, carbs: 4, fat: 20, fiber: 0, serving_size: "2 skewers" },
  { id: "md-3", name: "Falafel Wrap", cuisine: "mediterranean", meal_type: "lunch", calories: 380, protein: 14, carbs: 44, fat: 16, fiber: 8, serving_size: "1 wrap" },
  { id: "md-4", name: "Shakshuka", cuisine: "mediterranean", meal_type: "breakfast", calories: 220, protein: 14, carbs: 12, fat: 14, fiber: 3, serving_size: "2 eggs in sauce" },
  { id: "md-5", name: "Tabbouleh", cuisine: "mediterranean", meal_type: "lunch", calories: 150, protein: 4, carbs: 22, fat: 5, fiber: 4, serving_size: "1 cup" },
  { id: "md-6", name: "Fattoush", cuisine: "mediterranean", meal_type: "lunch", calories: 180, protein: 4, carbs: 18, fat: 10, fiber: 3, serving_size: "1 bowl" },
  { id: "md-7", name: "Chicken Shawarma", cuisine: "mediterranean", meal_type: "dinner", calories: 400, protein: 28, carbs: 30, fat: 18, fiber: 3, serving_size: "1 wrap" },
  { id: "md-8", name: "Stuffed Grape Leaves", cuisine: "mediterranean", meal_type: "snack", calories: 130, protein: 3, carbs: 16, fat: 6, fiber: 2, serving_size: "4 pieces" },
  { id: "md-9", name: "Greek Salad", cuisine: "mediterranean", meal_type: "lunch", calories: 200, protein: 6, carbs: 10, fat: 16, fiber: 3, serving_size: "1 bowl" },
  { id: "md-10", name: "Lentil Soup", cuisine: "mediterranean", meal_type: "lunch", calories: 220, protein: 14, carbs: 34, fat: 4, fiber: 10, serving_size: "1 bowl" },
  { id: "md-11", name: "Labneh with Olive Oil", cuisine: "mediterranean", meal_type: "breakfast", calories: 150, protein: 8, carbs: 6, fat: 11, fiber: 0, serving_size: "3 tbsp" },
  { id: "md-12", name: "Baba Ganoush", cuisine: "mediterranean", meal_type: "snack", calories: 120, protein: 3, carbs: 10, fat: 8, fiber: 4, serving_size: "3 tbsp" },
  { id: "md-13", name: "Grilled Halloumi Salad", cuisine: "mediterranean", meal_type: "lunch", calories: 300, protein: 16, carbs: 12, fat: 22, fiber: 3, serving_size: "1 plate" },
  { id: "md-14", name: "Mujadara (Lentils & Rice)", cuisine: "mediterranean", meal_type: "dinner", calories: 350, protein: 14, carbs: 52, fat: 8, fiber: 10, serving_size: "1 plate" },
  { id: "md-15", name: "Foul Moudammas", cuisine: "mediterranean", meal_type: "breakfast", calories: 200, protein: 10, carbs: 30, fat: 5, fiber: 8, serving_size: "1 bowl" },
  { id: "md-16", name: "Kofta Kebab", cuisine: "mediterranean", meal_type: "dinner", calories: 280, protein: 22, carbs: 6, fat: 18, fiber: 1, serving_size: "3 pieces" },
  { id: "md-17", name: "Manakish (Zaatar)", cuisine: "mediterranean", meal_type: "breakfast", calories: 220, protein: 6, carbs: 30, fat: 9, fiber: 3, serving_size: "1 piece" },
  { id: "md-18", name: "Tzatziki with Veggies", cuisine: "mediterranean", meal_type: "snack", calories: 100, protein: 4, carbs: 6, fat: 7, fiber: 1, serving_size: "3 tbsp + veggies" },
  { id: "md-19", name: "Moussaka", cuisine: "mediterranean", meal_type: "dinner", calories: 350, protein: 16, carbs: 24, fat: 20, fiber: 5, serving_size: "1 slice" },
  { id: "md-20", name: "Date & Nut Energy Bites", cuisine: "mediterranean", meal_type: "snack", calories: 140, protein: 3, carbs: 18, fat: 7, fiber: 2, serving_size: "2 bites" },
];
