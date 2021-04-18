import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,Typography
} from '@material-ui/core';
// import {useImage} from 'react-image'
import {Img} from 'react-image'


const useStyles = makeStyles(() => ({
  root: {} ,
  // image:{
    
  // },
  fio:{
    color:'#1963C6',
    fontWeight:600,
    textTransform:'uppercase',
    fontFamily:"Roboto"
  },
  specialization:{
    fontFamily:"Roboto",
    fontWeight:500,
    marginTop:'-1rem'
    
  }
}));


const Header = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const header_container = {
    paddingTop:'1rem',
    width:'auto',
    textAlign:props.isDesktop ? 'left' : 'center'
  }
  const image = {
    height:props.isDesktop ?'13rem':'10rem',
    width:props.isDesktop ?'13rem':'10rem',
    borderRadius:'100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  }


  return (
    <Grid container spacing={3} >
        <Grid item md={3} xs={12}>
            <Img src= "https://images.unsplash.com/photo-1618111415275-af94e58ee05c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                style = {image}
                container={(children) => {
                    return <div className={classes.image}>{children}</div>
                }}
                // className = {classes.image}
            />
        </Grid>

        <div style={header_container}>
          <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                  stars
              </Grid>

              <Grid item md={12} xs={12}>
                <h2 className ={classes.fio}>Даморова Ольга Владимировна</h2> 
              </Grid>

              <Grid item md={12} xs={12}>
                  <p className ={classes.specialization}>Педиатр</p>
              </Grid>
          </Grid>
        </div>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
