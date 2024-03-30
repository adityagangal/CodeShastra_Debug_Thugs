import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: 'Spartan, sans-serif',
        fontStyle: 'normal',
    }
});

const Navbar = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" elevation={0} color='transparent'>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Typography
                            noWrap
                            sx={{ fontSize:'32px',color:'white',fontWeight:600,flexGrow: 1, textAlign: "center", alignItems: "center", display: 'flex', justifyContent: "center", display: { xs: 'none', md: 'flex' } }}
                        >
                            KRYPTON
                        </Typography>

                        <Typography
                            noWrap
                            sx={{ fontSize:'32px',color:'white',fontWeight:600,flexGrow: 1, textAlign: "center", alignItems: "center", display: 'flex', justifyContent: "center", display: { xs: 'flex', md: 'none' } }}
                        >
                            KRYPTON
                        </Typography>

                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Navbar