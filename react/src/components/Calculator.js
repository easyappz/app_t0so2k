import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

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
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Paper elevation={6} sx={{
        padding: 3,
        width: 350,
        backgroundColor: '#ffffff',
        borderRadius: 3
      }}>
        <Typography variant="h5" align="center" gutterBottom>
          Calculator
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          disabled
          sx={{ marginBottom: 2, backgroundColor: '#f0f0f0' }}
        />
        {result !== null && (
          <Typography variant="h6" align="right" gutterBottom sx={{ marginBottom: 2 }}>
            Result: {result}
          </Typography>
        )}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1
        }}>
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
              sx={{
                height: 60,
                fontSize: 20,
                backgroundColor: btn === '=' ? '#4caf50' : undefined,
                '&:hover': {
                  backgroundColor: btn === '=' ? '#45a049' : undefined
                }
              }}
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
