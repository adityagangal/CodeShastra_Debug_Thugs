import React, { useState } from 'react';
import Web3 from 'web3';

// Replace with the address of your deployed contract
const contractAddress = '0xe0545C2b8990386C4ab78f3C39E5c61a50E2D5BB';

// ABI (Application Binary Interface) of your Solidity contract
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
    ],
    name: 'addToBlockchain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllTransactions',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'message',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct Transactions.TransferStruct[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTransactionCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

function App() {
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');

  const sendTransaction = async () => {
    try {
      // Check if Web3 has been injected by the browser (MetaMask)
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        // Request access to user's MetaMask account
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the selected account
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        // Create a contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Send transaction to the contract function
        await contract.methods
          .addToBlockchain(receiver, web3.utils.toWei(amount, 'ether'), message)
          .send({ from: sender });

        // Reset form fields
        setAmount('');
        setReceiver('');
        setMessage('');

        // Display success message or update UI accordingly
        alert('Transaction sent successfully!');
      } else {
        // If MetaMask is not installed or not enabled
        alert(
          'Please install MetaMask extension and connect to Ethereum network.'
        );
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      // Display error message or update UI accordingly
      alert('Error sending transaction. Please check the console for details.');
    }
  };

  return (
    <div>
      <h1>Send Ethereum</h1>
      <label>
        Amount (ETH):
        <input
          type="text"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Receiver Address:
        <input
          type="text"
          value={receiver}
          onChange={e => setReceiver(e.target.value)}
        />
      </label>
      <br />
      <label>
        Message:
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </label>
      <br />
      <button onClick={sendTransaction}>Send Transaction</button>
    </div>
  );
}

export default App;
