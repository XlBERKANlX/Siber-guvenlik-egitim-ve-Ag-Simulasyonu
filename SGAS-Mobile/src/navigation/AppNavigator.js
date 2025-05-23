import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import TestScreen from '../screens/TestScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LevelSelectScreen from '../screens/LevelSelectScreen'; // 🔥 Eklendi

import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, sessionChecked } = useAuth();

  if (!sessionChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#7193E8" />
      </View>
    );
  }

  return (
<NavigationContainer>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {user ? (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Flashcard" component={FlashcardScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="LevelSelectScreen" component={LevelSelectScreen} />
      </>
    ) : (
      <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </>
    )}
  </Stack.Navigator>
</NavigationContainer>
  );
}
