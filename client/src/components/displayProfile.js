import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Modal
} from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DisplayProfiles() {
  const classes = useStyles();

  const [usersData, setUsersData] = React.useState([]);

  const [invalidInput, setInvalidInput] = React.useState(false);
  const [errorDetails, setErrorDetails] = React.useState("");

  useEffect(() => {
    axios.get("/profiles")
      .then(res => {
        setUsersData(res.data);
      })
      .catch(err => { 
        setInvalidInput(true);
        setErrorDetails(`Please verify if you have your node server running on port "7050" and you have implemented all the mentioned APIs! If you need help try accessing the hints!`);
      });
  }, []);

  return (
    <div style={{ display: "flex", margin: "50px", flexDirection: "row", flexWrap: "wrap" }}>
      {usersData.length === 0? <Typography>No users registered!</Typography> : <></>}
    {
      usersData.map((userData, index) => (
        <Card variant="outlined" style={{minWidth: "300px", margin: "20px"}}>
          <CardContent>
            <Typography className={classes.title}>
              {userData.name}
            </Typography>
            <Typography >
              {userData.username}
            </Typography>
            <br />
            <Typography>
              {userData.college} - {userData['year-of-graduation']}
            </Typography>
          </CardContent>
        </Card>
      ))
      }
      <Modal
        open={invalidInput}
        onClose={() => setInvalidInput(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ margin: 'auto' }}
      >
        <div className={clsx(classes.paper)} style={{ display: "flex", flexDirection: 'column' }}>
          <Typography><b>{errorDetails}</b></Typography>
          <Button
            onClick={() => setInvalidInput(false)}
            variant="contained"
            color="primary"
            style={{ marginTop: "25px", marginLeft: "auto", marginRight: 'auto' }}
          >
            close
        </Button>
        </div>
      </Modal>
    </div>
  );
}