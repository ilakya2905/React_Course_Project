import React from 'react';
import Header from './components/header'
import Tasks from './components/tasks'
import AddTask from './components/addTask'
import Footer from './components/footer'
import About from './components/about'

import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks,setTasks] = useState([ ]) 
  
  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])  //add task

// fetch tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  // fetch single task
  const fetchSingleTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

// /add task
  const addTask = async(task) =>{
    // // console.log(task)
    // const id = Math.floor(Math.random() * 10000) +1
    // const newTask = {
    //   id,...task}
    //   setTasks([...tasks,newTask])
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks,data])


  }
  
  //delete task
  const deleteTask =async (id) => {
    // console.log('delete',id)
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id!==id))
  }

  //toggle reminder
  const toggleReminder = async(id) =>{
    // console.log('remind',id)
    const taskToToggle = await fetchSingleTask(id)
    const updTask = {...taskToToggle,
    reminder:!taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
      
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }
  return (
    <Router>
      <div className="container">
        
        {/* <h1>Task Tracker</h1> */}
        <Header title="Task Tacker" onShowAdd={() =>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        
        <Route path='/' exact render={(props) => (
           <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? 
            <Tasks tasks={tasks} onToggle = {toggleReminder} onDelete = {deleteTask}/> : 'No Tasks To Show'}

          </>
        )} />
        <Route path='/about' component={About}></Route> 
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
 