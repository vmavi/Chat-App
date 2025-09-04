import React, { useContext } from 'react'
import assets from '../assets/assets'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setcurrState] = useState("Sign Up")
  const [fullName, setfullName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [bio, setbio] = useState("")
  const [isDataSubmitted, setisDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event)=> {
    event.preventDefault();

    if(currState === "Sign Up" && !isDataSubmitted){
      setisDataSubmitted(true)
      return;
    }
    login(currState === "Sign Up" ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/*---------loginpage mein jo side mein pic hai --------*/}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]'/>

      {/*------login page mein jo container bna hai sign up krne ke liye------- */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img onClick={()=>{setisDataSubmitted(false)}} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>}
          </h2>
          {currState === "Sign Up" && !isDataSubmitted && (
            <input onChange={(e)=>setfullName(e.target.value)} value={fullName} 
            type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required/>
          )}

          {!isDataSubmitted && (
            <>
            <input onChange={(e)=>setemail(e.target.value)} value={email} 
            type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
            <input onChange={(e)=>setpassword(e.target.value)} value={password} 
            type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
            </>
          )}

          {
            currState === "Sign Up" && isDataSubmitted && (
              <textarea onChange={(e)=>setbio(e.target.value)} value={bio}
               rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter a Short Bio..' required></textarea>
            )
          }

          <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <input type="checkbox" required/>
            <p>Agree to the terms and conditions.</p>
          </div>

          <div className='flex flex-col gap-2'>
              {currState === "Sign Up" ? (
                <p className='text-sm text-gray-600'>Already Have an account <span onClick={()=>{setcurrState("Login"); setisDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login Now</span></p>
              ) : (
                <p className='text-sm text-gray-600'>Create an account <span onClick={()=>{setcurrState("Sign Up");}} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
              )}
          </div>

      </form>
    </div>
  )
}

export default LoginPage
