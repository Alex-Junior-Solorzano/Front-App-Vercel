import { Grid, Paper, Avatar, Input, Button, Typography, Link } from '@mui/material'
import { Checkbox, FormControlLabel } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext.jsx"
import { useContext } from 'react';

const Login = () => {

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const btnstyle = { margin: '8px 0' }

  const navigate = useNavigate();
  const { text } = useContext(AuthContext)
  //console.log(text)

  const [error, setError] = useState(null)
  const [espera, setEspera] = useState(false)
  const [usuario, setUsuario] = useState({
    "nombre": '',
    "contraseña": ''
  });

  const cargar_login2 = async () => {

    setEspera(true)
    const res = await fetch('https://node-railway-production-1d49.up.railway.app/loginn', {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data)
    setError(data.error)
    setEspera(false)
    if (data.tokenSession) {
      localStorage.setItem('tokenRey', JSON.stringify(data));
    }

    if (data.tokenSession && data.data.rol === 'admin') {
      navigate('/tasks/')
    } else if (data.tokenSession && data.data.rol === 'Cliente') {
      navigate('/tasks/new')
    }
  }

  const handleInputChange = (event) => {
    //console.log(event.target.name)
    //console.log(event.target.value)
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value
    })
  }

  const form_login = async (e) => {
    e.preventDefault();
    try {
      cargar_login2()
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar sx={{ width: 70, height: 70 }}> <LockIcon /></Avatar>
          {/*<Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>*/}
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={form_login} align="center">
          <Input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="nombre" required></Input>
          <Input type="password" placeholder="Contraseña" className="form-control" onChange={handleInputChange} name="contraseña" required></Input>
          {
            error &&
            <div className="alert alert-danger">
              {error}
            </div>
          }
          <FormControlLabel control={
            <Checkbox name="checkedB" color="primary" />
          }
            label="Remember me"
          />
          <Button disabled={espera} color='primary' variant="contained" style={btnstyle} fullWidth type="submit" /*onClick={ () => navigate('/tasks/')}*/>Sign in</Button>
        </form>
        <Typography >
          <Link href="#" >
            Olvidaste tu contraseña ?
          </Link>
        </Typography>
        <Typography > No tienes cuenta ?
          <br></br>
          <Link onClick={() => navigate('/registro/')} >
            Crear nueva cuenta
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login