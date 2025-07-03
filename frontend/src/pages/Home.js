import React from 'react';
import { Box } from '@mui/material';
import HomePage2 from './Homepage2';
import HomePage from './Homepage';
import Carousel from '../components/Carousel'
import DigitalBusinessCard from './DigitalBusinessCard';

const Home = () => {
  return (
    <Box>
      {/* <Navbar /> */}
      <HomePage2 />
      <HomePage />
      <DigitalBusinessCard />
      <Carousel />
    </Box>
  );
};

export default Home;
