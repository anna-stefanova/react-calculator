import {CALC_ACTIONS} from "../App.jsx";

const EvaluationButton = ({dispatch, operation}) => {
    return (
        <button onClick={() => dispatch({type: CALC_ACTIONS.EVALUATION, payload: {operation}})}>{operation}</button>
    );
};

export default EvaluationButton;