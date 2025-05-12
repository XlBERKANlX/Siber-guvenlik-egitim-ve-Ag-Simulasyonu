import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/testStyles';
import { supabase } from '../api/supabaseClient';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function TestScreen() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shuffledOptionsList, setShuffledOptionsList] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const seviye = route.params?.seviye || 1;

  const harfler = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from('test_questions')
      .select('*')
      .eq('seviye', seviye);

    if (error || !data || !data.length) {
      console.error('Soru çekme hatası:', error?.message || 'Boş veri');
      return;
    }

    const shuffledQuestions = shuffleArray(data);

    const shuffledOptionsList = shuffledQuestions.map((question) => {
      const options = [
        { text: question.secenek_1 },
        { text: question.secenek_2 },
        { text: question.secenek_3 },
        { text: question.secenek_4 },
      ];

      const shuffled = shuffleArray(options);

      return shuffled.map((option, index) => ({
        id: index + 1,
        label: harfler[index],
        text: option.text,
        isCorrect: option.text === question.dogru_secenek,
      }));
    });

    setQuestions(shuffledQuestions);
    setAnswers(new Array(shuffledQuestions.length).fill(null));
    setShuffledOptionsList(shuffledOptionsList);
  };

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const handleSelect = (optionId) => {
    const updated = [...answers];
    updated[current] = optionId;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const finishTest = async () => {
    Alert.alert(
      'Testi Bitir',
      'Testi bitirmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Evet',
          onPress: async () => {
            let correct = 0;
            let wrong = 0;

            answers.forEach((selectedId, index) => {
              const options = shuffledOptionsList[index];
              const selected = options.find(opt => opt.id === selectedId);

              if (selectedId === null) return;
              if (selected?.isCorrect) correct++;
              else wrong++;
            });

            const total = questions.length;
            const empty = total - (correct + wrong);
            const percentage = (correct / total) * 100;
            const rounded = percentage % 1 >= 0.5 ? Math.ceil(percentage) : Math.floor(percentage);

            const {
              data: { user },
            } = await supabase.auth.getUser();

            if (user) {
              const { data: existing } = await supabase
                .from('test_progress')
                .select('*')
                .eq('user_id', user.id)
                .eq('seviye', seviye)
                .single();

              if (!existing) {
                await supabase.from('test_progress').insert([{
                  user_id: user.id,
                  seviye,
                  basari_orani: rounded,
                  dogru_sayisi: correct,
                  yanlis_sayisi: wrong,
                  bos_sayisi: empty,
                }]);
              } else {
                const updateData = {
                  created_at: new Date().toISOString(), // 🕓 her testte güncellenir
                };

                if (rounded > existing.basari_orani) {
                  updateData.basari_orani = rounded;
                  updateData.dogru_sayisi = correct;
                  updateData.yanlis_sayisi = wrong;
                  updateData.bos_sayisi = empty;
                }

                await supabase
                  .from('test_progress')
                  .update(updateData)
                  .eq('user_id', user.id)
                  .eq('seviye', seviye);
              }
            }

            Alert.alert(
              'Test Sonucu',
              `Doğru: ${correct} / Yanlış: ${wrong} / Boş: ${empty}\nBaşarı: %${rounded}`,
              [{ text: 'Tamam', onPress: () => navigation.navigate('LevelSelectScreen') }]
            );
          },
        },
      ]
    );
  };

  if (!questions.length || !shuffledOptionsList.length) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white' }}>Sorular yükleniyor...</Text>
      </View>
    );
  }

  const currentQ = questions[current];
  const options = shuffledOptionsList[current];
  const selected = answers[current];

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* 🔙 Geri tuşu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('LevelSelectScreen')}
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
        <LinearGradient
          colors={['#001636', '#003E9C']}
          start={{ x: 0.25, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.questionBox}
        >
          <View style={styles.innerQuestionBox}>
            <Text style={styles.questionText}>{currentQ.soru}</Text>
          </View>

          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleSelect(option.id)}
              style={[
                styles.optionButton,
                selected === option.id && styles.selectedOption,
              ]}
            >
              <Text style={styles.optionText}>
                {option.label}) {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </LinearGradient>

        {/* ⬅︎ Butonlar */}
        <View style={styles.bottomButtons}>
          <LinearGradient
            colors={['#5966FB', '#06118B', '#020525']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.navButtonLeft}
          >
            <TouchableOpacity style={styles.buttonInner} onPress={prevQuestion}>
              <Text style={styles.navButtonText}>Önceki Soru</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#020525', '#06118B', '#5966FB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.navButtonRight,
              current === questions.length - 1 && { opacity: 0.5 },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonInner}
              onPress={nextQuestion}
              disabled={current === questions.length - 1}
            >
              <Text style={styles.navButtonText}>Sonraki Soru</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#020525', '#5966FB', '#020525']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.finishButton}
          >
            <TouchableOpacity style={styles.buttonInner} onPress={finishTest}>
              <Text style={styles.finishButtonText}>Testi Bitir</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
