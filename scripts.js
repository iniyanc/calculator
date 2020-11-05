function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return (b == 0) ? 'Can\'t divide by 0!' : Math.round(a / b * 1000) / 1000;
}

function operate (operator, a, b) {
    switch (operator) {
        case '+':
            return add (a, b);
            break;
        case '-':
            return subtract (a, b);
            break;
        case '*':
            return multiply (a, b);
            break;
        case '/':
            return divide (a, b);
            break;
    }
}

const display = document.querySelector('#displayPanel');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const AC = document.querySelector('#clear');
const equal = document.querySelector('#equal');
let currentValue = '';
let a;
let b;
let aConfirmed = false;
let previousOperator = '';
let resetState = false;

function digitPress (e) {
    if (resetState) {
        currentValue = '';
        resetState = false;
    }
    let str = e.target.textContent;
    currentValue += str.trim();
    display.textContent = currentValue;
}

function operatorPress (e) {
    if (resetState) resetState = false;
    if (!aConfirmed) {
        a = parseInt(currentValue);
        aConfirmed = true;

        let str = e.target.textContent;
        previousOperator = str.trim();
    }
    else {
        b = parseInt(currentValue);
        a = operate(previousOperator, a, b);
        currentValue = a;
        display.textContent = currentValue;

        let str = e.target.textContent;
        previousOperator = str.trim();
    }
    clear();
}

function equalPress () {
    if (aConfirmed) {
        currentValue = operate(previousOperator, a, parseInt(currentValue));
        display.textContent = currentValue;
        a = null;
        b = null;
        aConfirmed = false;
        previousOperator = null;
        resetState = true;
    }
}

function clear () {
    currentValue = '';
    display.textContent = currentValue;
}

function testFunction (e) {
    console.log(e.target);
}


digits.forEach(digit => digit.addEventListener('click', digitPress));
operators.forEach(operator => operator.addEventListener('click', operatorPress));
equal.addEventListener('click', equalPress);
AC.addEventListener('click', clear);




