import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import { Header,Description,Price,Address,Timetable} from './components';
import axios from 'axios';


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
  // const [fioState, setFio] = useState();
  // const [ratingState, setRating] = useState();
  const [header,setHeader] = useState({});
  const [description,setDescription] = useState({});
  const [price,setPrice] = useState({});


  const classes = useStyles();
  const { id } = useParams()

  useEffect(() => {
      axios.get(`http://localhost:3001/getdoctors/?doctor_id=`+id)
      .then(res => {
        const persons = res.data;
        const fio = res.data.surname +' '+res.data.name+' '+res.data.patronymic
        const rating = res.data.rating
        console.log(rating,1)
        setHeader({fio:fio,rating:rating})
        setDescription({
          experience:res.data.experience,
          education:res.data.education,
          description:res.data.description
        })
        setPrice({
          first_visit_cost:res.data.first_visit_cost,
          second_visit_cost:res.data.second_visit_cost,
        })
        
        // setFio(fio)
        // setRating(res.data.rating)
      })
  }, []);

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={12} xs={12}>
            <Header {...props} header={header}></Header>
            <Description {...props} description={description}></Description>
            <Timetable {...props}></Timetable>
            <Price {...props} price={price}></Price>
            <Address {...props}></Address>
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorProfile;
