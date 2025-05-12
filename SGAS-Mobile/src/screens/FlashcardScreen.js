import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { supabase } from '../api/supabaseClient';

const { width } = Dimensions.get('window');

export default function FlashcardScreen({ navigation }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastTerm, setLastTerm] = useState('');

  const rotateTop = useSharedValue(0);
  const rotateBottom = useSharedValue(0);
  const translateTop = useSharedValue(0);
  const translateBottom = useSharedValue(0);

  useEffect(() => {
    fetchFlashcards(); // Uygulama açıldığında verileri çek
  }, []);

  const fetchFlashcards = async () => {
    const { data, error } = await supabase.from('flashcards').select('*');
    

    if (error) {
      console.error('Veri çekme hatası:', error.message);
      return;
    }
    const shuffled = shuffleArray(data);
    setCards(shuffled);
    setCurrentIndex(0);
    setLastTerm('');
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const reshuffle = () => {
    fetchFlashcards(); // Yeni rastgele liste al
    rotateTop.value = 0;
    rotateBottom.value = 0;
    translateTop.value = 0;
    translateBottom.value = 0;
  };

  const handleTopCardPress = () => {
    if (currentIndex < cards.length) {
      translateTop.value = withSpring(100);
      setTimeout(() => {
        rotateTop.value = withTiming(-180, { duration: 400 });
      }, 300);
      setTimeout(() => {
        setLastTerm(cards[currentIndex].term);
        setCurrentIndex((prev) => prev + 1);
        rotateTop.value = 0;
        translateTop.value = 0;
      }, 800);
    }
  };

  const handleBottomCardPress = () => {
    if (currentIndex > 0) {
      translateBottom.value = withSpring(-100);
      setTimeout(() => {
        rotateBottom.value = withTiming(180, { duration: 400 });
      }, 300);
      setTimeout(() => {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        if (prevIndex > 0) {
          setLastTerm(cards[prevIndex - 1].term);
        } else {
          setLastTerm('');
        }
        rotateBottom.value = 0;
        translateBottom.value = 0;
      }, 800);
    }
  };

  const currentCard = cards[currentIndex];

  const animatedTopStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateTop.value },
      { rotateY: `${rotateTop.value}deg` },
    ],
  }));

  const animatedBottomStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateBottom.value },
      { rotateY: `${rotateBottom.value}deg` },
    ],
  }));

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <Text style={styles.title}>FlashCards</Text>

      {/* Üst Kart */}
      {currentCard ? (
        <TouchableOpacity onPress={handleTopCardPress} activeOpacity={0.8}>
          <Animated.View style={[styles.cardTop, animatedTopStyle]}>
            <LinearGradient
              colors={['#004F5C', '#0AADFF', '#004F5C']}
              start={{ x: 0.08, y: 0.08 }}
              end={{ x: 0.95, y: 0.95 }}
              style={styles.cardInner}
            >
              <Text style={styles.cardText}>{currentCard.definition}</Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyCard} />
      )}

      {/* Alt Kart */}
      {lastTerm ? (
        <TouchableOpacity onPress={handleBottomCardPress} activeOpacity={0.8}>
          <Animated.View style={[styles.cardBottom, animatedBottomStyle]}>
            <LinearGradient
              colors={['#004F5C', '#0AADFF', '#004F5C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardInner}
            >
              <Text style={styles.cardText}>{lastTerm}</Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyCard} />
      )}

      {/* Butonlar */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Ana Menü</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={reshuffle} style={styles.shuffleButton}>
          <Text style={styles.shuffleText}>Yeniden Dağıt</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 32,
    color: '#06118B',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  cardTop: {
    width: width * 0.65,
    height: width * 0.65,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  cardBottom: {
    width: width * 0.65,
    height: width * 0.65,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  cardInner: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  emptyCard: {
    width: width * 0.65,
    height: width * 0.65,
    backgroundColor: '#0A6372',
    borderRadius: 25,
    marginVertical: 20,
    opacity: 0.6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 30,
  },
  shuffleButton: {
    backgroundColor: '#06118B',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  shuffleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuButton: {
    backgroundColor: '#0735A9',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  menuButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
