/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, Link } from 'react-router-dom'
import { ReactComponent as GoogleLogo } from
  '../../assets/icons/logo-google.svg'
import './auth.css'
import cover from '../../assets/images/cover.jpg'
import { useAuth } from '../../hooks/useAuth'

const Login: FC = () => {
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
  })
  const handleSubmit = async (values:object):Promise<void> => {
    const { isLogged, error } = await auth.signIn(values)
    if (isLogged) {
      navigate('/home')
    } else {
      toast.error(error.response.data.message)
    }
  }
  const initialValues = {
    password: '',
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
        <h1>Welcome Back!</h1>
        <p className="center-pra">Login into your account</p>

        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ display: 'block', margin: '20px 0' }}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          onChange={formik.handleChange}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          name="password"
          variant="outlined"
          size="small"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          sx={{ display: 'block', margin: '20px 0 40px' }}
        />

        <Button
          className="submit-btn"
          variant="contained"
          fullWidth
          type="submit"
        >
          Login
        </Button>

        <Button className="google-btn" variant="outlined" fullWidth>
          <GoogleLogo width={20} />
          <p>Sign in with Google</p>
        </Button>

        <p className="center-pra">
          Don’t have an account ?
          <Link to="/sign-up"> Sign Up!</Link>
        </p>
      </form>
      <img src={cover} alt="test" style={{ margin: '0', padding: '0' }} />
    </div>

  )
}

export default Login
