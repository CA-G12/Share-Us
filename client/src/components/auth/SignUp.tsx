/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { TextField, Button } from '@mui/material';
import { ReactComponent as GoogleLogo } from '../../assets/icons/logo-google.svg';
import './auth.css';

const SignUp: FC = () => (
  <div className="auth">

    <div className="form">
      <h2>Get Started with Share Us!</h2>
      <p className="center-pra">Getting started is easy</p>
      <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth sx={{ display: 'block', margin: '15px 0' }} />
      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth sx={{ display: 'block', margin: '15px 0' }} />
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth sx={{ display: 'block', margin: '15px 0' }} />
      <TextField id="outlined-basic" label="Confirm  Password" variant="outlined" fullWidth sx={{ display: 'block', margin: '15px 0' }} />
      <TextField id="outlined-basic" label="Location" variant="outlined" fullWidth sx={{ display: 'block', margin: '15px 0' }} />
      <Button className="submit-btn" variant="contained" fullWidth>Sign Up</Button>
      <Button className="google-btn" variant="outlined" fullWidth>
        <GoogleLogo width={20} />
        <p>Sign up with Google</p>
      </Button>

      <p className="center-pra">
        have an account ?
        <a href="#"> Sign in!</a>
      </p>
    </div>

    <img src="https://cdn.discordapp.com/attachments/959502807071867000/1029343065720246354/pexels-rodnae-productions-7348675.jpg" alt="test" />
  </div>
);

export default SignUp;
