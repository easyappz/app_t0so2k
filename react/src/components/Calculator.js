import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  const handleCalculate = async () => {
    try {
      setError('');
      const numbers = input.split(/[+\-*/]/).map(num => parseFloat(num));
      const operators = input.split('').filter(char => ['+', '-', '*', '/'].includes(char));

      if (numbers.length !== 2 || numbers.some(isNaN)) {
        setError('Please enter a valid expression with two numbers.');
        setResult(null);
        return;
      }

      if (operators.length !== 1) {
        setError('Please use exactly one operator (+, -, *, /).');
        setResult(null);
        return;
      }

      const [num1, num2] = numbers;
      const operator = operators[0];
      let endpoint = '';

      switch (operator) {
        case '+':
          endpoint = '/api/calculate/add';
          break;
        case '-':
          endpoint = '/api/calculate/subtract';
          break;
        case '*':
          endpoint = '/api/calculate/multiply';
          break;
        case '/':
          endpoint = '/api/calculate/divide';
          break;
        default:
          setError('Invalid operator.');
          return;
      }

      const response = await axios.post(endpoint, { num1, num2 });
      if (response.data && response.data.result !== undefined) {
        setResult(response.data.result);
      } else {
        setError('Unexpected response from server.');
        setResult(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error connecting to server.');
      setResult(null);
    }
  };

  const buttonLayout = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <Box className="calculator-container">
      <Paper className="calculator-paper" elevation={6}>
        <Typography className="calculator-title" variant="h5" align="center" gutterBottom>
          Calculator
        </Typography>
        <Box className="calculator-display">
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            disabled
            className="calculator-input"
            InputProps={{
              style: { fontSize: '1.5rem', textAlign: 'right' }
            }}
          />
        </Box>
        {result !== null && (
          <Typography className="calculator-result" variant="h6" align="right" gutterBottom>
            Result: {result}
          </Typography>
        )}
        {error && (
          <Typography className="calculator-error" variant="body1" align="right" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Box className="calculator-grid">
          {buttonLayout.map((btn) => (
            <Button
              key={btn}
              variant={['+', '-', '*', '/'].includes(btn) ? 'contained' : 'outlined'}
              color={btn === 'C' ? 'error' : 'primary'}
              onClick={() => {
                if (btn === 'C') handleClear();
                else if (btn === '=') handleCalculate();
                else handleButtonClick(btn);
              }}
              className={`calculator-button ${['+', '-', '*', '/'].includes(btn) ? 'operator-button' : ''} ${btn === '=' ? 'equal-button' : ''} ${btn === 'C' ? 'clear-button' : ''} ${!['+', '-', '*', '/', '=', 'C'].includes(btn) ? 'number-button' : ''}`}
            >
              {btn}
            </Button>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Calculator;
