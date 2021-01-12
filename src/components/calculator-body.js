import numbers from '../button-data.js';
import '../css/App.css';

export const Result = ({result}) => {
    return (
        <p id="display">{result}</p>
    )
  }
export const KeyPad = ({handleClick}) => {
    return (
      <>
      {numbers.map(number => 
      <div class="row">
      <div class="d-sm-block">
      {number.map(element => 
       <button onClick={handleClick} type="button" 
       className={element.value >= 0 || element.name === "." ? "btn btn-primary btn-lg" : element.name !== "AC" && element.name !== "CE" ? "btn btn-secondary btn-lg" : "btn btn-danger btn-lg"
  }
       id={element.id} name={element.name} value={element.value}>
  {element.value >= 0 ? element.value : element.name}</button>
      )}
      </div>
      </div>
      )}
     </>   
    )
  }
