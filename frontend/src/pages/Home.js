import React from 'react';
import { Box } from '@mui/material';
import HomePage2 from './Homepage2';
import HomePage from './Homepage';
import Navbar from './Navbar';


// ✅ Then your component code
const Home = () => {
  return (
    <Box>
      <Navbar />
      <HomePage2 />
      <HomePage />
    </Box>
  );
};

export default Home;
