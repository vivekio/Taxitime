import React, { useState } from 'react';
import { Button, Checkbox, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './login.module.css';
import { toast  , ToastContainer } from 'react-toastify';
// import logo from "../../assets/images/logo.png"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async () => {
  setError("");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    setError("Enter a valid email address.");
    return;
  }
  if (password.length < 5) {
    setError("Password must be at least 6 characters.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/users/adminlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
       withCredentials: true  ,
      body: JSON.stringify({ email, password }),
    });
   

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    toast("Login successful!");
    setTimeout(() => {
      window.location.href = "/Taxi-Time/app/dashboard/default";
    }, 2000);

  } catch (error) {
    console.error("Login Error:", error);
    setError(error.message);
  }
};
  return (
    <div className={classes.wrapper}>
    <ToastContainer/>
      <Paper className={classes.form} radius={1} p={100}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={40}>
          Admin Login
        </Title>
        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" value={email} 
          onChange={(e) => setEmail(e.target.value)}  />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" value={password} onChange={(e) => setPassword(e.target.value)}/>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Link to="/forgot-password" style={{ display: "block", marginTop: "10px", color: "black", textDecoration: "underline", textAlign: "right" }}>
          Forgot Password?
        </Link>
        {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
        <Button variant="filled" color="rgba(255, 204, 20, 0.76)" fullWidth mt="xl" size="md" c="black"  onClick={handleLogin}>
        Login 
        </Button>
    
      </Paper>
    </div>
  );
};
export default Login;
