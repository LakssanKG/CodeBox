import { Container, Paper, Avatar, Typography, Box, TextField, Button, Grid2, Link } from '@mui/material'
import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast'
import { useState } from 'react';
import Navbar from './Navbar';
import SignUpImage from '../images/rb_2745.png'

const SignUp = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        const copyInfo = {...signupInfo}
        copyInfo[name] = value
        setSignupInfo(copyInfo)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {name, email, password} = signupInfo
        if(!name || !email || !password){
            return toast.error('All fields are required')
        }
        try{
            const url = 'http://localhost:8080/auth/signup'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                toast.success(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }else if(error){
                const details = error.details[0].message;
                toast.error(details);
            }
            else if(!success){
                toast.error(message || 'Signup failed')
            }
        }catch(err){
            toast.error(err);
        }
    }

  return (
    <Box >
        <Navbar />
    <Container maxWidth="">
        <Grid2 container spacing={20} alignItems="center" marginTop={6}>
        <Grid2 item xs={12} md={6}>
        <img src={SignUpImage} alt="Login" style={{paddingLeft:"50px", width: "550px", height: "auto", backgroundColor:"white"}}/>
        </Grid2>
        <Grid2 item xs={12} md={6}>
        <Paper elevation={10} sx={{maxWidth: 500, padding:2, borderRadius:8}}>
            <Avatar sx={{
                mx:'auto',
                bgcolor:'secondary.main',
                textAlign:'center',
                mb:1
            }}>
                <UploadIcon />
            </Avatar>
            <Typography component='h1' variant='h5' sx={{textAlign:'center'}}>
                Sign Up
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt:1}}>
                <TextField name="name" placeholder='Enter Username' fullWidth required autoFocus sx={{mb:2}} onChange={handleChange} value={signupInfo.name}></TextField>
                <TextField name="email" placeholder='Enter Email Id' fullWidth required sx={{mb:2}} onChange={handleChange} value={signupInfo.email}></TextField>
                <TextField name="password" placeholder='Enter Password' fullWidth required sx={{mb:2}} type='password' onChange={handleChange} value={signupInfo.password}></TextField>
                <Button type='submit' variant='contained' fullWidth sx={{mt:1}}>
                    Sign Up
                </Button>
            </Box>
            <Grid2 container justifyContent={'space-between'} sx={{mt:1}}>
                <Grid2 item>
                    <Link component={RouterLink} to='/Login'>
                        Login
                    </Link>

                </Grid2>
            </Grid2>
        </Paper>
        <Toaster position='top-center'></Toaster>
        </Grid2>
        </Grid2>
    </Container>
    </Box>
  )
}

export default SignUp