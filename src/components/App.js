import React, { useState} from 'react';
import { Result, KeyPad } from './calculator-body.js';
import '../css/App.css';

const App = () => {
  const [display, setDisplay] = useState(0);
  const [decimalAllowed, setDecimalAllowed] = useState(true)
  let displayValue = "" + display
  
  const calculate = () => {
     const parseDivisionSeparatedExpression = (expression) => { 
    const numbersString = expression.split("/")
    const numbers = numbersString.map(noStr => Number(noStr));
    const result = numbers.reduce((acc, no) => 
    parseFloat(acc) / parseFloat(no));
    return result;
}
 // both / *
const parseMultiplicationSeparatedExpression = (expression) => {
	const numbersString = expression.split('*');
	const numbers = numbersString.map(noStr => parseDivisionSeparatedExpression(noStr));
	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => 
parseFloat(acc) * parseFloat(no), initialValue);
	return result;
};

// both / * -
const parseMinusSeparatedExpression = (expression) => {
	const numbersString = expression.split('-');
	const numbers = numbersString.map(noStr => parseMultiplicationSeparatedExpression(noStr));
	const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, no) => 
  parseFloat(acc) - parseFloat(no), initialValue);
	return result;
};

// / * - +
	const numbersString = displayValue.split('+');
	const numbers = numbersString.map(noStr => parseMinusSeparatedExpression(noStr));
	const initialValue = 0.0;
	const result = numbers.reduce((acc, no) => 
  parseFloat(acc) + parseFloat(no), initialValue);
     return result
  }
  
  const handleClick = (e) => {
    if (e.target.name === "AC") {
      setDecimalAllowed(true)
      setDisplay(0)
    }
    
    if (e.target.value) {
      displayValue = display + e.target.value
      setDisplay(displayValue)
    }
    
    if (e.target.name === '.' && decimalAllowed) {
      displayValue += e.target.name
      setDisplay(displayValue)
      setDecimalAllowed(false)
    }
    
    if (displayValue.startsWith("0") && !displayValue.includes(".")) {
      displayValue = e.target.value
      setDisplay(displayValue)
    }
    
    if (e.target.name === "+" || e.target.name === "-" || e.target.name === "*" || e.target.name === "/") { 
      setDecimalAllowed(true)
      displayValue += e.target.name
      setDisplay(displayValue)
    }
      
    if (e.target.name === "=") {
      setDisplay(calculate())    
    }
    
    if (displayValue.includes("*-") && e.target.name === "=") {
	const numbersString = displayValue.split('*');
	const numbers = numbersString.map(noStr => Number(noStr));
	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => 
parseFloat(acc) * parseFloat(no), initialValue);
  setDisplay(result)
    }
    
    if (displayValue.includes("*-+") && e.target.name === "=") {
      
	const numbersString = displayValue.split('*-');
	const numbers = numbersString.map(noStr => Number(noStr));
	const initialValue = 0.0;
	const result = numbers.reduce((acc, no) => 
  parseFloat(acc) + parseFloat(no), initialValue);
     setDisplay(result)
    }

    if (displayValue.includes("/-") && e.target.name === "=") {
      	const numbersString = displayValue.split('/');
	const numbers = numbersString.map(noStr => Number(noStr));
	const result = numbers.reduce((acc, no) => 
  parseFloat(acc) / parseFloat(no));
     setDisplay(result)
    }
    
    if (e.target.name === "CE" && displayValue.length) {
      setDisplay(displayValue.slice(0, -1))
    }
  }
  
  return (
     <div className="container-fluid">
    <div class="card">
  <div class="card-body">
     <h5 class="card-title text-center">React Calculator</h5>
    <Result result={display}/>
    <KeyPad handleClick={handleClick}/>
  </div>
</div>
</div>
  )
}

export default App;
