import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  if (!user) return null;

  const fullName = user.user_metadata?.full_name || 'Kullanıcı';

  return (
    <LinearGradient
      colors={['#7193E8', '#0735A9', '#000D2E']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.welcome}>Hoş geldin, {fullName}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Flashcard')}
        >
          <Text style={styles.buttonText}>📚 FlashCards</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Test')}
        >
          <Text style={styles.buttonText}>🧪 Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('Simülasyon sayfası yakında')}
        >
          <Text style={styles.buttonText}>🖧 Simülasyon</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>👤 Profil</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  welcome: {
    color: '#B0D9E5',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#06118B',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
