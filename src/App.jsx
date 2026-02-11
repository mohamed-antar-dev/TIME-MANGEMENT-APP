

import NavBar from './navBar/navbar'
import Signup from './signup/signup'
import './App.css'
import FormTask from './task/Formtask'
import FormGear from "./task/formGear/formGear"
import Tasks from './tasks/tasks'

import {BrowserRouter,Routes,Route} from "react-router-dom"


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      
      <Route  path="/tasks"  element={<Tasks/>}/>
      <Route  path="/formGear/:taskid"  element={<FormGear/>}/>
    </Routes>
    </BrowserRouter>
      {/* <NavBar></NavBar> 
     
      <FormGear></FormGear> 
       
      <Signup></Signup>  */}
      
      
      
     
       
    </>
  )
}

export default App
