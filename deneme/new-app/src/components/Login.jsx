import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FaUser } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.username,
        password: formData.password,
      });

      if (error) throw error;
      if (data) {
        navigate('/siber-test');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleForgotPassword = () => {
    // Add forgot password logic here
    console.log('Forgot password clicked');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Kullanıcı Girişi</h1>
        
        <div className="user-icon">
          <FaUser />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Kullanıcı Adı"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="forgot-password">
          <button type="button" onClick={handleForgotPassword}>
            Şifremi Unuttum
          </button>
        </div>

        <div className="button-group">
          <button type="button" onClick={goToRegister}>
            Kayıt Ol
          </button>
          <button type="submit">
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login; 