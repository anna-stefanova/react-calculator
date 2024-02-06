import {useReducer} from "react";

const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    INPUT: 'input'
}

function reducerCount(count, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return count + 1;
        case ACTIONS.DECREMENT:
            if (count === 0) return count;
            return count - 1;
        case ACTIONS.INPUT:
            return Number(action.newVal);
        default:
            throw Error('Unknown action.');
    }
}
const Counter = () => {
    const [count, dispatchCount] = useReducer(reducerCount, 0);
    return (
        <div>
            <button onClick={() => dispatchCount({type: ACTIONS.INCREMENT})}>+</button>
            <div>{count}</div>
            <input type="text" value={count}
                   onChange={e => dispatchCount({type: ACTIONS.INPUT, newVal: e.target.value})}/>
            <button onClick={() => dispatchCount({type: ACTIONS.DECREMENT})}>-</button>
        </div>
    );
};

export default Counter;