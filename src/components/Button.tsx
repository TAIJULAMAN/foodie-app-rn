import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({ title, onPress, variant = 'primary', style, textStyle }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant], style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#f39c12',
  },
  secondary: {
    backgroundColor: '#f0f0f0',
  },
  danger: {
    backgroundColor: '#ff6b6b',
  },
  success: {
    backgroundColor: '#58d68d',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
