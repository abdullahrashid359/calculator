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

    const target = event.target.textContent;

    if(!operator) {
        if(firstNum && target === "." && firstNum.includes("."))
            return;

        if((!firstNum || firstNum === "0") && target === ".") {
            firstNum = "0.";
        }
        else if(!firstNum || firstNum === "0") {
            firstNum = target;
        }       
        else {
            firstNum += target;
        }

        display.textContent = firstNum;
    }
    else {
        if(secondNum && target === "." && secondNum.includes("."))
            return;

        if((!secondNum || secondNum === "0") && target === ".") {
            secondNum = "0.";
        }
        else if(!secondNum || secondNum === "0") {
            secondNum = target;
        }
        else {
            secondNum += target;
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
            display.textContent = parseFloat(Number(firstNum).toFixed(2));
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
            display.textContent = parseFloat(Number(result).toFixed(2));

        resultDisplayed = true;
    }
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    clearState();
    display.textContent = 0;
})

function eraseCharacter() {
    if(resultDisplayed) {
        clearState();
        display.textContent = "0";
    }

    if(!operator && firstNum) {
        if(firstNum.length === 1) {
            firstNum = null;
            display.textContent = "0";
        } 
        else {
            firstNum = firstNum.slice(0, firstNum.length-1);
            display.textContent = firstNum;
        }
    }
    else if(secondNum) {
        if(secondNum.length === 1) {
            secondNum = null;
            display.textContent = "0";
        } 
        else {
            secondNum = secondNum.slice(0, secondNum.length-1);
            display.textContent = secondNum;
        }
    }
}

const erase = document.querySelector(".erase");
erase.addEventListener("click", () => {
    eraseCharacter();
} )


document.addEventListener("keydown", (event) => {
    let targetElement = null;
    
    if(event.key === "*") {
        operators.forEach((op) => {
            if(op.textContent === "x")
                targetElement = op;
        })
    }
    else if(event.key === "Delete") 
        targetElement = clear;
    else if(event.key === "Backspace")
        targetElement = erase;
    else if(event.key === "=" || event.key === "Enter")
        targetElement = equals;
    else if(event.key === "+" || event.key === "-" || event.key === "/") {
        operators.forEach((op) => {
            if(op.textContent === event.key) 
                targetElement = op;
        })
    }
    else if((event.key >= "0" && event.key <= "9") || event.key === ".") {
        digits.forEach(digit => {
            if(digit.textContent === event.key) 
                targetElement = digit;
        })
    }

    if(targetElement)
        targetElement.click();
})