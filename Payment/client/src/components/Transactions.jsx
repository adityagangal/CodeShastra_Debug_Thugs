import React, { useContext,useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Tooltip, CardContent, Card, Avatar } from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
import Dropdown from './Dropdown'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TransactionContext } from '../context/TransactionContext';
import { shortAddress } from '../utils/shortenAddress'
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme({

  typography: {
    fontFamily: 'Spartan, sans-serif',
    fontStyle: 'normal',
  },
  button: {
    textTransform: "none"
  }
});

const Transactions = () => {
  const { connectedAccount, transactions,getTransactionLoading } = useContext(TransactionContext);
  const [sortWaySelect, setSortWaySelect] = useState("Latest Transactions")
  const handleCallBack = (optionSelect) => {
    setSortWaySelect(optionSelect);
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography align='center' sx={{ fontSize: "36px", color: "white", mb: 2 }}>
        {!connectedAccount && 'Connect Wallet to see transactions'}
        {connectedAccount && 'Transactions'}
      </Typography>
      {
        transactions.length !== 0 &&
        <Container sx={{ mb: 10 }}>
          <Dropdown menuOptions={['Latest Transactions', 'Price ↓', 'Price ↑']} parentCallBack={handleCallBack} />
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {
              transactions.sort((a, b) => {

                if (sortWaySelect === 'Latest Transactions') {
                  var x = a.timestamp; var y = b.timestamp;
                  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
                else if (sortWaySelect === 'Price ↓') {
                  var x = a.amount; var y = b.amount;
                  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
                else {
                  var x = a.amount; var y = b.amount;
                  return ((x > y) ? 1 : ((x < y) ? -1 : 0));
                }
              }).map(transaction => (
                <Grid item xs={12} md={4} lg={3} >
                  <Card sx={{ height: 'auto', width: "100%", backgroundColor: 'transparent', color: 'white', border: '1px solid #7766aa' }} raised>
                    <CardContent>
                      <Tooltip title={transaction.addressFrom} placement="top">
                        <Typography sx={{ fontWeight: 400, fontSize: 14, }}>
                          {`Address From: ${shortAddress(transaction.addressFrom)}`}
                        </Typography>
                      </Tooltip>
                      <Tooltip title={transaction.addressTo} placement="bottom">
                        <Typography sx={{ fontWeight: 400, fontSize: 14, my: 2 }}>
                          {`Address To: ${shortAddress(transaction.addressTo)}`}
                        </Typography>
                      </Tooltip>
                      <Typography sx={{ fontWeight: 400, fontSize: 14, }}>
                        {`Amount: ${transaction.amount} eth`}
                      </Typography>
                      <Typography sx={{ fontWeight: 400, fontSize: 14, my: 2 }}>
                        {`Message: ${transaction.message}`}
                      </Typography>
                      <Box sx={{ backgroundColor: "white", borderRadius: 10, color: '#000', p: 1, }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} align={'center'}>{transaction.timestamp}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }

          </Grid>
        </Container>
      }
      {
        (localStorage.getItem('transactionCount') === 0 && connectedAccount) && <Typography align="center" sx={{ color: "white", my: 2 }}>Seems like you don't have any existing transactions.</Typography>
      }
      {
        getTransactionLoading && <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'20px'}}><CircularProgress style={{ 'color': '#E40088' }}/></div>
      }
    </ThemeProvider>
  )
}

export default Transactions