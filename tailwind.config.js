const colors = require("tailwindcss/colors");

module.exports = {
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./modules/**/*.{js,ts,jsx,tsx}",
		"./utils/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		colors: {
			transparent: colors.transparent,
			yellow: colors.yellow,
			red: colors.red,
			green: colors.green,
			white: colors.white,
			pink: colors.pink,
			blue: colors.blue,
			indigo: colors.indigo,
			orange: colors.orange,
			gray: colors.gray,
		},
		screens: {
			xsm: "200px",
			xxs: "320px",
			xs: { max: "575px" },
			sm: { min: "576px", max: "897px" },
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			xxl: "1536px",
		},
	},
	variants: {},
	plugins: [],
};
