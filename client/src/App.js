import React from 'react';
import Button from '@material-ui/core/Button';
import { Switch, Route} from 'react-router-dom';
import Register from './components/register';
import UpdateProfile from './components/updateProfile';
import DisplayProfiles from "./components/displayProfile";
import { Card, CardContent } from '@material-ui/core';
import {  Link } from 'react-router-dom';

export default function App() {

  return (
    <>
      <Link to="/" style={{textDecoration: "none"}}>
        <Button style={{display: "flex", marginLeft: "auto", marginRight: "auto", marginTop: "20px"}} color="primary" variant="contained">Home</Button>
      </Link>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/update">
          <UpdateProfile/>
        </Route>
        <Route path="/all">
          <DisplayProfiles />
        </Route>
        <Route path="/">
          <div style={{ margin: "auto", height: "100%", display: "flex", flexDirection: "column" }}>
            <Card style={{ display: "flex", flexDirection: "column", marginLeft: 'auto', marginRight: 'auto', margin: 'auto' }}>
              <CardContent style={{ display: "flex", flexDirection: "column" }}>
                <Link style={{ minWidth: "200px" }} to="/register">
                  <Button color="primary" variant="outlined" style={{ margin: "10px", minWidth: "200px" }}>
                    Register
              </Button>
                </Link>
                <Link style={{ minWidth: "200px" }} to="/all">
                  <Button color="primary" variant="outlined" style={{ margin: "10px", minWidth: "200px" }}>
                    View all Profiles
              </Button>
                </Link>
                <Link style={{ minWidth: "200px" }} to="/update">
                  <Button color="primary" variant="outlined" style={{ margin: "10px", minWidth: "200px" }}>
                    Update your Profile
              </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Route>
      </Switch>
    </>
  );
}