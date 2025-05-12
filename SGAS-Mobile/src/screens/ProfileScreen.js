import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../api/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const [testProgress, setTestProgress] = useState([]);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from('test_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setTestProgress(data);
    else console.error('Progress fetch error:', error?.message);
  };

  const formatKalanSure = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const totalMs = 24 * 60 * 60 * 1000; // 24 saat
    const diffMs = now.getTime() - created.getTime();
    const kalanMs = totalMs - diffMs;
  
    if (kalanMs <= 0) return 'Yeniden girilebilir';
  
    const kalanSaat = Math.floor(kalanMs / (1000 * 60 * 60));
    const kalanDakika = Math.floor((kalanMs % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${kalanSaat} saat ${kalanDakika} dk`;
  };
  

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

        {/* 🧪 Test Başarıları */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Test Başarıları</Text>

          {testProgress.length === 0 ? (
            <Text style={styles.placeholderText}>Henüz test çözülmedi.</Text>
          ) : (
            testProgress.slice(0, 2).map((record) => (
              <View key={record.seviye} style={styles.testItem}>
                <Text style={styles.testText}>
                  Seviye {record.seviye} → %{Math.round(record.basari_orani)} | ✅ {record.dogru_sayisi} / ❌ {record.yanlis_sayisi} / ⭕ {record.bos_sayisi}
                </Text>
                <Text style={styles.kalanSure}>
                  Tekrar denemek için kalan süre: {formatKalanSure(record.created_at)}
                </Text>
              </View>
            ))
          )}

          {testProgress.length > 2 && (
            <TouchableOpacity onPress={() => alert('Tüm sonuçlar yakında!')}>
              <Text style={styles.showAll}>Tümünü Gör →</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
  <LinearGradient
    colors={['#5966FB', '#06118B', '#020525']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientButton}
  >
    <Text style={styles.logoutText}>Anasayfa</Text>
  </LinearGradient>
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
    marginBottom: 16,
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
  testItem: {
    marginBottom: 12,
  },
  testText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  kalanSure: {
    color: '#ACFDFD',
    fontSize: 13,
    marginTop: 2,
  },
  showAll: {
    marginTop: 10,
    fontStyle: 'italic',
    fontSize: 14,
    color: '#7EC5FF',
    textDecorationLine: 'underline',
  },
  logoutButton: {
    marginTop: 10,
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
  homeButton: {
    marginBottom: 10,
  },
  gradientButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopLeftRadius: 23,
    borderBottomRightRadius: 23,
  },
  
});
