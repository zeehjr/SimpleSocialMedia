import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import FormField from '../../components/Form/FormField'
import AuthenticationContext from '../../components/Authentication/AuthenticationContext'

const validationSchema = Yup.object({
  username: Yup.string().matches(
    /^[a-zA-Z0-9]+$/,
    'You cannot use spaces or special characteres.'
  ),
  password: Yup.string()
})

const Login = () => {
  const history = useHistory()
  const { authenticate } = useContext(AuthenticationContext)

  const {
    handleSubmit,
    errors,
    touched,
    values,
    handleChange,
    handleBlur
  } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: v => {
      if (authenticate(v)) {
        history.push('/feed')
      }
    }
  })

  return (
    <div className='flex flex-col min-h-screen bg-indigo-700 shadow-lg items-center'>
      <div className='flex flex-col bg-white shadow m-auto p-8 py-12 w-full mx-2 sm:w-auto sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12'>
        <header className='flex flex-col'>
          <h1 className='text-xl font-semibold text-center'>
            Simple Social Media Login
          </h1>
          <h2 className='flex text-sm text-gray-700 mx-auto mt-2'>
            <span>Are you not registered yet?</span>
            <Link to='/register' className='font-bold text-indigo-600 ml-1'>
              Register here
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
          />
          <button
            className='py-3 bg-indigo-700 rounded mt-4 font-semibold text-white'
            type='button'
            onClick={handleSubmit}
          >
            Login
          </button>
        </section>
      </div>
    </div>
  )
}

export default Login
