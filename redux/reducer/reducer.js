import { SET_USER, REMOVE_USER, USER_ALL_BLOGS } from "../constants";

const initialState = {
	loggedInUserData: {
		userId: undefined,
		userEmail: undefined,
		userName: undefined,
		userImage: undefined,
		userKey: undefined,
		userDescription: "",
		theme: "#FFFFFF",
	},
	isUserLoggedIn: false,
	userAllBlogs: [],
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				loggedInUserData: {
					userEmail: action.payload.userData.userEmail,
					userId: action.payload.userData.userId,
					userImage: action.payload.userData.userImage,
					userName: action.payload.userData.userName,
					userKey: action.payload.userData.userKey,
					userDescription: action.payload.userDescription,
				},
				isUserLoggedIn: action.payload.isUserLoggedIn,
			};
		case REMOVE_USER: {
			return {
				...state,
				loggedInUserData: {
					userId: "",
					userName: "",
					userImage: "",
					userKey: "",
					userEmail: "",
				},
				isUserLoggedIn: false,
			};
		}
		case USER_ALL_BLOGS: {
			return {
				...state,
				userAllBlogs: action.payload,
			};
		}
		default:
			return state;
	}
};
