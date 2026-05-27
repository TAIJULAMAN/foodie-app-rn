import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Category } from '../data/dummyData';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export default function CategoryBar({ categories, selectedCategory, onSelectCategory }: CategoryBarProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.pill,
              selectedCategory === category && styles.pillSelected,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.pillText,
                selectedCategory === category && styles.pillTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  pillSelected: {
    backgroundColor: '#ff6347', // Tomato color for foodie theme
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  pillTextSelected: {
    color: '#fff',
  },
});
