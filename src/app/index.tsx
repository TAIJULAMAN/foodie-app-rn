import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    // Navigate to home after delay
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, {
        opacity: opacityValue,
        transform: [{ scale: scaleValue }]
      }]}>
        <View style={styles.pizzaContainer}>
          {/* Concentric circles directly bound to the image */}
          <View style={[styles.circle, styles.circleLarge]} />
          <View style={[styles.circle, styles.circleMedium]} />
          
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: 'https://freepngimg.com/thumb/pizza/36-pizza-png-image.png' }} 
              style={styles.pizzaImage}
            />
          </View>
        </View>

        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fccb2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  pizzaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circleLarge: {
    width: 380,
    height: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  circleMedium: {
    width: 280,
    height: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  imageWrapper: {
    width: 200,
    height: 200,
    zIndex: 10,
  },
  pizzaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 54,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1.5,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 1,
    opacity: 0.95,
  },
});
