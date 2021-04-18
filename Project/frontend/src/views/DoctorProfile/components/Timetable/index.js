import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const useStyles = makeStyles(() => ({
  root: {} ,
  textCenter:{
      textAlign:'center'
  },
  price:{
    borderRadius:' 0.8rem',
    background: '#E8EFFF',
    textAlign:'center',
    textTransform:'uppercase',
    margin:'1rem',
  },
  p:{
    color:'#1963C6',
    fontWeight:'bold',
    fontSize:'2rem',
    margin:'1rem'
  }
}));


const Timetable = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const marginTop = {
    marginTop:props.isDesktop ? '4rem' : '2rem'
  }
  const header = {
    fontSize:props.isDesktop ? '1.8rem' : '1.2rem'
  }

  return (
     
    <Grid container style={marginTop}>
        <Grid item md={12} xs={12} >
            <h2 className={classes.textCenter} style={header}>СВОБОДНОЕ ВРЕМЯ ДЛЯ ЗАПИСИ</h2>
        </Grid>

        <Grid container justify='space-around' >
          <Swiper
                  spaceBetween={50}
                  slidesPerView={3}
                  navigation
                  pagination={{ clickable: true }}
                  // loop = {true}
                  // onSwiper={(swiper) => console.log(swiper)}
                  // onSlideChange={() => console.log('slide change')}   
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
          </Swiper>
        </Grid>
    </Grid>
  );
};

Timetable.propTypes = {
  className: PropTypes.string
};

export default Timetable;
