import './App.css'
import {useReducer} from "react";
import DigitButton from "./components/DigitButton.jsx";
import OperationButton from "./components/OperationButton.jsx";

export const CALC_ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    DELETE_DIGIT: 'delete-digit',
    CLEAR: 'clear',
    EVALUATION: 'evaluation'
}

function reducerCalc(state, {type, payload}) {
    switch (type) {
        case CALC_ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: payload.digit !== '.' ? payload.digit : `0${payload.digit}`
                }
            }
            if (payload.digit === '.' && state.currentOperand === undefined && state.previousOperand === undefined) return {
                ...state,
                currentOperand: `0${payload.digit}`
            };
            if (payload.digit === '0' && state.currentOperand === '0') return state;
            if (payload.digit === '.' && state.currentOperand.includes('.')) return state;
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            };
        case CALC_ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand === undefined && state.previousOperand === undefined) return state;
            if (state.previousOperand === undefined) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: undefined
                }
            }
            if (state.currentOperand === undefined) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }

            return {
                ...state,
                operation: payload.operation,
                previousOperand: evaluate(state),
                currentOperand: undefined
            }
        case CALC_ACTIONS.CLEAR:
            return '';
        case CALC_ACTIONS.EVALUATION:
            if (state.operation === undefined ||
                state.currentOperand === undefined ||
                state.previousOperand === undefined) {
                return state;
            }
            return {
                ...state,
                overwrite: true,
                currentOperand: evaluate(state),
                operation: undefined,
                previousOperand: undefined
            }
        case CALC_ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: undefined
                }
            }
            if (state.currentOperand === undefined) return {};
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: undefined
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
    }
}

function evaluate({currentOperand, previousOperand, operation}) {
    const current = parseFloat(currentOperand);
    const prev = parseFloat(previousOperand);
    if (isNaN(current) || isNaN(prev)) return '';
    let computation = '';
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
    }
    return computation;
}
function App() {

    const [{ currentOperand, previousOperand, operation }, dispatchCalc] = useReducer(reducerCalc, {});

  return (
      <>
          <div className="calculator-grid">
              <div className="output">
                  <div className="previous-operand">{previousOperand} {operation}</div>
                  <div className="current-operand">{currentOperand}</div>
              </div>
              <button className="span-two" onClick={() => dispatchCalc({type: CALC_ACTIONS.CLEAR})}>AC</button>
              <button onClick={() => dispatchCalc({type: CALC_ACTIONS.DELETE_DIGIT})}>DEL</button>
              <OperationButton dispatch={dispatchCalc} operation="÷"/>
              <DigitButton dispatch={dispatchCalc} digit="1"/>
              <DigitButton dispatch={dispatchCalc} digit="2"/>
              <DigitButton dispatch={dispatchCalc} digit="3"/>
              <OperationButton dispatch={dispatchCalc} operation="*"/>
              <DigitButton dispatch={dispatchCalc} digit="4"/>
              <DigitButton dispatch={dispatchCalc} digit="5"/>
              <DigitButton dispatch={dispatchCalc} digit="6"/>
              <OperationButton dispatch={dispatchCalc} operation="+"/>
              <DigitButton dispatch={dispatchCalc} digit="7"/>
              <DigitButton dispatch={dispatchCalc} digit="8"/>
              <DigitButton dispatch={dispatchCalc} digit="9"/>
              <OperationButton dispatch={dispatchCalc} operation="-"/>
              <DigitButton dispatch={dispatchCalc} digit="."/>
              <DigitButton dispatch={dispatchCalc} digit="0"/>
              <button className="span-two" onClick={() => dispatchCalc({type: CALC_ACTIONS.EVALUATION})}>=</button>
          </div>
          {/*<Counter />*/}
      </>

  )
}

export default App
