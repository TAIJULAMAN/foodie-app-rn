import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Recipe } from '../data/dummyData';
import { useRouter } from 'expo-router';
import Button from './Button';

interface RecipeCardProps {
  recipe: Recipe;
  isMyFood?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  isFavoriteCard?: boolean;
}

export default function RecipeCard({ recipe, isMyFood, onEdit, onDelete, isFavoriteCard }: RecipeCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/recipe/${recipe.id}`);
  };

  if (isFavoriteCard) {
    return (
      <TouchableOpacity style={styles.favoriteCard} onPress={handlePress} activeOpacity={0.8}>
        <Image source={{ uri: recipe.image }} style={styles.favoriteImage} />
        <View style={styles.favoriteInfo}>
          <Text style={styles.favoriteName} numberOfLines={1}>{recipe.name}</Text>
          <Text style={styles.favoriteCategory}>{recipe.category}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.ingredients.join(',')}...
          {'\n'}{recipe.instructions[0]}...
        </Text>
        
        {isMyFood && (
          <View style={styles.actionRow}>
            <Button title="Edit" onPress={onEdit || (() => {})} variant="success" style={styles.actionButton} />
            <Button title="Delete" onPress={onDelete || (() => {})} variant="danger" style={styles.actionButton} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
  },
  // Favorite Card Styles
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoriteImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 16,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  favoriteCategory: {
    fontSize: 14,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
});
