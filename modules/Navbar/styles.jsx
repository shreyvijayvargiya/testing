import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, props) => ({
	root: {
		padding: "12px",
		color: "black",
		borderBottom: `1px solid ${theme.colors.gray[9]}`,
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		background: theme.colors.gray[0],
		width: "100%",
		zIndex: 50,
	},
	hamburger: {
		display: "none",
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			display: "flex",
		},
	},
	searchInput: {
		color: theme.colors.gray[4],
		border: props.showSearch
			? `2px solid ${theme.colors.yellow[8]}`
			: `1px solid ${theme.colors.gray[8]}`,
		cursor: "pointer",
		[`@media (max-width: ${theme.breakpoints.lg}px)`]: {
			width: "300px",
		},
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			width: "200px",
		},
	},
	topbar: {
		boxShadow: "none",
		width: "100%",
		margin: "auto",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		zIndex: 10,
		padding: theme.spacing.xs,
	},
	title: {
		color: "black",
		padding: 0,
		textAlign: "left",
		"&:hover": {
			cursor: "pointer",
		},
		display: "flex",
		justifyContent: "start",
		alignItems: "center",
		"& .MuiIconButton-root": {
			padding: "4px",
		},
	},
	name: {
		color: "black",
		marginLeft: "4px",
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			display: "none",
		},
	},
	img: {
		objectFit: "contain",
		width: "2em",
		padding: "4px",
		marginRight: "4px",
		marginLeft: "4px",
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			margin: "auto",
			width: "2em",
			margin: theme.spacing.sm,
		},
	},
	flex: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			justifyContent: "center",
		},
	},
	drawer: {
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		height: "60vh",
		border: `1px solid ${theme.colors.gray[8]}`,
		scrollBarWidth: "0px",
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: theme.spacing.md,
			height: "85vh",
		},
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			height: "70vh",
		},
		"&::-webkit-scrollbar": {
			display: "none",
			width: "0px",
		},
		scrollbarWidth: "none",
	},
}));
