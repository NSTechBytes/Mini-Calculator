let display = document.getElementById('display');

// Function to append value to the display
function appendValue(value) {
  const lastChar = display.value.slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) {
    return; // Prevent consecutive operators
  }
  display.value += value;
}

// Function to evaluate the expression manually (without using eval or new Function)
function calculate() {
  try {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      display.value = 'Error: Invalid expression';
      return;
    }

    // Evaluate the expression using a custom parser
    const result = evaluateExpression(display.value);
    display.value = result;
  } catch (error) {
    console.error('Calculation error:', error);
    display.value = `Error: ${error.message}`;
  }
}

// Custom function to evaluate arithmetic expression manually
function evaluateExpression(expression) {
  // Split the expression into numbers and operators
  let numbers = expression.split(/[\+\-\*\/]/).map(Number);
  let operators = expression.split(/[\d\.]+/).filter(op => op);

  // Apply multiplication and division first
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '/') {
      const result = operators[i] === '*' 
                    ? numbers[i] * numbers[i + 1]
                    : numbers[i] / numbers[i + 1];
      numbers.splice(i, 2, result); // Replace numbers with the result
      operators.splice(i, 1); // Remove the operator
      i--; // Adjust index to continue evaluating
    }
  }

  // Apply addition and subtraction
  for (let i = 0; i < operators.length; i++) {
    const result = operators[i] === '+' 
                  ? numbers[i] + numbers[i + 1]
                  : numbers[i] - numbers[i + 1];
    numbers.splice(i, 2, result); // Replace numbers with the result
    operators.splice(i, 1); // Remove the operator
    i--; // Adjust index to continue evaluating
  }

  // The final result will be the only number left
  return numbers[0];
}

// Function to clear the display
function clearDisplay() {
  display.value = '';
}

// Adding event listeners to buttons
document.getElementById('btn1').addEventListener('click', () => appendValue('1'));
document.getElementById('btn2').addEventListener('click', () => appendValue('2'));
document.getElementById('btn3').addEventListener('click', () => appendValue('3'));
document.getElementById('btnAdd').addEventListener('click', () => appendValue('+'));

document.getElementById('btn4').addEventListener('click', () => appendValue('4'));
document.getElementById('btn5').addEventListener('click', () => appendValue('5'));
document.getElementById('btn6').addEventListener('click', () => appendValue('6'));
document.getElementById('btnSubtract').addEventListener('click', () => appendValue('-'));

document.getElementById('btn7').addEventListener('click', () => appendValue('7'));
document.getElementById('btn8').addEventListener('click', () => appendValue('8'));
document.getElementById('btn9').addEventListener('click', () => appendValue('9'));
document.getElementById('btnMultiply').addEventListener('click', () => appendValue('*'));

document.getElementById('btn0').addEventListener('click', () => appendValue('0'));
document.getElementById('btnEqual').addEventListener('click', calculate);
document.getElementById('btnClear').addEventListener('click', clearDisplay);
document.getElementById('btnDivide').addEventListener('click', () => appendValue('/'));
