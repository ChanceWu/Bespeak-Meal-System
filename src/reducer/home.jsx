import actions from '../action/actions';

const {
	GET_ADMIN_SUCCESS,
    GET_ADMIN_FAILURE,

    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,

    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAILURE,

} = actions;

export default (state = {}, action) => {
	switch (action.type) {
		case GET_ADMIN_SUCCESS:
			return {
				...state,
				data:action.data,
			};
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				data:action.data,
			};
		case REGISTER_ADMIN_SUCCESS:
			return {
				...state,
				data:action.data,
			};
		default:
			return state;
	}
};