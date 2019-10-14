import React,{useState} from "react";
import {axiosWithAuth} from './utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState({username:'', password:''})
  console.log(props)

  const handleChange = e => {
    console.log(creds.username)
    setCreds({
      ...creds,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', creds)
    .then(res=>{
      console.log(res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' value={creds.username} onChange={handleChange}/>
        <input type='text' name='password' value={creds.password} onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default Login;
