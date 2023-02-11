
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [output, setOutput] = useState(null);

  const handleSubmit = async () => {
    if (!/^\d+$/.test(num1) || !/^\d+$/.test(num2)) {
      alert('Please enter a valid number');
      return;
    }

    try {
      const res = await axios.post('/api/add', { num1, num2 });
      setOutput(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Step Addition</h1>
      <div>
        <input
          type="text"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <button onClick={handleSubmit}>Generate Steps</button>
      </div>
      {output && (
        <div>
          <h2>Steps:</h2>
          {output.map((step, index) => (
            <div key={index}>
              <p>Carry: {step.carryString}</p>
              <p>Sum: {step.sumString}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;