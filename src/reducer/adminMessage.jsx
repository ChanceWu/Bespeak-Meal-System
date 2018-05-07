import actions from '../action/actions';

const {
	GET_ADMINMESSAGE_SUCCESS,
    GET_ADMINMESSAGE_FAILURE,
} = actions;

export default (state = {}, action) => {
	switch (action.type) {
		case GET_ADMINMESSAGE_SUCCESS:
			return {
				...state,
				adminMessage:action.data,
			};
		default:
			return state;
	}
};