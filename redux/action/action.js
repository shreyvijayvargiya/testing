import { SET_USER, REMOVE_USER, USER_ALL_BLOGS } from "../constants";

export const setUserInStore = (payload) => {
	return async (dispatch) => {
		dispatch({ type: SET_USER, payload: payload });
	};
};

export const removeUserFromStore = (payload) => {
	return async (dispatch) => {
		dispatch({ type: REMOVE_USER, payload: payload });
	};
};

export const setUserAllBlogs = (payload) => {
	return async (dispatch) => {
		dispatch({ type: USER_ALL_BLOGS, payload: payload });
	};
};
