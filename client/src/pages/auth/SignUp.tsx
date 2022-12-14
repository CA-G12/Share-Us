import { FC } from 'react'
import { TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import './auth.css'
import cover from '../../assets/images/cover.jpg'
import { useAuth } from '../../hooks/useAuth'
import GoogleAuth from './GoogleAuth'

const SignUp: FC = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
    username: yup
      .string()
      .min(2)
      .required('Username is required'),
    confirmPassword: yup
      .string()
      .min(6)
      .oneOf([yup.ref('password'), null], 'password must match')
      .required('Confirm password is required'),

  })
  const handleSubmit = async (values:object):Promise<void> => {
    const { isLogged, error } = await auth.signUp(values)
    if (isLogged) {
      navigate('/')
    } else {
      toast.error(error.response.data.message)
    }
  }
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  }

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  })
  return (
    <div className="auth">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2>Get Started with Share Us!</h2>
        <p className="center-pra">Getting started is easy</p>
        <TextField
          name="username"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          size="small"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          fullWidth
          sx={{ display: 'block', margin: '15px 0' }}
        />
        <TextField
          name="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          size="small"
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          onChange={formik.handleChange}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
          sx={{ display: 'block', margin: '15px 0' }}
        />
        <TextField
          name="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          size="small"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          sx={{ display: 'block', margin: '15px 0' }}
        />
        <TextField
          name="confirmPassword"
          id="outlined-basic"
          label="Confirm  Password"
          variant="outlined"
          size="small"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          fullWidth
          sx={{ display: 'block', margin: '15px 0' }}
        />
        <Button
          className="submit-btn"
          variant="contained"
          fullWidth
          type="submit"
        >
          Sign Up
        </Button>
        <GoogleAuth label="Sign up" />

        <p className="center-pra">
          Already have an account ?
          <Link to="/login"> Sign in!</Link>
        </p>
      </form>
      <img
        src={cover}
        alt="sign-up-page"
        className="auth-image"
        style={{ margin: '0', padding: '0' }}
      />
    </div>
  )
}

export default SignUp
