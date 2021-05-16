import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    marginTop:'3rem'
  }
}));

const Main = props => {
  const { children } = props;
  const classes = useStyles();
  const root = {
    paddingTop: '0rem',
    paddingLeft: props.isDesktop ? '1rem' : '0.5rem',
    paddingRight: props.isDesktop ? '1rem' : '0.5rem',
    height: '100%',
    fontFamily:"Roboto",
  } 
  
  return (
    <div
      style = {root}
    >     
      <main className={classes.content}>
          {children}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
