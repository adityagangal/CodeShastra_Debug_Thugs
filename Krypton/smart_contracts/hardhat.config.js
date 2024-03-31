//https://eth-ropsten.alchemyapi.io/v2/enOtNNRNgT5xyfKlPg2vFsOIEh-vrocy

require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity:'0.8.0',
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/xvlidVvNpmMTd91zqAdIjUp9uRMQYqyg',
      accounts:['0605a0fc705f38c62ecf8a9f2f707032bab4d4a9f8459b3857fafdb39db7c8e0']
    }
  }
}