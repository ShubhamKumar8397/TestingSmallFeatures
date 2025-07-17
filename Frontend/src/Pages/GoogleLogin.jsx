import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLogin = () => {

const api = axios.create({
    baseURL : '/api/v1/temp'
})

  const responseByGoogle = async(authResponse) => {
    try {
      const res = await googleSendCode(authResponse['code'])
      const response = await api.post('/googleLogin', {res})
      console.log(response)
    } catch (error) {
      console.log("Error While Request Error code : ", error)
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseByGoogle,
    onError: responseByGoogle,
     flow: 'auth-code'
  });


  return (
    <>
      <div className='h-screen w-full flex justify-center items-center'>
        <button
          className='text-[2vw] border-black rounded-md'
          onClick={() => googleLogin()}
        >
          Login With Google
        </button>
      </div>
    </>
  )
}

export default GoogleLogin