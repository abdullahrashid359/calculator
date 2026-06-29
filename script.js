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

function clearState() {
    firstNum = null;
    secondNum = null;
    operator = null;
    resultDisplayed = false;
}

function operate(first, second, opr) {
    if(first === null || second === null) 
        return undefined;

    first = Number(first);
    second = Number(second);
    if(second === 0 && opr === '/') {
        display.textContent = "ERROR! You can't divide by 0";
        clearState();
        return;
    }

    if(opr === '+')
        return add(first, second);
    else if (opr === '-')
        return subtract(first, second);
    else if(opr === 'x')
        return multiply(first, second);
    else if(opr === '/')
        return divide(first, second);
}

function getNumber(event) {
    if(resultDisplayed) {
        clearState();
    }

    if(!operator) {
        if(!firstNum) {
            if(event.target.textContent === "0")
                return;
            firstNum = event.target.textContent;
        }       
        else {
            firstNum += event.target.textContent;
        }

        display.textContent = firstNum;
    }
    else {
        if(!secondNum) {
            secondNum = event.target.textContent;
        }
        else {
            secondNum += event.target.textContent;
        }
        display.textContent = secondNum;
    }
}

function getOperator(event) {
    if(resultDisplayed) {
        firstNum = display.textContent;
        secondNum = null;
        operator = event.target.textContent
        resultDisplayed = false;
        return;
    }
    
    if(operator && secondNum) {
        firstNum = operate(firstNum, secondNum, operator);
        secondNum = null;
        if(Number.isInteger(Number(firstNum)))
            display.textContent = firstNum;
        else
            display.textContent = Number(firstNum).toFixed(2);
    }
    operator = event.target.textContent;
}

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => digit.addEventListener("click", getNumber));

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => operator.addEventListener("click", getOperator));

const equals = document.querySelector(".equals");
equals.addEventListener("click", () =>  {
    const result = operate(firstNum, secondNum, operator);

    if(result !== undefined) {
        if(Number.isInteger(result))
            display.textContent = result;
        else
            display.textContent = Number(result).toFixed(2);

        resultDisplayed = true;
    }
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    clearState();
    display.textContent = 0;
})