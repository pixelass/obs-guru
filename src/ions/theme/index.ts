import createTheme from "@mui/material/styles/createTheme";

const typography = {
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#663399",
		},
		secondary: {
			main: "#ffae00",
		},
		background: {
			paper: "#262428",
			default: "#ffae00",
		},
	},
	typography,
});
