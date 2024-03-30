import React, { useEffect } from 'react';
import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import { RiThumbUpFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const MyComponent = () => {
  useEffect(() => {
    // Function to handle redirection
    const redirectToNewLocation = () => {
      window.open('http://localhost:3001/', '_blank');
    };

    redirectToNewLocation();
  }, []);

  return (
    <div>
      <Container h={'90vh'}>
        <VStack justifyContent={'center'} h={'full'} spacing={'4'}>
          <RiThumbUpFill size={'5rem'} />
          <Heading children="Subscription done" />
          <Link to={'/'}>
            <Button variant={'ghost'}>Go to Home</Button>
          </Link>
        </VStack>
      </Container>
    </div>
  );
};

export default MyComponent;
