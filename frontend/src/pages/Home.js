import React from 'react';
import { Box } from '@mui/material';
import HomePage2 from './Homepage2';
import HomePage from './Homepage';
// import Navbar from './Navbar';
import Carousel from '../components/Carousel'
// import Footer from '../components/Footer';


// ✅ Then your component code
const Home = () => {
  return (
    <Box>
      {/* <Navbar /> */}
      <HomePage2 />
      <HomePage />
      <Carousel />
      {/* <Footer /> */}
    </Box>
  );
};

export default Home;
