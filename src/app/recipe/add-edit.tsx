import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addMyRecipe, editMyRecipe, deleteMyRecipe } from '../../store/recipesSlice';
import { Recipe, Category, Difficulty } from '../../data/dummyData';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function AddEditRecipeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const myRecipes = useSelector((state: RootState) => state.recipes.myRecipes);
  const existingRecipe = id ? myRecipes.find(r => r.id === id) : null;

  const [name, setName] = useState(existingRecipe?.name || '');
  const [image, setImage] = useState(existingRecipe?.image || '');
  const [ingredientsStr, setIngredientsStr] = useState(existingRecipe?.ingredients.join('\n') || '');
  const [instructionsStr, setInstructionsStr] = useState(existingRecipe?.instructions.join('\n') || '');
  const [prepTime, setPrepTime] = useState(existingRecipe?.prepTime || '');
  const [servingsStr, setServingsStr] = useState(existingRecipe?.servings.toString() || '');
  const [caloriesStr, setCaloriesStr] = useState(existingRecipe?.calories.toString() || '');
  
  // Hardcoded defaults for simplicity in demo
  const category: Category = 'My Food';
  const difficulty: Difficulty = existingRecipe?.difficulty || 'Medium';

  const handleImageSelect = () => {
    Alert.alert(
      "Upload Recipe Image",
      "Choose a premium image preset for your recipe:",
      [
        {
          text: "🍕 Pizza",
          onPress: () => setImage('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000')
        },
        {
          text: "🍔 Burger",
          onPress: () => setImage('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000')
        },
        {
          text: "🥗 Salad",
          onPress: () => setImage('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000')
        },
        {
          text: "🍰 Dessert",
          onPress: () => setImage('https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000')
        },
        {
          text: "🍝 Pasta",
          onPress: () => setImage('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1000')
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const handleSave = () => {
    if (!name || !image || !ingredientsStr || !instructionsStr) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const recipeData: Recipe = {
      id: existingRecipe ? existingRecipe.id : Date.now().toString(),
      name,
      image,
      ingredients: ingredientsStr.split('\n').filter(i => i.trim() !== ''),
      instructions: instructionsStr.split('\n').filter(i => i.trim() !== ''),
      prepTime,
      servings: parseInt(servingsStr) || 1,
      calories: parseInt(caloriesStr) || 0,
      difficulty,
      category,
    };

    if (existingRecipe) {
      dispatch(editMyRecipe(recipeData));
    } else {
      dispatch(addMyRecipe(recipeData));
    }
    router.back();
  };

  const handleDelete = () => {
    if (existingRecipe) {
      Alert.alert(
        "Delete Recipe",
        "Are you sure you want to delete this recipe?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            style: "destructive", 
            onPress: () => {
              dispatch(deleteMyRecipe(existingRecipe.id));
              router.back();
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{existingRecipe ? 'Edit Recipe' : 'Add Recipe'}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
        <Input 
          label="Recipe Name *"
          placeholder="E.g., Homemade Pizza"
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.label}>Recipe Image *</Text>
        <TouchableOpacity style={styles.imageSelector} onPress={handleImageSelect} activeOpacity={0.8}>
          {image ? (
            <Image source={{ uri: image }} style={styles.selectedImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>📷 Tap to Upload / Select Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Input 
          label="Or enter Image URL"
          placeholder="https://example.com/image.jpg"
          value={image}
          onChangeText={setImage}
          autoCapitalize="none"
        />

        <Input 
          label="Ingredients (one per line) *"
          placeholder="1 cup flour&#10;2 eggs"
          value={ingredientsStr}
          onChangeText={setIngredientsStr}
          multiline
          style={styles.multilineInput}
        />

        <Input 
          label="Instructions (one per line) *"
          placeholder="Mix ingredients&#10;Bake for 20 mins"
          value={instructionsStr}
          onChangeText={setInstructionsStr}
          multiline
          style={styles.multilineInput}
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input 
              label="Prep Time"
              placeholder="e.g., 30 mins"
              value={prepTime}
              onChangeText={setPrepTime}
            />
          </View>
          <View style={styles.halfWidth}>
            <Input 
              label="Servings"
              placeholder="e.g., 4"
              value={servingsStr}
              onChangeText={setServingsStr}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Input 
          label="Calories"
          placeholder="e.g., 350"
          value={caloriesStr}
          onChangeText={setCaloriesStr}
          keyboardType="numeric"
        />

        <Button title="Save Recipe" onPress={handleSave} style={styles.saveButton} />
        
        {existingRecipe && (
          <Button title="Delete Recipe" onPress={handleDelete} variant="danger" style={styles.deleteButton} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: 16,
    paddingBottom: 40,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  imageSelector: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
    marginBottom: 16,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  saveButton: {
    marginTop: 16,
  },
  deleteButton: {
    marginTop: 16,
  },
});
