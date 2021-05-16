import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: '2rem'
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h4" style={{color:'black'}}>
              404: Кажется что-то пошло не так.
            </Typography>
            <Typography variant="subtitle2">
              Страница не найдена. Возможно она устарела, была удалена или Вы ввели неверный адрес
            </Typography>
            {/* <img
              alt="Under development"
              className={classes.image}
              src="/images/undraw_page_not_found_su7k.svg"
            /> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
