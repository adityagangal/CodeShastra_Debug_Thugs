import {
  Avatar,
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
import { register } from '../../redux/actions/user';
import Web3 from 'web3';
import UserRegistrationABI from './UserRegistrationABI.json'; // Assuming you have the ABI in a separate file

const web3 = new Web3(window.ethereum);

const contractAddress = '0xe0545c2b8990386c4ab78f3c39e5c61a50e2d5bb'; // Replace with your contract address
const contract = new web3.eth.Contract(UserRegistrationABI, contractAddress);

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC948',
  backgroundColor: 'white',
};

const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const userAddress = accounts[0];

    // Call the registerUser function on the smart contract
    const result = await contract.methods
      .registerUser(name, email, password, '', '')
      .send({ from: userAddress });

    console.log(result);
    if (result) dispatch(register(myForm));
  };

  return (
    <Container h={'120vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'8'}>
        <Heading children="Register to EduChain" />

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my={'4'} display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePrev} size={'2xl'} />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
              type="text"
              focusBorderColor="yellow.500"
            />
          </Box>
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
          <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              placeholder="Enter Your Password"
              type={'file'}
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>

          <Button my={'4'} colorScheme={'yellow'} type="submit">
            Sign Up
          </Button>

          <Box my={'4'}>
            Already Registered?{' '}
            <Link to={'/login'}>
              <Button colorScheme={'yellow'} variant={'link'}>
                Login{' '}
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
