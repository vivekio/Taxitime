import React, { useState } from 'react';
import { Button, Paper, TextInput, Title } from '@mantine/core';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import classes from './forgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    setError("");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send reset email");

      toast("Password reset link sent!");
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className={classes.wrapper}>
      <ToastContainer />
      <Paper className={classes.form} radius={1} p={100}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={40}>
          Forgot Password
        </Title>
        <TextInput
          label="Email address"
          placeholder="Enter your email"
          size="md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          variant="filled"
          color="rgba(255, 204, 20, 0.76)"
          fullWidth
          mt="xl"
          size="md"
          c="black"
          onClick={handleForgotPassword}
        >
      SEND PASSWORD
        </Button>
        <Link to="/login" style={{ display: "block", marginTop: "10px", color: "black", textDecoration: "underline", textAlign: "right" }}>
          Back to Login
        </Link>
      </Paper>
    </div>
  );
};

export default ForgotPassword;
