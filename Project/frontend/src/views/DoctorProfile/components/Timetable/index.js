import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import Carousel from 'react-elastic-carousel'
import Item from "./Item";
import "./styles.css";

const anel;
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';

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
  },
  time:{
    margin:'0',
    fontWeight:'bold',
  },
  day:{
    margin:'0.2rem'
  }

}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 }
];

const Timetable = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const marginTop = {
    marginTop:props.isDesktop ? '4rem' : '2rem'
  }
  const header = {
    fontSize:props.isDesktop ? '1.8rem' : '1.2rem'
  }

  const items= [
    {id: 1, time: '9:30 - 10:30',day:'ПОНЕДЕЛЬНИК'},
    {id: 2, time: '9:30 - 10:30',day:'ПОНЕДЕЛЬНИК'},
    {id: 3, time: '9:30 - 10:30',day:'ПОНЕДЕЛЬНИК'},
    {id: 4, time: '14:00 - 15:00',day:'Вторник'},
    {id: 5, time: '14:00 - 15:00',day:'Вторник'}
  ]
  // const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
     
    <Grid container style={marginTop}>
        <Grid item md={12} xs={12} >
            <h2 className={classes.textCenter} style={header}>СВОБОДНОЕ ВРЕМЯ ДЛЯ ЗАПИСИ</h2>
        </Grid>

        <Grid container >
          <Carousel breakPoints={breakPoints} pagination={false} focusOnSelect={true}>
            {items.map((item) => (
              <Item key={item.id}><p className={classes.time}>{item.time}</p><p className={classes.day}>{item.day}</p> </Item>
            ))}
          </Carousel>
          {/* {items.map(item => <div key={item.id}>{item.title}</div>)} */}
        </Grid>
    </Grid>
  );
};

Timetable.propTypes = {
  className: PropTypes.string
};

export default Timetable;
