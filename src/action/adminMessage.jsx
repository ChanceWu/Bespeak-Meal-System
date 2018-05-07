import axios from 'axios';
import actions from './actions';
import qs from 'qs';

const {
	GET_ADMINMESSAGE_SUCCESS,
    GET_ADMINMESSAGE_FAILURE,
    UPDATE_ADMINMESSAGE_SUCCESS,
    UPDATE_ADMINMESSAGE_FAILURE,
} = actions;

export function getAdminMessage(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`http://10.240.140.206:27105${query}`,qs.stringify(config))).data;
			console.log('sss--getadminmessage');
			dispatch({
				type: GET_ADMINMESSAGE_SUCCESS,
				data: data
			});
			console.log('sss--getadminmessage');
            console.log(data);
		} catch (error) {
			dispatch({
				type: GET_ADMINMESSAGE_FAILURE,
				error: new Error('舆情信息总数获取失败, 请稍后再试')
			});
			console.log('sss--getadminmessageerror');
            console.log(error);
		}
	};
};

export function updateAdminMessage(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`http://10.240.140.206:27105${query}`,qs.stringify(config))).data;
			dispatch({
				type: UPDATE_ADMINMESSAGE_SUCCESS,
				data: data
			});
			console.log('sss--updateadminmessage');
            console.log(data);
		} catch (error) {
			dispatch({
				type: UPDATE_ADMINMESSAGE_FAILURE,
				error: new Error('舆情信息总数获取失败, 请稍后再试')
			});
		}
	};
};