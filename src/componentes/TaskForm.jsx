import React, { useState, useEffect} from 'react';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar.jsx'

export default function TaskForm() {
  
  const [task, setTask] = useState({
    title: "",
    description:"",
  });
  const [loading, setLoading] = useState (false);
  const [editing, setEditing] = useState (false);

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = e => {
    setTask({...task, [e.target.name]: e.target.value});
  };

  const loadTask = async (id) => {
    const res = await fetch(`https://node-railway-production-1d49.up.railway.app/tasks/${id}`)
    const data = await res.json();
    setTask({title: data.title, description:data.description})
    setEditing(true);
  }

  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }
  },[params.id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editing) {
      await fetch(`https://node-railway-production-1d49.up.railway.app/tasks/${params.id}`,{
        method:"PUT",
        headers :{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(task),
      })
    }else {
      await fetch('https://node-railway-production-1d49.up.railway.app/tasks',{
        method: "POST",
        body: JSON.stringify(task),
        headers: {"Content-Type": "application/json"},
    });
    }
    //const data = await res.json();
    setLoading(false);
    navigate('/tasks')
  };
   
  return (
    <>
    <Navbar/>
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{mt: 5}} style= {{
          background:'#1e272e',
          padding: '1rem'
        }}>
          <Typography variant = '5' textAlign='center' color = 'white'>
            {editing ? "Editar tarea" : "Crear tarea"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField 
                variant='filled' 
                label='Ingresar tarea'
                sx={{
                  display: 'block',
                  margin: ' .5rem 0'
                }}
                name = 'title'
                value={task.title}
                onChange={handleChange}
                inputProps={{style: {color: 'white'}}}
                InputLabelProps={{style: {color: 'white'}}}
              />

              <TextField 
                variant='filled' 
                label='Ingresar la descripcion'
                multiline
                rows= {4}
                sx={{
                  display: 'block',
                  margin: ' .5rem 0'
                }}
                name = 'description'
                value={task.description}
                onChange={handleChange}
                inputProps={{style: {color: 'white'}}} 
                InputLabelProps={{style: {color: 'white'}}}
              />
              <Button 
                variant='contained' 
                color = 'primary' 
                type= 'submit'
                disabled = {!task.title || !task.description}
              >
                {loading ? <CircularProgress
                  color='inherit'
                  size={24}
                /> : 
                'Guardar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </>
  )
}
