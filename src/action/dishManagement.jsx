import axios from 'axios';
import actions from './actions';
import qs from 'qs';
import config from '../axios/config';

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
const baseUrl = config.baseUrl;
export function getDish(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
			dispatch({
				type: GET_DISH_SUCCESS,
				data: data
			});
			console.log('sss--getdish');
            console.log(data);
		} catch (error) {
			dispatch({
				type: GET_DISH_FAILURE,
				error: new Error('餐品信息获取失败, 请稍后再试')
			});
		}
	};
};
export function getAllDishes(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
			dispatch({
				type: GET_ALLDISHES_SUCCESS,
				data: data
			});
			console.log('sss--getalldishes');
            console.log(data);
		} catch (error) {
			dispatch({
				type: GET_ALLDISHES_FAILURE,
				error: new Error('餐品信息获取失败, 请稍后再试')
			});
		}
	};
};
export function addDish(form, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(form))).data;
			//debugger;
			dispatch({
				type: ADD_DISH_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: ADD_DISH_FAILURE,
				error: new Error('餐品添加失败，请稍后再试')
			});
		}
	}
};
export function deleteDish(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
			dispatch({
				type: DELETE_DISH_SUCCESS,
				data: data
			});
			console.log('sss--getdish');
            console.log(data);
		} catch (error) {
			dispatch({
				type: DELETE_DISH_FAILURE,
				error: new Error('餐品删除失败, 请稍后再试')
			});
		}
	};
};
export function updateDish(form,query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(form))).data;		
			dispatch({
				type: UPDATE_DISH_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: UPDATE_DISH_FAILURE,
				error: new Error('餐品修改失败，请稍后再试')
			});
		}
	}
};
export function insertDish(form, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(form))).data;
			//debugger;
			dispatch({
				type: INSERT_DISH_SUCCESS,
				data: data
			});
			console.log('sss--insertdish');
            console.log(data);
		} catch (error) {
			dispatch({
				type: INSERT_DISH_FAILURE,
				error: new Error('餐品添加失败，请稍后再试')
			});
		}
	}
};
export function getUserDishes(config, query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.post(`${baseUrl}${query}`,qs.stringify(config))).data;
			dispatch({
				type: GET_USERDISHES_SUCCESS,
				data: data
			});
			console.log('sss--getuserdishes');
            console.log(data);
		} catch (error) {
			dispatch({
				type: GET_USERDISHES_FAILURE,
				error: new Error('餐品信息获取失败, 请稍后再试')
			});
		}
	};
};