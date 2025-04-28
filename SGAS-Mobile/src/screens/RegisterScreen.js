import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/registerStyles';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!email.includes('@')) {
      errs.email = 'Geçerli bir e-posta giriniz.';
    }

    if (password.length < 6) {
      errs.password = 'Şifre en az 6 karakter olmalıdır.';
    }

    if (password !== confirmPassword) {
      errs.confirm = 'Şifreler eşleşmiyor.';
    }

    if (!name.trim()) {
      errs.name = 'Ad Soyad boş bırakılamaz.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });
  
    if (error) {
      alert("Kayıt başarısız: " + error.message);
    } else {
      alert("Kayıt başarılı! E-postanı kontrol et.");
      navigation.navigate('Login');
    }
  };

  return (
    <LinearGradient
      colors={['#7193E8', '#0735A9', '#000D2E']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.title}>Kayıt Ol</Text>

        {/* Avatar */}
        <Image
          source={require('../../assets/avatar.png')}
          style={styles.avatar}
        />

        <TextInput
          placeholder="Ad Soyad"
          placeholderTextColor="#B0D9E5"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          placeholder="E-posta"
          placeholderTextColor="#B0D9E5"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Şifre"
            placeholderTextColor="#B0D9E5"
            secureTextEntry={!passwordVisible1}
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setPasswordVisible1(!passwordVisible1)}>
            <Ionicons
              name={passwordVisible1 ? 'eye-off' : 'eye'}
              size={24}
              color="#B0D9E5"
            />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Şifre (Tekrar)"
            placeholderTextColor="#B0D9E5"
            secureTextEntry={!passwordVisible2}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setPasswordVisible2(!passwordVisible2)}>
            <Ionicons
              name={passwordVisible2 ? 'eye-off' : 'eye'}
              size={24}
              color="#B0D9E5"
            />
          </TouchableOpacity>
        </View>
        {errors.confirm && <Text style={styles.error}>{errors.confirm}</Text>}

        <TouchableOpacity onPress={handleRegister}>
          <LinearGradient
            colors={['#5966FB', '#06118B', '#020525']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.registerButton}
          >
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginRedirect}>Zaten hesabın var mı?</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
