import React from 'react'

const inputClasses = errored =>
  'px-4 py-3 border rounded focus:bg-white hover:bg-white' +
  ' ' +
  (errored ? 'bg-red-100 border-red-400 border-2' : 'bg-gray-200')

const FormField = ({ label, checkError, errorMessage, touched, ...props }) => {
  const errored = checkError && touched && errorMessage

  return (
    <div className={'flex flex-col ' + props.className}>
      <label
        className={errored ? 'text-red-600' : 'text-gray-800'}
        htmlFor={props.id}
      >
        {label}
      </label>
      <input formNoValidate {...props} className={inputClasses(errored)} />
      {errored && <div className='text-red-400'>{errorMessage}</div>}
    </div>
  )
}

export default FormField
