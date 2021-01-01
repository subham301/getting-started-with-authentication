import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  Button,
  Card,
  CardContent,
  Typography,
  InputLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
  IconButton,
  Modal
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10ch',
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    display: 'flex',
    'margin-left': 'auto',
    'margin-right': 'auto'
  },
  cardContent: {
    'margin': '2ch',
    display: 'flex',
    flexDirection: 'column'
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

export default function Login() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '',
    password: '',
  });

  const [invalidInput, setInvalidInput] = React.useState(false);

  const [hidePassword, setHidePassword] = React.useState(true);

  const defaultErrorText = "Please enter all the required details!";
  const [errorDetails, setErrorDetails] = React.useState(defaultErrorText);

  const [successfulLogin, setSuccessfulLogin] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setInvalidInput(false);
    setErrorDetails(defaultErrorText);

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (event) => {
    event.preventDefault();

    let ifAnyFieldEmpty = false;
    Object.keys(values).forEach(key => {
      if (values[key] === '') ifAnyFieldEmpty = true;
    });

    if (ifAnyFieldEmpty) {
      setInvalidInput(true);
      return;
    }

    axios.post('/login', values)
      .then(res => {
        localStorage.setItem("authToken", res.headers['auth-token']);
        setSuccessfulLogin(true);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setInvalidInput(true);
          setErrorDetails(`Incorrect user-ID or password!`);
          return;
        }
        else {
          setInvalidInput(true);
          setErrorDetails(`Please verify if you have your node server running on port "7050" and you have implemented all the mentioned APIs! If you need help try accessing the hints!`);
        }
      });
  };

  const storedAuthToken = localStorage.getItem("authToken");
  if (storedAuthToken !== undefined && storedAuthToken !== null) {
    window.location.reload();
    return <Redirect to="/" />;
  }

  if (successfulLogin) {
    window.location.reload();
    return <Redirect to="/" />
  }

  return (
    <>
      <div className={classes.root}>
        <Card className={clsx(classes.textField)}>
          <CardContent className={clsx(classes.cardContent)}>
            <Typography style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '15px' }}><b>Create your Profile</b></Typography>
            <TextField
              className={clsx(classes.margin)}
              required
              id="filled-required"
              label="User-ID"
              variant="outlined"
              fullWidth
              value={values.username}
              onChange={handleChange('username')}
            />

            <FormControl variant="outlined" fullWidth className={clsx(classes.margin)}>
              <InputLabel htmlFor="input-password">Password</InputLabel>
              <OutlinedInput
                required
                id="input-password"
                type={hidePassword === false ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => { setHidePassword(hidePassword === false ? true : false) }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {hidePassword === false ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <Button
              color='primary'
              variant='outlined'
              className={clsx(classes.margin)}
              onClick={handleLogin}
            >
              Login
          </Button>
          </CardContent>

        </Card>
      </div>
      <div style={{ display: 'flex', width: "100%" }}>
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
    </>
  );
}