import axios from 'axios';
import actions from './actions';
import qs from 'qs';
import config from '../axios/config';

const {
	GET_ORDER_SUCCESS,
	GET_ORDER_FAILURE,

	UPDATE_ORDER_SUCCESS,
	UPDATE_ORDER_FAILURE,

	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAILURE,

} = actions;
const baseUrl = config.baseUrl;
export function getOrder(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
			dispatch({
				type: GET_ORDER_SUCCESS,
				data: data
			});
			console.log('sss--getorder');
            console.log(data);
		} catch (error) {
			dispatch({
				type: GET_ORDER_FAILURE,
				error: new Error('订单信息获取失败, 请稍后再试')
			});
		}
	};
};

export function updateOrder(config,query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;		
			dispatch({
				type: UPDATE_ORDER_SUCCESS,
				data: data
			});
			console.log('sss--updataorder');
            console.log(data);
		} catch (error) {
			// message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: UPDATE_ORDER_FAILURE,
				error: new Error('订单修改失败，请稍后再试')
			});
		}
	}
}
export function deleteOrder(config,query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;		
			dispatch({
				type: DELETE_ORDER_SUCCESS,
				data: data
			});
			console.log('sss--deleteorder');
            console.log(data);
		} catch (error) {
			// message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: DELETE_ORDER_FAILURE,
				error: new Error('订单修改失败，请稍后再试')
			});
		}
	}
}
