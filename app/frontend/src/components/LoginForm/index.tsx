import { useState } from 'react';
import api from '../../api';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      email,
      password
    }

    const response = await api.post('/users/login', data)
    .then(response => response)
    .catch(error => error.response);

    alert(response.status)

    if (response.status !== 200) {
      alert(response.data.message);
      return;
    }

    localStorage.setItem('@token', response.data.token);
    
    alert("Login successfully");

    navigate('/home');
    
  } 

  return (
    <div>
      <h1>Insert data</h1>
      <form
        onSubmit={(e) => handlerSubmit(e) }
      >
        <label>
          Email:
          <input 
          type="text" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input 
          type="password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
