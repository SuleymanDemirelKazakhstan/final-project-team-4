import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import Calendar from 'react-awesome-calendar';


const useStyles = makeStyles(() => ({
  root: {} ,
//   textCenter:{
//       textAlign:'center',
//       margin:'0.5rem'
//   },
//   icon:{
//       fontSize:'5rem',
//       color:'#1963C6',
//       margin:0
//   },
//   p:{
//     // fontSize:'1.3rem',
//     margin:0,
//     textAlign:'center'
//   }
}));


const CalendarContainer = props => {
  const classes = useStyles();
  const events = [{
        id: 1,
        color: '#fd3153',
        from: '2019-05-02T18:00:00+00:00',
        to: '2019-05-05T19:00:00+00:00',
        title: 'This is an event'
    }, {
        id: 2,
        color: '#1ccb9e',
        from: '2019-05-01T13:00:00+00:00',
        to: '2019-05-05T14:00:00+00:00',
        title: 'This is another event'
    }, {
        id: 3,
        color: '#3694DF',
        from: '2019-05-05T13:00:00+00:00',
        to: '2019-05-05T20:00:00+00:00',
        title: 'This is also another event'
    }];


  return (
    <Grid container>
        <Grid container direction='column' item md={12} xs={12} justify='center'alignItems='center' >
            {/* <Calendar
                events={events}
            /> */}
        </Grid>
    </Grid>
  );
};

CalendarContainer.propTypes = {
  className: PropTypes.string
};

export default CalendarContainer;
