const display = document.querySelector(".display");


// Basic math operations

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

// Tracks whether the display currently shows a calculated result
// Used to determine if the next digit press should start a fresh number

let resultDisplayed = false;

function clearState() {
    firstNum = null;
    secondNum = null;
    operator = null;
    resultDisplayed = false;
}

// Pure function which only computes and returns the result or "ERROR". 
// It doesn't handle DOM manipulation

function operate(first, second, opr) {
    if(first === null || second === null) 
        return undefined;

    first = Number(first);
    second = Number(second);

    // Returns "ERROR" instead of crashing, caller handles display and reset

    if(second === 0 && opr === '/') 
        return "ERROR";

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
    // If a result was just shown, pressing a digit should start a new calculation

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
    // If an operator is pressed right after a result, treat the result
    // as the new firstNum and prepare for the next operation

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
        display.textContent = parseFloat(Number(firstNum).toFixed(2));
    }
    operator = event.target.textContent;
}

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => digit.addEventListener("click", getNumber));

const operators = document.querySelectorAll(".operator");
operators.forEach((op) => op.addEventListener("click", getOperator));

// Calculate the result by calling operate and updates display accordingly

const equals = document.querySelector(".equals");
equals.addEventListener("click", () =>  {
    const result = operate(firstNum, secondNum, operator);

    if(result === "ERROR") {
        display.textContent = "ERROR! You can't divide by 0";
        clearState();
        return;
    }
    
    if(result !== undefined) {
        display.textContent = parseFloat(Number(result).toFixed(2));
        resultDisplayed = true;
    }
});

// AC button/Delete key handler

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    clearState();
    display.textContent = 0;
})

// Delete button/Backspace key handler 

function eraseCharacter() {
    if(resultDisplayed) {
        clearState();
        display.textContent = "0";
        return;
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


// Maps keyboard keys to existing buttons and triggers their click handlers
// This avoids duplicating logic between mouse and keyboard input

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