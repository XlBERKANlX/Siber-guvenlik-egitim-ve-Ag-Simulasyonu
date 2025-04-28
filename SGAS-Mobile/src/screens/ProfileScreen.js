import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <LinearGradient
      colors={['#7193E8', '#0735A9', '#000D2E']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={styles.title}>Profil</Text>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Ad Soyad:</Text>
          <Text style={styles.value}>{user.user_metadata?.full_name || 'Bilinmiyor'}</Text>

          <Text style={styles.label}>E-posta:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Simülasyon Sonuçları</Text>
          <Text style={styles.placeholderText}>Henüz simülasyon gerçekleştirilmedi.</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Test Başarıları</Text>
          <Text style={styles.placeholderText}>Henüz test çözülmedi.</Text>
        </View>

        {/* ✅ Anasayfa Butonu */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.homeButton}
        >
          <Text style={styles.logoutText}>Anasayfaya Dön</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#B0D9E5',
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  label: {
    color: '#B0D9E5',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    color: 'white',
    fontSize: 16,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#B0D9E5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderText: {
    color: '#D8D8D8',
    fontSize: 14,
    fontStyle: 'italic',
  },
  homeButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 12,
    borderTopRightRadius: 23,
    borderBottomLeftRadius: 23,
    backgroundColor: '#0735A9',
    marginBottom: 10,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 23,
    borderBottomRightRadius: 23,
    backgroundColor: '#06118B',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
