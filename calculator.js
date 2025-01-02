// JavaScript for calculator functionality
const calculator = document.getElementById('calculator');
const resultDisplay = document.querySelector('.result > p');

let currentInput = ''; // Stores the current input
let previousInput = ''; // Stores the previous input
let operator = ''; // Stores the current operator

calculator.addEventListener('click', (e) => {
    const target = e.target;

    // Ignore clicks outside of spans
    if (!target.matches('span')) return;

    const value = target.textContent;

    // Clear button
    if (target.classList.contains('clear')) {
        clearAll();
        return;
    }

    // Operator buttons
    if (target.classList.contains('operator')) {
        handleOperator(value);
        return;
    }

    // Handle numbers and decimal point
    if (!isNaN(value) || value === '.') {
        appendNumber(value);
        return;
    }
});

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('');
}

function handleOperator(op) {
    if (op === '=') {
        calculate();
        return;
    }

    if (currentInput === '' && previousInput === '') {
        return; // Do nothing if no input
    }

    if (previousInput === '') {
        previousInput = currentInput;
        currentInput = '';
    } else if (currentInput !== '') {
        calculate();
    }

    operator = op;
    updateDisplay(`${previousInput} ${operator}`);
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals

    currentInput += number;
    updateDisplay(currentInput);
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '÷':
            result = num2 !== 0 ? num1 / num2 : 'Error';
            break;
        default:
            return;
    }

    previousInput = result;
    currentInput = '';
    operator = '';
    updateDisplay(result);
}

function updateDisplay(value) {
    resultDisplay.textContent = value;
}
