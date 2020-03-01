import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import FormField from '../../components/Form/FormField'

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
    onSubmit: v => console.log(v)
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
          />
          <button
            className='py-3 bg-indigo-700 rounded mt-4 font-semibold text-white'
            type='button'
            onClick={handleSubmit}
          >
            Register
          </button>
        </section>
      </div>
    </div>
  )
}

export default Register
