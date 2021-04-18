import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import { Header,Description,Price,Address,Timetable} from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: 5
  },
  content: {
    paddingTop: 50,
    textAlign: 'center'
  }
}));

const DoctorProfile = (props) => {
  const classes = useStyles();
  const { id } = useParams()

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={12} xs={12}>
            <Header {...props}></Header>
            <Description {...props}></Description>
            <Timetable {...props}></Timetable>
            <Price {...props}></Price>
            <Address {...props}></Address>
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorProfile;
