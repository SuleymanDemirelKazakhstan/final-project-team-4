import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, mergeClasses } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import Carousel from 'react-elastic-carousel'
import Item from "./Item";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import "./styles.css";

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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    borderRadius:'0.5rem',
    padding: '1.6rem',
    fontFamily:"Roboto",
    outline:'none'
  },
  buttons:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop:'1.5rem'
  }

}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 }
];

const Timetable = props => {
  // const { className } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleCloseAndSaveTime = () => {
    setOpen(false);
    console.log('kek')
  };

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
  return (
     
    <Grid container style={marginTop}>
        <Grid item md={12} xs={12} >
            <h2 className={classes.textCenter} style={header}>СВОБОДНОЕ ВРЕМЯ ДЛЯ ЗАПИСИ</h2>
        </Grid>

        <Grid container >
          <Carousel breakPoints={breakPoints} pagination={false} focusOnSelect={true}>
            {items.map((item) => (
              <Item key={item.id} onClick={handleOpen}><p className={classes.time}>{item.time}</p><p className={classes.day}>{item.day}</p> </Item>
            ))}
          </Carousel>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h3 id="transition-modal-title">Хотите записаться на это время?</h3>
                {/* <p id="transition-modal-description">Хотите записаться на это время?</p> */}

                <div className={classes.buttons}>
                  <Button variant="outlined" color="primary" style={{padding: '0.5rem 3rem'}} onClick={handleCloseAndSaveTime}>Да</Button>
                  <Button variant="outlined" color="primary" style={{padding: '0.5rem 3rem'}} onClick={handleClose}>Нет</Button>
                </div>
                
              </div>
            </Fade>
          </Modal>
        </Grid>
    </Grid>
  );
};

Timetable.propTypes = {
  className: PropTypes.string
};

export default Timetable;
