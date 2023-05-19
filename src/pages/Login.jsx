import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user

        const { data } = await axios.post('http://localhost:8888/api/auth/signin', {
          userId: user.uid
        })

        console.log('Access Token', data)
      })
      .catch(error => {
        console.log(error)
      })

    console.log(email, password)
  }

  const registerWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (userCredential) => {
        const user = userCredential.user

        const { data } = await axios.post('http://localhost:8888/api/auth/signin', {
          userId: user.uid
        })

        console.log('Access Token', data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const registerWithGithub = () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then(async (userCredential) => {
        const user = userCredential.user

        const { data } = await axios.post('http://localhost:8888/api/auth/signin', {
          userId: user.uid
        })

        console.log('Access Token', data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <main className='min-h-screen min-w-full bg-gray-800 grid place-items-center'>
        <div className='mx-auto my-20 w-[25rem] flex flex-col gap-4 rounded-md bg-gray-600 text-white px-6 py-10'>
            <h4 className='text-xl font-semibold tracking-wider'>
                Login
            </h4>

            <form action="#" onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm tracking-widest'>Email</label>
                    <input type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='bg-transparent outline-none border rounded-sm px-2 py-2'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm tracking-widest'>Password</label>
                    <input type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='bg-transparent outline-none border rounded-sm px-2 py-2'
                    />
                </div>

                <input type="submit" value="Login" className='w-full bg-gradient-to-r from-blue-600 to-pink-500 cursor-pointer py-2 rounded-md' />
            </form>

            <div className='flex items-center justify-between mt-2'>
              <button 
              className='flex px-2 py-1 border rounded-md gap-2 items-center'
              onClick={registerWithGoogle}
              >
                <FcGoogle className='text-4xl' />
                <div className='flex flex-col pl-2 ml-2 border-l'>
                  <small>Register with</small>
                  <h4>Google</h4>
                </div>
              </button>

              <button
              className='flex px-2 py-1 border rounded-md gap-2 items-center'
              onClick={registerWithGithub}
              >
                <FaGithub className='text-4xl' />
                <div className='flex flex-col pl-2 ml-2 border-l'>
                  <small>Register with</small>
                  <h4>Github</h4>
                </div>
              </button>
            </div>

            <Link to='/' className='text-sm text-center tracking-wider mt-2 underline'>Don't have an account? Register</Link>
        </div>
    </main>
  )
}

export default Login