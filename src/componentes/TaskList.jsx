import React, { useEffect, useState} from 'react'
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar.jsx'

export default function TaskList() {

  const [tasks, setTask] = useState([])
  const navigate = useNavigate()

  const loadTasks = async () => {
    const res = await fetch(`https://node-railway-production-1d49.up.railway.app/tasks`)
    const data = await res.json();
    setTask(data)
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://node-railway-production-1d49.up.railway.app/tasks/${id}`, {
        method: "DELETE",
      })
    
      setTask(tasks.filter(task => task.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() =>{
    loadTasks()
  },[])

  return (
    <>
    <Navbar/>
      <h1>Task List</h1>
      {
        tasks.map((task) =>(
          <Card style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
            
          }}
          key= {task.id}>
            <CardContent style= {{
              display: "flex",
              justifyContent: "space-between",
              
            }}>
              <div style={{color:"white"}}>
              <Typography color = 'white'>Id: {task.id}</Typography>
                <Typography color = 'white'>{task.title}</Typography>
                <Typography color = 'white'>{task.description}</Typography>
              </div>
              <div>
                <Button 
                  variant='contained' 
                  color='inherit' 
                  onClick={() => navigate(`/tasks/${task.id}/edit`)} 
                  style= {{margin: ".5rem"}}
                >Editar
                </Button>
                <Button 
                  variant='contained' 
                  color='warning' 
                  onClick={() => handleDelete(task.id)}
                >Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}
