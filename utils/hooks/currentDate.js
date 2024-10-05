export const getCurrentDate = (value) => {
	const currentDate = new Date(value);
	const day = currentDate.getDate();
	const month = currentDate.toLocaleString("default", { month: "long" });
	const year = currentDate.getFullYear();
	return `${day} ${month} ${year}`;
};
