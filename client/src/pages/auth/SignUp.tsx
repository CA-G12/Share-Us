/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { TextField, Button } from '@mui/material';
import { ReactComponent as GoogleLogo } from
  '../../assets/icons/logo-google.svg';
import './auth.css';
import cover from '../../assets/images/cover.jpg';

const SignUp: FC = () => (
  <div className="auth">

    <div className="form">
      <h2>Get Started with Share Us!</h2>
      <p className="center-pra">Getting started is easy</p>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        fullWidth
        sx={{ display: 'block', margin: '10px 0' }}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        fullWidth
        sx={{ display: 'block', margin: '10px 0' }}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        sx={{ display: 'block', margin: '10px 0' }}
      />
      <TextField
        id="outlined-basic"
        label="Confirm  Password"
        variant="outlined"
        type="password"
        fullWidth
        sx={{ display: 'block', margin: '10px 0' }}
      />
      <TextField
        id="outlined-basic"
        label="Location"
        variant="outlined"
        fullWidth
        sx={{
          display: 'block',
          margin: '10px 0',
        }}
      />
      <Button
        className="submit-btn"
        variant="contained"
        fullWidth
      >
        Sign Up
      </Button>
      <Button className="google-btn" variant="outlined" fullWidth>
        <GoogleLogo width={20} />
        <p>Sign up with Google</p>
      </Button>

      <p className="center-pra">
        have an account ?
        <a href="#"> Sign in!</a>
      </p>
    </div>
    <img src={cover} alt="test" style={{ margin: '0', padding: '0' }} />
  </div>
);

export default SignUp;
