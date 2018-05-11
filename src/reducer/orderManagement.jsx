import actions from '../action/actions';

const {
	GET_ORDER_SUCCESS,
	GET_ORDER_FAILURE,

	UPDATE_ORDER_SUCCESS,
	UPDATE_ORDER_FAILURE,

	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAILURE,
} = actions;
export default (state = {}, action) => {
	switch (action.type) {
		case GET_ORDER_SUCCESS:
			return {
				...state,
				data:action.data,
			};
		case UPDATE_ORDER_SUCCESS:
			return {
				...state,
				data:action.data,
			};
		case DELETE_ORDER_SUCCESS:
			return {
				...state,
				data:action.data,
			};
		default:
			return state;
	}
};