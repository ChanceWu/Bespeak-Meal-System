import axios from 'axios';
import actions from './actions';
import qs from 'qs';
import config from '../axios/config';

const {
	GET_ADMINMESSAGE_SUCCESS,
    GET_ADMINMESSAGE_FAILURE,

    UPDATE_ADMINMESSAGE_SUCCESS,
    UPDATE_ADMINMESSAGE_FAILURE,

    UPDATE_USERMESSAGE_SUCCESS,
    UPDATE_USERMESSAGE_FAILURE,
} = actions;
const baseUrl = config.baseUrl;

export function getAdminMessage(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
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
		}
	};
};

export function updateAdminMessage(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
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

export function updateUserMessage(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
			dispatch({
				type: UPDATE_USERMESSAGE_SUCCESS,
				data: data
			});
			console.log('sss--updateusermessage');
            console.log(data);
		} catch (error) {
			dispatch({
				type: UPDATE_USERMESSAGE_FAILURE,
				error: new Error('舆情信息总数获取失败, 请稍后再试')
			});
		}
	};
};