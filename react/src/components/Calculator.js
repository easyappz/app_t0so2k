import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleCalculate = () => {
    try {
      const numInput = input.split(/[+\-*/]/).map(num => parseFloat(num));
      const operators = input.split('').filter(char => ['+', '-', '*', '/'].includes(char));

      if (numInput.length < 2 || numInput.some(isNaN)) {
        setResult('Error');
        return;
      }

      let calcResult = numInput[0];
      for (let i = 0; i < operators.length; i++) {
        const num = numInput[i + 1];
        switch (operators[i]) {
          case '+':
            calcResult += num;
            break;
          case '-':
            calcResult -= num;
            break;
          case '*':
            calcResult *= num;
            break;
          case '/':
            if (num === 0) {
              setResult('Error');
              return;
            }
            calcResult /= num;
            break;
          default:
            break;
        }
      }
      setResult(calcResult);
    } catch (error) {
      setResult('Error');
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
