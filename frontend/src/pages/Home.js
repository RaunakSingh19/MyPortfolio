import React from 'react';
import { Box } from '@mui/material';
import HomePage2 from './Homepage2';
import HomePage from './Homepage';
// import AboutPage from './About'
import ProjectPreview from './projectpreview';
// import Carousel from '../components/Carousel'
import DigitalBusinessCard from './DigitalBusinessCard';
// import { Import } from 'lucide-react'; 

const Home = () => {

    document.oncontextmenu=()=>{
    alert("Inspect Feature is desabled")
    return false
  }
  
  return (
    <Box>
      {/* <Navbar /> */}
      <HomePage2 />
      {/* <AboutPage /> */}
      <HomePage />
      <ProjectPreview />
      <DigitalBusinessCard />
      {/* <Carousel /> */}

    </Box>
  );
};

export default Home;
