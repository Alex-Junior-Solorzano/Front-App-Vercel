import { Grid,Paper, Avatar, Input, Button, Typography,Link } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Registro = () => {
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombre:'',
        contraseña:'',
        email:'',
        rol:'Cliente'
    });

    const handleInputChange = (event) => {
        //console.log(event.target.name)
        //console.log(event.target.value)
       setUsuario({
           ...usuario,
           [event.target.name] : event.target.value
       })
   }

   const form_registro = async(e) => {
        e.preventDefault();
        //console.log('enviando datos...' + JSON.stringify(usuario))

        try{
            cargar_registro()
            
        }catch (e) {
            console.log(e);
        }
        
    };
    const cargar_registro = async() =>{
        await fetch('https://node-railway-production-1d49.up.railway.app/registro',{
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {"Content-Type": "application/json"},
    });
    navigate('/login')
    }

  return (
    <div>
       <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar sx={{ width: 70, height: 70 }}> <LockIcon/></Avatar>
                     {/*<Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>*/}
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={form_registro} align="center">
                    <Input value={usuario.nombre} type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="nombre" required></Input>
                    <Input  value={usuario.email} type="email" placeholder="E-mail" className="form-control" onChange={handleInputChange} name="email" required></Input>
                    <Input  value={usuario.contraseña} type="password" placeholder="Contraseña" className="form-control" onChange={handleInputChange} name="contraseña" required></Input>
                    
                    <Button  color='primary' variant="contained" style={btnstyle} fullWidth type="submit" /*onClick={ () => navigate('/tasks/')}*/>Sign Up</Button>
                </form>
                
                <Typography > 
                    <br></br>
                     <Link onClick={ () => navigate('/login/')} >
                         Iniciar Sesion
                </Link>
                </Typography>
            </Paper>
        </Grid>
    </div>
  )
}

export default Registro