import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('')
    const [formData, setFormData] = useState({ addressTo: "", amount: "", message: "" });
    const [loading, setIsLoading] = useState('')
    const [getTransactionLoading, setGetTransactionLoading] = useState(false)
    const [transactionCount,setTransactionCount]=useState(localStorage.getItem('transactionCount'));
    const [transactions,setTransactions]= useState([]);
    const handleChange = (e, name) => {
        console.log(formData)
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions=async()=>{
        try{

            if(!ethereum) return alert("Please install metamask")
            setGetTransactionLoading(true)
            const transactionContract=getEthereumContract();
            const availableTransactions=await transactionContract.getAllTransactions()
            setGetTransactionLoading(false)
            const structuredTransactions = availableTransactions.map(transaction=>({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                timestamp:new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message:transaction.message,
                amount:parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            console.log(structuredTransactions)
            setTransactions(structuredTransactions);
        }
        catch(error){
            console.log(error)
        }
    }
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                getAllTransactions()
            }
            else {
                console.log('No accounts found');
            }

            console.log(accounts);
        }
        catch (error) {
            console.log(error);
            throw new Error('No Ethereum object.');
        }
    }
    const checkIfTransactionExist= async ()=>{
        try{
            const transactionContract=getEthereumContract();
            const transactionCount=await transactionContract.getTransactionCount();

            localStorage.setItem('transactionCount',transactionCount)
        }
        catch(error){
            console.log(error);
            throw new Error('No Ethereum object.');
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0]);
        }
        catch (error) {
            console.log(error);
            throw new Error('No Ethereum object.');
        }
        window.location.reload()
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const { addressTo, amount, message } = formData;

            const transactionContract=getEthereumContract();
            const parseAmount=ethers.utils.parseEther(amount);
            await ethereum.request({
                method:"eth_sendTransaction",
                params:[{
                    from:connectedAccount,
                    to:addressTo,
                    gas:'0x5208', //21000 gwei
                    value:parseAmount._hex,

                }]
            })

            const transactionHash=await transactionContract.addToBlockchain(addressTo,parseAmount,message);
            setIsLoading(true);
            console.log(`Loading ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success ${transactionHash.hash}`);

            const transactionCount=await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        }
        catch (error) {
            console.log(error);
            throw new Error('No Ethereum object.');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, [])

    return (
        <TransactionContext.Provider value={{ getTransactionLoading,connectWallet,transactions, connectedAccount, formData, sendTransaction, handleChange }} >
            {children}
        </TransactionContext.Provider>
    )
}