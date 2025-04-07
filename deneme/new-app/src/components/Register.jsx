import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Registration data:', formData);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h1>Kayıt Ol</h1>
        
        <div className="user-icon">
          <FaUser />
        </div>

        <div className="register-input-group">
          <input
            type="text"
            name="username"
            placeholder="Kullanıcı Adı"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-input-group">
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-input-group">
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Şifre Tekrar"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-button-group">
          <button type="button" onClick={handleCancel}>
            İptal Et
          </button>
          <button type="submit">
            Kayıt Ol
          </button>
        </div>

        <div className="login-link">
          <button type="button" onClick={goToLogin}>
            Zaten hesabınız var mı? Giriş yapın
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register; 