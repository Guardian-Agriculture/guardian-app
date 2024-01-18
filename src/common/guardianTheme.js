import { createTheme } from "@mui/material";

export const guardianTheme = createTheme({
	typography: {
		fontFamily: [
			'Roboto',
			'sans-serif'
		].join(','),
	},
    palette: {
        mode: 'dark',
    },
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			}
		}
		}
	}
});
