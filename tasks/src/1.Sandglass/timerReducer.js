export const changeSeconds = (value) => ({
    type: 'CHANGE_SECONDS',
    value
});

export const restart = () => ({
    type: 'RESTART',
    seconds: 15
});

export const timerReducer = (state = {seconds: 15}, action) => {
    switch (action.type) {
        case 'CHANGE_SECONDS': {
            let curr = state.seconds + action.value;
            if (curr < 0)
                return {seconds: 0};
            else if (curr > 15)
                return {seconds: 15};
            else return {seconds: state.seconds + action.value};
        }
        case 'RESTART':{
            return {seconds:action.seconds}
        }
        default:
            return state;
    }
};
