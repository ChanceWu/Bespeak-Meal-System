import axios from 'axios';
import actions from './actions';
import qs from 'qs';
import config from '../axios/config';

const {
	GET_ADMIN_SUCCESS,
    GET_ADMIN_FAILURE,

    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,

    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAILURE,
} = actions;
const baseUrl = config.baseUrl;

export function getAdmin(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
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
export function registerUser(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
			dispatch({
				type: REGISTER_USER_SUCCESS,
				data: data
			});
			console.log('sss--registerUser');
            console.log(data);
		} catch (error) {
			dispatch({
				type: REGISTER_USER_FAILURE,
				error: new Error('舆情信息总数获取失败, 请稍后再试')
			});
		}
	};
};
export function registerAdmin(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
			dispatch({
				type: REGISTER_ADMIN_SUCCESS,
				data: data
			});
			console.log('sss--registerAdmin');
            console.log(data);
		} catch (error) {
			dispatch({
				type: REGISTER_ADMIN_FAILURE,
				error: new Error('舆情信息总数获取失败, 请稍后再试')
			});
		}
	};
};