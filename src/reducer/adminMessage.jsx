import actions from '../action/actions';

const {
	GET_ADMINMESSAGE_SUCCESS,
    GET_ADMINMESSAGE_FAILURE,

    UPDATE_ADMINMESSAGE_SUCCESS,
    UPDATE_ADMINMESSAGE_FAILURE,

    UPDATE_USERMESSAGE_SUCCESS,
    UPDATE_USERMESSAGE_FAILURE,
} = actions;

export default (state = {}, action) => {
	switch (action.type) {
		case GET_ADMINMESSAGE_SUCCESS:
			return {
				...state,
				adminMessage:action.data,
			};
		case UPDATE_ADMINMESSAGE_SUCCESS:
			return {
				...state,
				adminMessage:action.data,
			};
		case UPDATE_USERMESSAGE_SUCCESS:
			return {
				...state,
				adminMessage:action.data,
			};
		default:
			return state;
	}
};