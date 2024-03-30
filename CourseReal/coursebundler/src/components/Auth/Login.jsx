import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user.js';
import Web3 from 'web3';
import UserRegistrationABI from './UserRegistrationABI.json';
const web3 = new Web3(window.ethereum);

const contractAddress = '0xe0545c2b8990386c4ab78f3c39e5c61a50e2d5bb'; // Replace with your contract address
const contract = new web3.eth.Contract(UserRegistrationABI, contractAddress);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = async e => {
    e.preventDefault();
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const userAddress = accounts[0];
    console.log(email);
    // Call the registerUser function on the smart contract
    const result = await contract.methods
      .loginUser(email, password)
      .send({ from: userAddress });

    console.log(result);
    if (result) dispatch(login(email, password));
  };

  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="Welcome to the EduChain" />

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="password" children="password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type="password"
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password?
              </Button>
            </Link>
          </Box>

          <Button my={'4'} colorScheme={'yellow'} type="submit">
            Login
          </Button>

          <Box my={'4'}>
            New User?{' '}
            <Link to={'/register'}>
              <Button colorScheme={'yellow'} variant={'link'}>
                Sign Up{' '}
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
