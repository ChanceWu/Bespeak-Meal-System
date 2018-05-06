import actions from '../action/actions';

const {
	GET_ADMIN_SUCCESS,
    GET_ADMIN_FAILURE,
} = actions;

export default (state = {}, action) => {
	switch (action.type) {
		case GET_ADMIN_SUCCESS:
			return {
				...state,
				admin:action.data,
			};
		default:
			return state;
	}
};