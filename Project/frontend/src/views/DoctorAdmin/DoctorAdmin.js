import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import { Calendar, Patients} from './components';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    getFromStorage,
  } from '../../utils/storage'
  

const useStyles = makeStyles(theme => ({
  root: {
    padding: 5
  },
  content: {
    paddingTop: 50,
    textAlign: 'center'
  }
}));

const DoctorAdmin = (props) => {
    const history = useHistory();
    const { id } = useParams()
    // const [visit,setVisit] = useState('');
    const [fio,setFio] = useState('');
    const [tvc,setTvc] = useState({});
    const [tvd,setTvd] = useState({});
    const [opt,setOpt] = useState({});
    useEffect(() => {
    const obj = getFromStorage('token')
   
    if(obj && obj.token){
      // axios.get(`http://localhost:3001/getcabinetvisit/?doctor=`+id)
      //   .then(res => {
      //     // console.log(res.data);
      //     setVisit({visit: res.data.visit_not_conf, id: id})
      //     setTvc(res.data.today_visit_conf)
      //     setTvd(res.data.today_visit_done)
      //   })
      axios.get(`http://localhost:3001/getdoctors/?doctor=`+id+'&user=1')
      .then(res => {
        const fio = res.data.doctor.surname +' '+res.data.doctor.name+' '+res.data.doctor.patronymic
        setFio(fio)
      })
      
      let options = []
      axios.get('http://localhost:3001/getanalysis')
        .then(res => {
          for (let i of res.data){
            options.push({
              value: i._id,
              label: i.name
            })
          }
          setOpt(options)
        })
    }else{
        history.push('/login');
    } 
  }, [])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={12} xs={12}>
            <Calendar {...props}  fio={fio}></Calendar>
            <Patients {...props} options={opt} tvc={tvc} tvd={tvd} ></Patients>
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorAdmin;
