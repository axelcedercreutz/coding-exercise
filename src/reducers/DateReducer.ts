import { ViewAction } from 'actions';

const INITIAL_STATE: any = '';

export default (state = INITIAL_STATE, action: ViewAction): any => {
    switch (action.type) {
        case 'UPDATE_RANGE':
            return action.value;
        default:
            return state;
    }
};