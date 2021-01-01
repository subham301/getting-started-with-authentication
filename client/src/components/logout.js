import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout() {
  localStorage.removeItem("authToken");
  window.location.reload();
  return <Redirect to="/" />;
}