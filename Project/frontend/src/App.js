import React, { useState, useEffect }from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

export default function App()  {
  const [width, setWindowWidth] = useState(0);

  useEffect( () => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [])

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const responsive = {
    isDesktop: width > 1023
  }
  
  return (
    <Router history={browserHistory}>
      <Routes isDesktop ={responsive.isDesktop} />
    </Router>
  );
}
