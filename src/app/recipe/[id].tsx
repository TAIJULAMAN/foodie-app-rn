import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleFavorite } from '../../store/recipesSlice';
import { ArrowLeft, Heart, Clock, Users, Flame, BarChart } from 'lucide-react-native';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { recipes, myRecipes, favoriteIds } = useSelector((state: RootState) => state.recipes);
  
  const allRecipes = [...recipes, ...myRecipes];
  const recipe = allRecipes.find(r => r.id === id);
  const isFavorite = favoriteIds.includes(id as string);

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text>Recipe not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonInline}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe.id));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity 
              style={styles.backBtn} 
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <ArrowLeft color="#333" size={20} />
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={handleToggleFavorite}
              activeOpacity={0.8}
            >
              <Heart 
                color={isFavorite ? '#ff4444' : '#fff'} 
                fill={isFavorite ? '#ff4444' : 'transparent'}
                size={24} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.name}</Text>
          <Text style={styles.subtitle}>{recipe.category} | Generic</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaBox}>
              <Clock color="#555" size={24} style={styles.metaIcon} />
              <Text style={styles.metaValue}>{recipe.prepTime}</Text>
            </View>
            <View style={styles.metaBox}>
              <Users color="#555" size={24} style={styles.metaIcon} />
              <Text style={styles.metaValue}>{recipe.servings} Servings</Text>
            </View>
            <View style={styles.metaBox}>
              <Flame color="#ff6b6b" size={24} style={styles.metaIcon} />
              <Text style={styles.metaValue}>{recipe.calories} Cal</Text>
            </View>
            <View style={styles.metaBox}>
              <BarChart color="#555" size={24} style={styles.metaIcon} />
              <Text style={styles.metaValue}>{recipe.difficulty}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientCard}>
              <View style={styles.yellowBullet} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.instructionItem}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.instructionText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonInline: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#f39c12',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 350,
  },
  headerOverlay: {
    position: 'absolute',
    top: 32,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backBtnText: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  metaBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  metaIcon: {
    marginBottom: 8,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    marginTop: 8,
  },
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffdf0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  yellowBullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f1c40f',
    marginRight: 16,
  },
  ingredientText: {
    fontSize: 15,
    color: '#2c3e50',
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2c3e50',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: 'bold',
    marginRight: 16,
    overflow: 'hidden',
  },
  instructionText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
    lineHeight: 24,
  },
});
