import actions from '../action/actions';

const {
	GET_DISH_SUCCESS,
	GET_DISH_FAILURE,

	GET_ALLDISHES_SUCCESS,
	GET_ALLDISHES_FAILURE,

	ADD_DISH_SUCCESS,
	ADD_DISH_FAILURE,

	DELETE_DISH_SUCCESS,
	DELETE_DISH_FAILURE,

	UPDATE_DISH_SUCCESS,
	UPDATE_DISH_FAILURE,

	INSERT_DISH_SUCCESS,
	INSERT_DISH_FAILURE,

	GET_USERDISHES_SUCCESS,
	GET_USERDISHES_FAILURE,

} = actions;
export default (state = {}, action) => {
	switch (action.type) {
		case GET_DISH_SUCCESS:
			return {
				...state,
				data:action.data,
				// total:action.data.total,
			};
		case GET_ALLDISHES_SUCCESS:
			return {
				...state,
				data:action.data,
				// total:action.data.total,
			};
		case ADD_DISH_SUCCESS:
			return {
				...state,
				data:action.data,
				code:action.data.code,
			};
		case DELETE_DISH_SUCCESS:
			return {
				...state,
				data:action.data,			
			};
		case UPDATE_DISH_SUCCESS:
			return {
				...state,
				data:action.data,
				code:action.data.code,
			};
		case INSERT_DISH_SUCCESS:
			return {
				...state,
				data:action.data,
			};
		case GET_USERDISHES_SUCCESS:
			return {
				...state,
				data:action.data,
			};
		default:
			return state;
	}
};