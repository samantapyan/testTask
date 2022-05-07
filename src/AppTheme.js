import { createTheme} from "@mui/material";

export const AppTheme = createTheme({
    components : {
        MuiButton : {
            styleOverrides: {
                root : {
                    fontSize: '1rem'
                }
            }
        }
    }
})