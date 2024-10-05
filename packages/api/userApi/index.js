import firebase from "firebase";

export const getAllPublicBlogsApiApi = async () => {
	try {
		let allBlogs = [];
		const data = await firebase
			.firestore()
			.collection("Blogit")
			.where("public", "==", true);
		data.docs.forEach((doc) => {
			allBlogs.push({
				id: doc.id,
				...doc.data(),
			});
		});
		return allBlogs;
	} catch (e) {
		console.log(e, "error in getting public blog");
		return null;
	}
};

export const storeUserInDatabaseApi = async (userDetails) => {
	try {
		await firebase
			.firestore()
			.collection("User")
			.doc(userDetails.userId)
			.set(userDetails);
		return userDetails.userId;
	} catch (error) {
		console.log(error, "error");
	}
};
