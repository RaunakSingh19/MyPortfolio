import React from 'react';
import { Box } from '@mui/material';
import HomePage from './Homepage';
import HomePage2 from './Homepage2';
import Navbar from './Navbar';

// ✅ Then your component code
const Home = () => {
  return (
    <Box>
      <Navbar />
      <HomePage /> <br/> 
      <HomePage2 />
    </Box>
  );
};

export default Home;
