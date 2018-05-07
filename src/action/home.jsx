import axios from 'axios';
import actions from './actions';
import qs from 'qs';

const {
	GET_ADMIN_SUCCESS,
    GET_ADMIN_FAILURE,
} = actions;

export function getAdmin(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`http://10.240.140.206:27105${query}`,qs.stringify(config))).data;
			dispatch({
				type: GET_ADMIN_SUCCESS,
				data: data
			});
			console.log('sss--data');
            console.log(data);
		} catch (error) {
			dispatch({
				type: GET_ADMIN_FAILURE,
				error: new Error('舆情信息总数获取失败, 请稍后再试')
			});
		}
	};
};

// axios.post('http://118.123.32.33:27105',qs.stringify(data))