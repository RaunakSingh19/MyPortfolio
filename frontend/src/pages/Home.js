import React from 'react';
import { Box } from '@mui/material';
import HomePage2 from './Homepage2';
import HomePage from './Homepage';
import ProjectPreview from './projectpreview';
import DigitalBusinessCard from './DigitalBusinessCard';

const Home = () => {
  return (
    <Box>
      <HomePage2 />
      <HomePage />
      <ProjectPreview />
      <DigitalBusinessCard />
    </Box>
  );
};

export default Home;
