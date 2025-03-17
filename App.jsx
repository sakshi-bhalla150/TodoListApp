import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToStorage = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const toggleFinished = (e) =>{
    setShowFinished(!showFinished)

  }
  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id != id;
    });
    setTodos(newtodos);
    saveToStorage()

  }
  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id != id;
    });
    setTodos(newtodos);
    saveToStorage()


  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToStorage()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    saveToStorage()

  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl bg-slate-300 p-5 min-h-[80vh] w-1/2">
      <h1 className='font-bold text-center text-xl'>ScheduleTask-Your ultimate planner for the day</h1>
        <div className="addtodo my-5 flex flex-col gap-4 ">
          <h2 className='text-lg font-bold' >Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text " className='w-full rounded-lg px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md cursor-pointer'>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        <h2 className=' text-lg font-bold '>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 '>No Todos to Display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 my-3 justify-between">

              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
