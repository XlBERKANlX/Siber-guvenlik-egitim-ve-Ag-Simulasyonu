import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../api/supabaseClient';
import styles from '../styles/levelStyles';
import { useNavigation } from '@react-navigation/native';

export default function LevelSelectScreen() {
  const [progress, setProgress] = useState([]);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  const TOTAL_LEVELS = 10;
  const SUCCESS_THRESHOLD = 70;

  useEffect(() => {
    const fetchProgress = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const { data, error } = await supabase
          .from('test_progress')
          .select('*')
          .eq('user_id', user.id);

        if (data) setProgress(data);
      }
    };

    fetchProgress();
  }, []);

  const isLevelUnlocked = (level) => {
    if (level === 1) return true;
    const previous = progress.find(p => p.seviye === level - 1);
    return previous && previous.basari_orani >= SUCCESS_THRESHOLD;
  };

  const handleLevelSelect = async (level) => {
    const record = progress.find(p => p.seviye === level);
    if (record) {
      const created = new Date(record.created_at);
      const now = new Date();
      const diffMs = now.getTime() - created.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      // ✅ 1 gün engeli – test için yorum satırına alınabilir
      //if (diffHours < 24) {
      if (diffHours < 24) { // ← TEST için anında girebilmek amacıyla
        Alert.alert("Bekleme Süresi", "Bu seviyeye tekrar girmek için 1 gün beklemelisiniz.");
        return;
      }
    }

    navigation.navigate('Test', { seviye: level });
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* 🔙 Geri butonu → Anasayfa */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <LinearGradient
          colors={['#020525', '#06118B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.backGradient}
        >
          <Text style={styles.backText}>←</Text>
        </LinearGradient>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Seviye Seçimi</Text>

        {[...Array(TOTAL_LEVELS)].map((_, index) => {
          const level = index + 1;
          const unlocked = isLevelUnlocked(level);
          const userProgress = progress.find(p => p.seviye === level);
          const text = unlocked ? `Seviye ${level}` : `🔒 Seviye ${level}`;
          const oran = userProgress?.basari_orani;

          return (
            <TouchableOpacity
              key={level}
              disabled={!unlocked}
              onPress={() => handleLevelSelect(level)}
            >
              <LinearGradient
                colors={
                  unlocked
                    ? ['#5966FB', '#06118B', '#020525']
                    : ['#222', '#111']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.levelButton,
                  !unlocked && { opacity: 0.5 },
                ]}
              >
                <Text style={styles.levelText}>{text}</Text>
                {oran !== undefined && (
                  <Text style={styles.ratioText}>Başarı: %{Math.round(oran)}</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
}
