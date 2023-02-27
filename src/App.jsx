import React from 'react'

import { Routes, Route, HashRouter } from 'react-router-dom'
import { Container } from '@mui/material'

import TaskForm from './componentes/TaskForm.jsx';
import TaskList from "./componentes/TaskList.jsx";
import Login from './componentes/Login.jsx';
import Nada from './componentes/Nada.jsx'
import Registro from './componentes/Registro.jsx';
import {AuthProvider} from './contexts/authContext.jsx';

export default function App  ()  {
  return (
    <div>
      <HashRouter>
      {/*<BrowserRouter>*/}
          <Container>
            <AuthProvider>
              <Routes>
                <Route index element = { <Login/>}/>
                <Route path='/login' element = { <Login/>}/>
                <Route path='/registro' element = { <Registro/>}/>
                <Route path='/tasks' element = { <TaskList/>}/>
                <Route path='/tasks/new' element = { <TaskForm/>}/>
                <Route path='/tasks/:id/edit' element = { <TaskForm/>}/>
                <Route path='*' element = { <Nada/>}/>
              </Routes>
            </AuthProvider>
          </Container>
      {/*</BrowserRouter>*/}
      </HashRouter>
    </div>
  )
}
