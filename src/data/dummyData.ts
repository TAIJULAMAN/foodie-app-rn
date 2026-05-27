export type Difficulty = "Easy" | "Medium" | "Hard";
export type Category =
  | "All"
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Desserts"
  | "Appetizers"
  | "Salads"
  | "Drinks"
  | "Soups"
  | "Snacks"
  | "Favorites"
  | "My Food";

export interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  servings: number;
  calories: number;
  difficulty: Difficulty;
  category: Category;
}

export const DUMMY_RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Classic Pancakes",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "1 cup all-purpose flour",
      "2 tablespoons sugar",
      "1 cup milk",
      "1 egg",
      "2 tablespoons melted butter",
    ],
    instructions: [
      "In a large bowl, mix flour and sugar.",
      "In another bowl, whisk milk, egg, and melted butter.",
      "Combine wet and dry ingredients until just mixed.",
      "Heat a lightly oiled griddle over medium high heat.",
      "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.",
    ],
    prepTime: "15 mins",
    servings: 4,
    calories: 250,
    difficulty: "Easy",
    category: "Breakfast",
  },
  {
    id: "2",
    name: "Beef and Mustard Pie",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "1kg Beef",
      "2 tbs Plain Flour",
      "2 tbs Rapeseed Oil",
      "1 Onion",
      "Beef Stock",
      "Mustard",
    ],
    instructions: [
      "Preheat the oven.",
      "Toss the beef in the flour.",
      "Heat the oil and brown the beef in batches.",
      "Cook the onion until softened.",
      "Add the beef back in with the stock and mustard.",
      "Simmer until tender, then bake with pastry on top.",
    ],
    prepTime: "35 mins",
    servings: 3,
    calories: 103,
    difficulty: "Medium",
    category: "Dinner",
  },
  {
    id: "3",
    name: "Avocado Toast",
    image:
      "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "2 slices of sourdough bread",
      "1 ripe avocado",
      "Salt and pepper to taste",
      "Red pepper flakes",
      "A squeeze of lemon juice",
    ],
    instructions: [
      "Toast the bread until golden brown.",
      "Mash the avocado in a bowl with a fork.",
      "Mix in salt, pepper, and lemon juice.",
      "Spread the avocado mixture evenly on the toast.",
      "Sprinkle with red pepper flakes and serve immediately.",
    ],
    prepTime: "5 mins",
    servings: 1,
    calories: 320,
    difficulty: "Easy",
    category: "Lunch",
  },
  {
    id: "4",
    name: "Grilled Salmon",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "2 salmon fillets",
      "1 tbsp olive oil",
      "1 clove garlic, minced",
      "Lemon slices",
      "Salt and pepper",
    ],
    instructions: [
      "Preheat grill to medium-high heat.",
      "Rub salmon with olive oil, garlic, salt, and pepper.",
      "Place salmon on grill, skin side down.",
      "Grill for 6-8 minutes, or until cooked through.",
      "Serve with fresh lemon slices.",
    ],
    prepTime: "20 mins",
    servings: 2,
    calories: 450,
    difficulty: "Medium",
    category: "Dinner",
  },
  {
    id: "5",
    name: "Chocolate Lava Cake",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "1/2 cup butter",
      "4 oz high-quality bittersweet chocolate",
      "2 eggs",
      "2 egg yolks",
      "1/4 cup sugar",
      "2 tbsp flour",
    ],
    instructions: [
      "Preheat oven to 425°F (218°C) and grease ramekins.",
      "Melt butter and chocolate together in a double boiler.",
      "Whisk eggs, egg yolks, sugar, and salt together until thick.",
      "Fold melted chocolate and flour into the egg mixture.",
      "Divide batter among ramekins and bake for 12-14 minutes until edges are firm.",
    ],
    prepTime: "25 mins",
    servings: 4,
    calories: 410,
    difficulty: "Hard",
    category: "Desserts",
  },
  {
    id: "6",
    name: "Garlic Bread",
    image:
      "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "1 baguette",
      "1/2 cup butter, softened",
      "4 cloves garlic, minced",
      "2 tbsp fresh parsley, chopped",
      "1/4 cup Parmesan cheese",
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Mix butter, garlic, parsley, and Parmesan cheese in a small bowl.",
      "Slice the baguette horizontally.",
      "Spread the garlic butter mixture evenly over both halves.",
      "Bake for 10-12 minutes until golden brown.",
    ],
    prepTime: "15 mins",
    servings: 6,
    calories: 180,
    difficulty: "Easy",
    category: "Appetizers",
  },
  {
    id: "7",
    name: "Caesar Salad",
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "1 large head of romaine lettuce",
      "1/2 cup croutons",
      "1/4 cup shaved Parmesan cheese",
      "Caesar dressing to taste",
      "1 tbsp lemon juice",
    ],
    instructions: [
      "Wash, dry, and tear romaine lettuce into bite-size pieces.",
      "Place lettuce in a large salad bowl.",
      "Toss with Caesar dressing and lemon juice.",
      "Top with croutons and shaved Parmesan cheese.",
      "Serve immediately.",
    ],
    prepTime: "10 mins",
    servings: 2,
    calories: 220,
    difficulty: "Easy",
    category: "Salads",
  },
  {
    id: "8",
    name: "Strawberry Smoothie",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "2 cups fresh strawberries, hulled",
      "1 banana, sliced",
      "1/2 cup Greek yogurt",
      "1/2 cup milk",
      "1 tbsp honey",
    ],
    instructions: [
      "Place all ingredients in a blender.",
      "Blend on high speed until completely smooth.",
      "Pour into glasses and serve chilled.",
    ],
    prepTime: "5 mins",
    servings: 2,
    calories: 150,
    difficulty: "Easy",
    category: "Drinks",
  },
  {
    id: "9",
    name: "Classic Tomato Soup",
    image:
      "https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "2 tbsp olive oil",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "2 cans (28 oz each) whole peeled tomatoes",
      "2 cups vegetable broth",
      "1/2 cup heavy cream",
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat.",
      "Sauté onion and garlic until translucent and fragrant.",
      "Add canned tomatoes and vegetable broth, bringing to a simmer.",
      "Cook for 20 minutes, then puree using an immersion blender.",
      "Stir in heavy cream and season to taste before serving.",
    ],
    prepTime: "30 mins",
    servings: 4,
    calories: 210,
    difficulty: "Medium",
    category: "Soups",
  },
  {
    id: "10",
    name: "Baked Mozzarella Sticks",
    image:
      "https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?auto=format&fit=crop&q=80&w=1000",
    ingredients: [
      "12 low-moisture mozzarella cheese sticks",
      "1/2 cup all-purpose flour",
      "2 large eggs, beaten",
      "1 cup Panko breadcrumbs",
      "1 tsp Italian seasoning",
      "Marinara sauce for dipping",
    ],
    instructions: [
      "Freeze cheese sticks for at least 1 hour before starting.",
      "Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.",
      "Roll each cheese stick in flour, then dip in beaten eggs, and coat with seasoned breadcrumbs.",
      "Repeat egg and breadcrumb coats for a double-layer seal.",
      "Bake for 6-8 minutes until breadcrumbs are golden and cheese is warm but not melting out.",
    ],
    prepTime: "20 mins",
    servings: 4,
    calories: 290,
    difficulty: "Medium",
    category: "Snacks",
  },
];
