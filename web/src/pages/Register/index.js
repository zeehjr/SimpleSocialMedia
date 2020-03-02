import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import FormField from '../../components/Form/FormField'
import AuthenticationContext from '../../components/Authentication/AuthenticationContext'

const validationSchema = Yup.object({
  username: Yup.string().matches(
    /^[a-zA-Z0-9]+$/,
    'You cannot use spaces or special characteres'
  ),
  email: Yup.string().email('You need to enter a valid email'),
  password: Yup.string(),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'Your passwords are not matching'
  )
})

const Register = () => {
  const { register } = useContext(AuthenticationContext)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState(null)

  const {
    handleSubmit,
    errors,
    touched,
    handleChange,
    handleBlur,
    values
  } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema,
    onSubmit: v => {
      setLoading(true)
      register(v)
        .then(res => {
          if (res === true) {
            history.push('/feed')
          } else {
            setErrored(true)
          }
        })
        .catch(() => {
          setErrored(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  })

  return (
    <div className='flex flex-col min-h-screen bg-indigo-700 shadow-lg items-center'>
      <div className='flex flex-col bg-white shadow m-auto p-8 py-12 w-full mx-2 sm:w-auto sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12'>
        <header className='flex flex-col'>
          <h1 className='text-xl font-semibold text-center'>
            Simple Social Media Registration
          </h1>
          <h2 className='flex text-sm text-gray-700 mx-auto mt-2'>
            <span>Are you already registered?</span>
            <Link to='/login' className='font-bold text-indigo-600 ml-1'>
              Login here
            </Link>
          </h2>
        </header>
        <section className='flex flex-col mt-6'>
          <FormField
            label='Username'
            type='username'
            name='username'
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.username}
            touched={touched.username}
            checkError
            disabled={loading}
          />
          <FormField
            label='Email'
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.email}
            touched={touched.email}
            checkError
            className='mt-2'
            disabled={loading}
          />
          <FormField
            label='Password'
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.password}
            touched={touched.password}
            checkError
            className='mt-2'
            disabled={loading}
          />
          <FormField
            label='Confirm password'
            type='password'
            name='passwordConfirmation'
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
            checkError
            className='mt-2'
            disabled={loading}
          />
          {errored && (
            <div className='bg-red-600 p-4 mt-2 -mb-2 text-white text-center'>
              Something went wrong with your registration... Try again later
            </div>
          )}
          <button
            className='py-3 bg-indigo-700 rounded mt-4 font-semibold text-white disabled:bg-indigo-500 disabled:text-gray-400'
            type='button'
            onClick={handleSubmit}
            disabled={loading}
          >
            Register
          </button>
        </section>
      </div>
    </div>
  )
}

export default Register
