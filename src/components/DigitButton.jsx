import {CALC_ACTIONS} from "../App.jsx";

const DigitButton = ({dispatch, digit}) => {
    return (
        <button onClick={() => dispatch({type: CALC_ACTIONS.ADD_DIGIT, payload: {digit}})}>{digit}</button>
    );
};

export default DigitButton;