import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteMyRecipe } from '../store/recipesSlice';
import { Category, Recipe } from '../data/dummyData';
import CategoryBar from '../components/CategoryBar';
import RecipeCard from '../components/RecipeCard';
import Button from '../components/Button';
import { useRouter } from 'expo-router';

const CATEGORIES: Category[] = [
  'All', 
  'Breakfast', 
  'Lunch', 
  'Dinner', 
  'Desserts', 
  'Appetizers', 
  'Salads', 
  'Drinks', 
  'Soups', 
  'Snacks', 
  'Favorites', 
  'My Food'
];

export default function MainFeedScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const router = useRouter();
  const dispatch = useDispatch();

  const { recipes, favoriteIds, myRecipes } = useSelector((state: RootState) => state.recipes);

  const allAvailableRecipes = [...recipes, ...myRecipes];

  const getFilteredRecipes = (): Recipe[] => {
    switch (selectedCategory) {
      case 'All':
        return allAvailableRecipes;
      case 'Favorites':
        return allAvailableRecipes.filter(r => favoriteIds.includes(r.id));
      case 'My Food':
        return myRecipes;
      default:
        return allAvailableRecipes.filter(r => r.category === selectedCategory);
    }
  };

  const filteredRecipes = getFilteredRecipes();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            dispatch(deleteMyRecipe(id));
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Foodie</Text>
      </View>
      
      <CategoryBar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {selectedCategory !== 'All' && (
        <View style={styles.actionContainer}>
          <Button 
            title="Back to Home" 
            onPress={() => setSelectedCategory('All')} 
            variant="secondary"
            style={styles.backToHomeBtn}
            textStyle={styles.backToHomeText}
          />
        </View>
      )}

      {selectedCategory === 'My Food' && (
        <View style={styles.actionContainer}>
          <Button 
            title="Add New Recipe" 
            onPress={() => router.push('/recipe/add-edit')} 
            variant="primary"
          />
        </View>
      )}

      {selectedCategory === 'Favorites' && (
        <View style={styles.actionContainer}>
          <Text style={styles.favoritesTitle}>My Favorite Recipes</Text>
        </View>
      )}

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard 
            recipe={item} 
            isMyFood={selectedCategory === 'My Food'}
            onEdit={() => router.push(`/recipe/add-edit?id=${item.id}`)}
            onDelete={() => handleDelete(item.id)}
            isFavoriteCard={selectedCategory === 'Favorites'}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recipes added yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    padding: 16,
    paddingTop: 48, // approximate safe area top
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
  },
  favoritesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 16,
  },
  actionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backToHomeBtn: {
    backgroundColor: '#4b5563', // Slate gray matching the image
  },
  backToHomeText: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
