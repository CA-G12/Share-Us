/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { TextField, Button } from '@mui/material';
import { ReactComponent as GoogleLogo } from '../../assets/icons/logo-google.svg';
import './auth.css';
import cover from '../../assets/images/cover.jpg';

const Login: FC = () => (
  <div className="auth">

    <div className="form">
      <h1>Welcome Back!</h1>
      <p className="center-pra">Login into your account</p>
      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth sx={{ display: 'block', margin: '30px 0' }} />
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth sx={{ display: 'block', margin: '30px 0' }} />
      <Button className="submit-btn" variant="contained" fullWidth>Login</Button>

      <Button className="google-btn" variant="outlined" fullWidth>
        <GoogleLogo width={20} />
        <p>Sign in with Google</p>
      </Button>

      <p className="center-pra">
        Don’t have an account ?
        <a href="#"> Sign Up!</a>
      </p>
    </div>
    <img src={cover} alt="test" style={{ margin: '0', padding: '0' }} />
  </div>
);

export default Login;
