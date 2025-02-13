import React from 'react'
import Quote from '../components/Quote'
import SignUp from '../components/Auth'

const Signup = () => {
  return (
    <div className='grid grid-cols-2' >
        <div>
            <SignUp />
        </div>
        <div className='invisible lg:visible'>
            <Quote/>
        </div>
    </div>
  )
}

export default Signup