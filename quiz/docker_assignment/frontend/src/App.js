import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/counter';

function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setCounter(response.data.value);
      setError(null);
    } catch (err) {
      setError('서버 연결 실패');
      console.error('Error fetching counter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/increment`);
      setCounter(response.data.value);
      setError(null);
    } catch (err) {
      setError('증가 실패');
      console.error('Error incrementing counter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrement = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/decrement`);
      setCounter(response.data.value);
      setError(null);
    } catch (err) {
      setError('감소 실패');
      console.error('Error decrementing counter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/reset`);
      setCounter(response.data.value);
      setError(null);
    } catch (err) {
      setError('리셋 실패');
      console.error('Error resetting counter:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Counter Application</h1>
        <div className="counter-display">
          <h2>{counter}</h2>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="button-group">
          <button
            onClick={handleDecrement}
            disabled={loading}
            className="btn btn-decrement"
          >
            감소 (-)
          </button>
          <button
            onClick={handleIncrement}
            disabled={loading}
            className="btn btn-increment"
          >
            증가 (+)
          </button>
        </div>
        <button
          onClick={handleReset}
          disabled={loading}
          className="btn btn-reset"
        >
          리셋
        </button>
      </div>
    </div>
  );
}

export default App;
