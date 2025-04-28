import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/loginStyles';
import { supabase } from '../api/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { setUser } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleLogin = async () => {
    if (!email.includes('@')) {
      setEmailError('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }
  
    setEmailError('');
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      alert("Giriş başarısız: " + error.message);
    } else {
      setUser(data.user);
      
        }
  };

  return (
    <LinearGradient
      colors={['#7193E8', '#0735A9', '#000D2E']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Kullanıcı Girişi</Text>

      <Image
        source={require('../../assets/avatar.png')}
        style={styles.avatar}
      />

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        placeholderTextColor="#B0D9E5"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (emailError) setEmailError('');
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Şifre"
          placeholderTextColor="#B0D9E5"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#B0D9E5"
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginRedirect}>Hesabın yok mu? </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Şifremi Unuttum?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin}>
          <LinearGradient
            colors={['#5966FB', '#06118B', '#020525']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <LinearGradient
            colors={['#5966FB', '#06118B', '#020525']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.cancelButton}
          >
            <Text style={styles.buttonText}>İptal Et</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
