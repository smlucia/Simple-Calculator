//implementing the calculator class
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    selectOperator(operator) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculateValue()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculateValue() {
        let calculatedValue
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operator) {
            case '+':
                calculatedValue = prev + current
                break

            case '-':
                calculatedValue = prev - current
                break

            case '*':
                calculatedValue = prev * current
                break

            case '/':
                calculatedValue = prev / current
                break

            default :
                return
        }
        this.currentOperand = calculatedValue
        this.previousOperand = ''
        this.operator = undefined
    }

    retrieveNumber (number) {
        const stringNumber = number.toString()
        const decimalDigit = stringNumber.split('.')[1]
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        let integerDisplay
        if (isNaN(integerDigit)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigit.toLocaleString ('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`
        } else {
            return integerDisplay
        }
    }

    update() {
        this.currentOperandText.textContent = 
            this.retrieveNumber(this.currentOperand)
        if(this.operator != null) {
            this.previousOperandText.textContent = 
                `${this.retrieveNumber(this.previousOperand)} ${this.operator}`
        } else {
            this.previousOperandText.textContent = ''
        }
    }
}

const numberButton = document.querySelectorAll('[data-number]')
const operatorButton = document.querySelectorAll('[data-operator]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent)
        calculator.update()
    })
})

operatorButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperator(button.textContent)
        calculator.update()
    })
})

equalButton.addEventListener('click', button => {
    calculator.calculateValue()
    calculator.update()
})

clearAllButton.addEventListener('click', button => {
    calculator.clear()
    calculator.update()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.update()
})