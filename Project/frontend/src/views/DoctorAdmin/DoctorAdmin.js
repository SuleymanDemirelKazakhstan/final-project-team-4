import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import { Calendar} from './components';
// import axios from 'axios';
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
//   const [header,setHeader] = useState({});
//   const [description,setDescription] = useState({});
//   const [price,setPrice] = useState({});
useEffect(() => {
    const obj = getFromStorage('token')
   
    if(obj && obj.token){
        //get request 
        
    }else{
        history.push('/login');
    } 

})

  const classes = useStyles();
//   useEffect(() => {
//       axios.get(`http://localhost:3001/getdoctors/?doctor_id=`+id)
//       .then(res => {
//         const persons = res.data;
//         const fio = res.data.surname +' '+res.data.name+' '+res.data.patronymic
//         const rating = res.data.rating
//         console.log(rating,1)
//         setHeader({fio:fio,rating:rating})
//         setDescription({
//           experience:res.data.experience,
//           education:res.data.education,
//           description:res.data.description
//         })
//         setPrice({
//           first_visit_cost:res.data.first_visit_cost,
//           second_visit_cost:res.data.second_visit_cost,
//         })
        
//         // setFio(fio)
//         // setRating(res.data.rating)
//       })
//   }, []);

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={12} xs={12}>
            kek
            <Calendar {...props} 
            // header={header}
            ></Calendar>
            {/* <Description {...props} description={description}></Description>
            <Timetable {...props}></Timetable>
            <Price {...props} price={price}></Price>
            <Address {...props}></Address> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorAdmin;
