const displayHistory = document.querySelector('[data-display-history]');
const displayResult = document.querySelector('[data-display-result]');
const buttons = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const resetBtn = document.querySelector('[data-reset]');
const equalsBtn = document.querySelector('[data-equals]');

class Calculator {
  constructor(displayHistory, displayResult) {
    this.displayHistory = displayHistory;
    this.displayResult = displayResult;
    this.history = '';
    this.reset();
  }

  reset() {
    this.history = '';
    this.currentOperand = ''
    this.displayHistory.textContent = '';
    this.displayResult.textContent = '0';
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);

    if (/\s/.test(this.history.charAt(this.history.length - 2))) {
      this.history = this.history.toString().slice(0, -2);
      const tempHistory = this.history.match(/\d+(?:\.\d+)?|[\+\-\x\÷]/g);

      if (isNaN(Number(tempHistory.slice(-1)))) {
        this.currentOperand = '';
      } else {
        this.currentOperand = tempHistory.slice(-1);
      }
    }
    else if (/\s/.test(this.history.charAt(this.history.length - 1))) {
      this.history = this.history.toString().slice(0, -3);
      const tempHistory = this.history.match(/\d+(?:\.\d+)?|[\+\-\x\÷]/g);

      if (isNaN(Number(tempHistory.slice(-1)))) {
        this.currentOperand = '';
      } else {
        this.currentOperand = tempHistory.slice(-1);
      }
    }
    else {
      this.history = this.history.toString().slice(0, -1);
    }

    this.displayHistory.textContent = this.history;
    this.compute();

    if (this.history === '' && this.currentOperand === '') return this.displayResult.textContent = '0';
  }

  appendNumber(number) {
    if (this.currentOperand.length === 10) return;

    if (number === '.' && this.currentOperand.includes('.')) return;

    this.currentOperand += number;
    this.updateDisplay();
  }

  updateDisplay(operation = undefined) {
    const operationRegex = /[\+\-\x\÷]/;

    if (!operation && !operationRegex.test(this.history)) {
      if (!this.currentOperand) return;

      this.history = this.currentOperand;
      this.displayHistory.textContent = this.history;

      this.compute();
    }
    else if (!operation && operationRegex.test(this.history)) {
      this.history = `${this.history}${this.currentOperand}`;

      const tempHistory = this.history.match(/\d+(?:\.\d+)*|[\+\-\x\÷]/g);
      tempHistory.pop();
      tempHistory.push(this.currentOperand);

      this.history = tempHistory.join(' ');
      this.displayHistory.textContent = tempHistory.join(' ');

      this.compute();
    }
    else if (operation) {
      if (this.currentOperand === '') return;

      this.currentOperand = '';

      this.history = `${this.history} ${operation} `;
      this.displayHistory.textContent = this.history;
    }
  }

  compute(equation = this.history, reduceHistory = false) {
    const incompleteEquation = /[\+\-\x\÷] ?$/ // Regex for identifying incomplete equations (x + ).
    const add = /^-?(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/ // Regex for identifying addition (x + y).
    const sub = /^-?(\d+(?:\.\d+)?) ?\- ?(\d+(?:\.\d+)?)/  // Regex for identifying subtraction (x - y).
    const mul = /(\d+(?:\.\d+)?) ?\x ?(\d+(?:\.\d+)?)/ // Regex for identifying multiplication (x * y).
    const div = /(\d+(?:\.\d+)?) ?\÷ ?(\d+(?:\.\d+)?)/ // Regex for identifying division (x / y).

    if (isNaN(Number(equation))) {
      if (incompleteEquation.test(equation)) {
        let newEquation = equation.slice(0, -2);

        return this.compute(newEquation, reduceHistory);
      }
      else if (div.test(equation)) {
        let newEquation = equation.replace(div, (match, firstOperand, secondOperand) => {
          return Number(firstOperand) / Number(secondOperand)
        });

        return this.compute(newEquation, reduceHistory);
      }
      else if (mul.test(equation)) {
        let newEquation = equation.replace(mul, (match, firstOperand, secondOperand) => {
          return Number(firstOperand) * Number(secondOperand)
        });

        return this.compute(newEquation, reduceHistory);
      }
      else if (sub.test(equation)) {
        let newEquation = equation.replace(sub, (match, firstOperand, secondOperand) => {
          if (match.charAt(0) == '-') return - Number(firstOperand) - Number(secondOperand);

          return Number(firstOperand) - Number(secondOperand);
        });

        return this.compute(newEquation, reduceHistory);
      }
      else if (add.test(equation)) {
        let newEquation = equation.replace(add, (match, firstOperand, secondOperand) => {
          if (match.charAt(0) == '-') return - Number(firstOperand) + Number(secondOperand);

          return Number(firstOperand) + Number(secondOperand);
        });

        return this.compute(newEquation, reduceHistory);
      }
    }
    else {
      this.displayResult.textContent = equation;

      if (reduceHistory) {
        this.currentOperand = equation;
        this.history = equation;
        this.displayHistory.textContent = equation;
      }
    }
  }
}

const calculator = new Calculator(displayHistory, displayResult);

deleteBtn.addEventListener('click', () => calculator.delete());
resetBtn.addEventListener('click', () => calculator.reset());
equalsBtn.addEventListener('click', () => calculator.compute(displayHistory.textContent, true));

buttons.forEach(button => {
  button.addEventListener('click', () => calculator.appendNumber(button.value));
});

operations.forEach(button => {
  button.addEventListener('click', () => calculator.updateDisplay(button.value));
});
