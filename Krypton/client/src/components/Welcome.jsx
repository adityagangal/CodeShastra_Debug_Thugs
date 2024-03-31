import { Card, CardHeader, CardActions, Divider, Tooltip, Container, Avatar, TextField, IconButton, Box, Button, Grid, Typography } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import etherLogo from '../images/ether.png'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { withStyles } from '@mui/styles'
import { TransactionContext } from '../context/TransactionContext';
import { shortAddress } from '../utils/shortenAddress';
const theme = createTheme({

    typography: {
        fontFamily: 'Spartan, sans-serif',
        fontStyle: 'normal',
    },
});

const StyledTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1px solid #78909C',
            },
        },
    },
})(TextField);
const Welcome = () => {
    const { connectWallet, connectedAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);
    const handleSubmit = (e) => {
        const { addressTo, amount, message } = formData;
        e.preventDefault();
        if (!addressTo || !amount || !message) {
            return
        }
        let amtarr = amount.split(".") 
        if (amtarr.length > 2) return
        for (let i = 0; i < amount.length; i++) {
            if (amount.charAt(i) == '.' || (amount.charAt(i) >= '0' && amount.charAt(i) <= '9')) continue
            else return
        }

        sendTransaction();
    }
    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth='lg'>
                <Grid container maxWidth='lg' spacing={2} sx={{ mt: 3 }} alignItems="center" justify="center">
                    <Grid item lg={6} md={6} xs={12}>
                        <Typography align="center" sx={{ color: "white", fontSize: "36px", fontWeight: 600, mt: 10 }}>Send Crypto across the world</Typography>
                        <Typography align="center" sx={{ color: "white", fontSize: "18px", mt: 2 }}>Easy to use Web 3.0 app to send crypto across any wallet</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card
                                sx={{
                                    width: '350px',
                                    height: '200px',
                                    backgroundColor: '#CFD1E3',
                                    backgroundImage: 'linear-gradient(315deg, #f6f0c4 0%, #d99ec9 74%)',
                                    borderRadius: 3,

                                }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ backgroundColor: 'white' }} aria-label="recipe">
                                            <img src={etherLogo} width='30px' alt="logo" />
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <InfoOutlinedIcon />
                                        </IconButton>
                                    }

                                />
                                <CardActions disableSpacing>
                                    <Grid container sx={{ mt: 10 }}>
                                        <Grid item xs={6}>
                                            {!connectedAccount &&
                                                <Typography sx={{ fontWeight: 600, color: '#ff0000' }}>
                                                    Connect Wallet!
                                                </Typography>
                                            }

                                            {connectedAccount &&
                                                <Tooltip title={connectedAccount} placement="top">
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        {
                                                            shortAddress(connectedAccount)
                                                        }
                                                    </Typography>
                                                </Tooltip>
                                            }

                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='right' sx={{ fontWeight: 600 }}>
                                                Ethereum
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardActions>

                            </Card>
                        </div>
                    </Grid>
                </Grid>
                <Grid container maxWidth='lg' sx={{ mt: 5 }}>
                    <Grid item xs={12} md={6}>

                        <Box textAlign='center' sx={{ mb: 2 }}>
                            {
                                !connectedAccount && (
                                    <Button
                                        onClick={connectWallet}
                                        variant="contained"
                                        sx={{ borderRadius: 10, width: '70%', p: 2, my: 2 }}
                                    >
                                        <Typography sx={{ fontWeight: 600, wordSpacing: 10 }}>
                                            Connect Wallet
                                        </Typography>
                                    </Button>
                                )
                            }
                            <ToggleButtonGroup
                                color='success'
                                exclusive
                                sx={{ mt: 2 }}
                            >
                                <ToggleButton sx={{ fontWeight: 600, fontSize: '12px', border: '1px solid white', borderTopLeftRadius: 10, borderBottomLeftRadius: 0 }} disableRipple selected>Reliability</ToggleButton>
                                <ToggleButton sx={{ fontWeight: 600, fontSize: '12px', border: '1px solid white', }} disableRipple selected>Security</ToggleButton>
                                <ToggleButton sx={{ fontWeight: 600, fontSize: '12px', border: '1px solid white', borderTopRightRadius: 10, borderBottomRightRadius: 0 }} disableRipple selected>Ethereum</ToggleButton>
                            </ToggleButtonGroup>
                            <br />
                            <ToggleButtonGroup
                                color="success"
                                exclusive

                            >
                                <ToggleButton sx={{ fontWeight: 600, fontSize: '12px', border: '1px solid white', borderBottomLeftRadius: 10, borderTopLeftRadius: 0 }} disableRipple selected>Web 3.0</ToggleButton>
                                <ToggleButton sx={{ fontWeight: 600, fontSize: '12px', border: '1px solid white', }} disableRipple selected>Low Fees</ToggleButton>
                                <ToggleButton sx={{ fontWeight: 600, fontSize: '12px', border: '1px solid white', borderBottomRightRadius: 10, borderTopRightRadius: 0 }} disableRipple selected>Blockchain</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box textAlign='center' sx={{ width: '80%', background: 'transparent' }}>
                                <StyledTextField
                                    name='addressTo'
                                    margin='dense'
                                    sx={{ width: '100%', input: { color: "white" } }}
                                    required
                                    type='text'
                                    onChange={(e) => handleChange(e, 'addressTo')}
                                    label={<Typography sx={{ color: 'white', fontWeight: 400 }}>Address</Typography>}
                                    variant="outlined"
                                />
                                <StyledTextField
                                    name='amount'
                                    margin='dense'
                                    sx={{ width: '100%', input: { color: "white" } }}
                                    required
                                    type='number'
                                    step={0.5}
                                    onChange={(e) => handleChange(e, 'amount')}
                                    label={<Typography sx={{ color: 'white', fontWeight: 400 }}>Amount (ETH)</Typography>}
                                    variant="outlined"
                                />
                                <StyledTextField
                                    name='message'
                                    margin='dense'
                                    sx={{ width: '100%', input: { color: "white" } }}
                                    required
                                    type='text'
                                    onChange={(e) => handleChange(e, 'message')}
                                    label={<Typography sx={{ color: 'white', fontWeight: 400 }}>Message</Typography>}
                                    variant="outlined"
                                />
                                <Divider sx={{ backgroundColor: "white", my: 2 }} />
                                <Button
                                    onClick={handleSubmit}
                                    color='info'
                                    variant="outlined"
                                    sx={{ borderRadius: 10, width: '80%', p: 1.5 }}
                                >
                                    <Typography sx={{ fontWeight: 600, wordSpacing: 10 }}>
                                        Send
                                    </Typography>
                                </Button>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>

    )
}

export default Welcome