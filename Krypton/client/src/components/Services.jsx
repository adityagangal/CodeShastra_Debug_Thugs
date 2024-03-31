import React from 'react'
import { Box, Container, Grid, Typography, Stack, Card, Avatar } from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GppGoodIcon from '@mui/icons-material/GppGood';
import BoltIcon from '@mui/icons-material/Bolt';
const theme = createTheme({

  typography: {
    fontFamily: 'Spartan, sans-serif',
    fontStyle: 'normal',
  },
});
const Services = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg' sx={{my:20}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: "36px", color: 'white',my:5 }}>
              Services that we continue to improve
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Card
                sx={{
                  height: "100px",
                  backgroundColor:'transparent',
                  borderRadius:3,
                  color:"#eeeeee",
                  border:'1px solid #A6BFDC'
                }}
              >
                <Grid container>
                  <Grid item xs={2}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Avatar sx={{my:3.5,backgroundColor:'#5655ff'}}>
                        <GppGoodIcon />
                      </Avatar>
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography sx={{fontSize:"24px",mt:2}}>
                      Security Guarantee
                    </Typography>
                    <Typography sx={{fontSize:'16px'}}>
                      Security is guaranteed. We always maintain privacy.
                    </Typography>
                  </Grid>
                </Grid>

              </Card>

              <Card
                sx={{
                  height: "100px",
                  backgroundColor:'transparent',
                  borderRadius:3,
                  color:"#eeeeee",
                  border:'1px solid #A6BFDC'
                }}
              >
                <Grid container>
                  <Grid item xs={2}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Avatar sx={{my:3.5,backgroundColor:'#ff5500'}}>
                        <BoltIcon />
                      </Avatar>
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography sx={{fontSize:"24px",mt:2}}>
                      Fastest Transactions
                    </Typography>
                    <Typography sx={{fontSize:'16px'}}>
                      Send Crypto within seconds.
                    </Typography>
                  </Grid>
                </Grid>

              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Services