import React, { useState } from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,Typography
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(() => ({
  root: {} ,
  div:{
    width:'0.25%',
    background:'#1963C6'
  },
  p:{
    margin:0,
    color:'#1963C6',
    fontWeight:'bold', 
  },
  marginP:{
      margin:'0.3rem'
  }
}));


const Description = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const marginTop = {
    marginTop:props.isDesktop ? '4rem' : '2rem'
  }
  const mainDivider = {
    visibility:props.isDesktop ? 'visible' : 'hidden'
  }
  const smallDivider = {
    visibility:props.isDesktop ? 'hidden' : 'visible'
  }
  const text = {
    fontSize:props.isDesktop ? '1rem' : '0.8rem',
    marginLeft:props.isDesktop ?'1rem':'0'
  }
  const text2 = {
    fontSize:props.isDesktop ? '1rem' : '0.8rem',
    marginLeft:props.isDesktop ?'1rem':'0.5rem'
  }
  const rightBlock = {
    marginTop:props.isDesktop ? '0' : '1.5rem',
    fontSize:props.isDesktop ? '1rem' : '1rem',
    marginLeft:props.isDesktop ?'1rem':'0',
    textAlign:props.isDesktop ?'left':'center',
  }
  const rightBlock2 = {
    fontSize:props.isDesktop ? '1rem' : '0.8rem',
    marginLeft:props.isDesktop ?'1rem':'0.5rem',
    textAlign:props.isDesktop ?'left':'center',
  }

  return (
    <Grid container spacing={1} style={marginTop}>
        <Grid container spacing={1} item md={3} xs={12}>

            <Grid container item md={12} xs={12} spacing={0} >
                <Grid container item md={12} xs={5} alignItems="center">
                    <p style={text} className={classes.p}>СТАЖ РАБОТЫ</p>
                </Grid> 
                <Divider orientation="vertical" flexItem className={classes.div} style={smallDivider} />
                <Grid item md={12} xs={6} >
                    <p style={text2} className={classes.marginP}>5 лет</p>
                </Grid> 
            </Grid> 

            <Grid container item md={12} xs={12} spacing={0} >
                <Grid container item md={12} xs={5} alignItems="center" >
                    <p style={text} className={classes.p}>ОБРАЗОВАНИЕ</p>
                </Grid> 
                <Divider orientation="vertical" flexItem className={classes.div} style={smallDivider} />
                <Grid item md={12} xs={6}>
                    <p style={text2} className={classes.marginP}>АО «Медицинский Университет Астана» по специальности «Педиатрия»</p>
                </Grid> 
            </Grid>

        </Grid>

        <Divider orientation="vertical" flexItem className={classes.div} style={mainDivider} />
        
        <Grid container spacing={1} item md={9} xs={12}>
            <Grid item md={12} xs={12}>
            <p style={rightBlock}  className={classes.p}>ОСНОВНЫЕ ВИДЫ ДЕЯТЕЛЬНОСТИ</p>
            </Grid>

            <Grid item md={12} xs={12}>
            <p style={rightBlock2} className={classes.marginP}>Амбулаторное наблюдение и лечение детей от рождения до 15 лет, включая детей с болезнями органов дыхания (бронхиты, ОРЗ, аденоидит, ангины), мочевыделительной системы; паразитарные инвазии; дерматологические заболевания; аутоиммунные нарушения; плановые профилактические осмотры здоровых детей (Check-up), патронаж новорожденного включая выезд на дом по патронажу в течении первого месяца после выписки с роддома.</p> 
            </Grid>
        </Grid>
    </Grid>
  );
};

Description.propTypes = {
  className: PropTypes.string
};

export default Description;
