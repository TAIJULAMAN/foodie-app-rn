import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, DUMMY_RECIPES } from '../data/dummyData';

interface RecipesState {
  recipes: Recipe[];
  favoriteIds: string[];
  myRecipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: DUMMY_RECIPES,
  favoriteIds: [],
  myRecipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);
      if (index >= 0) {
        state.favoriteIds.splice(index, 1);
      } else {
        state.favoriteIds.push(id);
      }
    },
    addMyRecipe: (state, action: PayloadAction<Recipe>) => {
      state.myRecipes.push(action.payload);
    },
    editMyRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.myRecipes.findIndex(r => r.id === action.payload.id);
      if (index >= 0) {
        state.myRecipes[index] = action.payload;
      }
    },
    deleteMyRecipe: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.myRecipes = state.myRecipes.filter(r => r.id !== id);
      // Also remove from favorites if it was favorited
      const favIndex = state.favoriteIds.indexOf(id);
      if (favIndex >= 0) {
        state.favoriteIds.splice(favIndex, 1);
      }
    },
  },
});

export const { toggleFavorite, addMyRecipe, editMyRecipe, deleteMyRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
