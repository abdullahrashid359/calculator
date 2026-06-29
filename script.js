const display = document.querySelector(".display");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}

let firstNum = null;
let secondNum = null; 
let operator = null;
let resultDisplayed = false;

function operate(first, second, opr) {
    first = Number(first);
    second = Number(second);

    if(opr === '+')
        return add(first, second);
    else if (opr === '-')
        return subtract(first, second);
    else if(opr === 'X')
        return multiply(first, second);
    else if(opr === '/')
        return divide(first, second);
}

function getNumber(event) {
    if(resultDisplayed) {
        firstNum = null;
        secondNum = null;
        operator = null;
        resultDisplayed = false;
    }

    if(!operator) {
        if(!firstNum) 
            firstNum = event.target.textContent;
        else {
            firstNum += event.target.textContent;
        }

        resultDisplayed = false;
        display.textContent = firstNum;
    }
    else {
        if(!secondNum) 
            secondNum = event.target.textContent;
        else {
            secondNum += event.target.textContent;
        }
        display.textContent = secondNum;
    }
}

function getOperator(event) {
    operator = event.target.textContent;
}

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => digit.addEventListener("click", getNumber));

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => operator.addEventListener("click", getOperator));

const equals = document.querySelector(".equals");
equals.addEventListener("click", () =>  {
    const result = operate(firstNum, secondNum, operator);
    display.textContent = result;
    resultDisplayed = true;
});