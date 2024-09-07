import React, { useEffect, useState } from 'react'
import Todo from './Todo'
// import {v4 as uuidv4} from 'uuid'
import appWrite from '../appwrite/appwrite'
const AddTodo = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    // const [isEditable,setIsEditable]=useState(false)
    // const [editId,setEditId]=useState('')
    const [editValue,setEditValue]=useState('')
    const [msg,setMsg]=useState('')

    const handleAdd=(e)=>{
        e.preventDefault()
        if(input===''){
             setMsg('please enter task')
        }
        else{
            setMsg('')
           const response= appWrite.createTodo(
                {
                    
                    todo:input,
                    completed:false,
                    isEditable:false
                }
            )
        setTodos([...todos,{$id:response.$id,todo:input,isEditable:false,completed:false}])
        setInput('')}
    }
    const handleDelete=($id)=>{
       // const updated=[...todos]
        appWrite.deleteTodo($id)
        setTodos(todos.filter((todo)=>todo.$id!==$id))
        //setTodos(updated)
    }
    const handleEdit=($id,todo,isEditable)=>{

        if (isEditable) {
            appWrite.updateTodo($id, { todo: editValue })
            setTodos(
                todos.map((todo)=>(
                    todo.$id===$id?{...todo,todo:editValue,isEditable:false}:todo
                    ))
                )
        }
        else{
          setTodos( todos.map((todo)=>todo.$id===$id?{...todo,isEditable:true}:todo))
           setEditValue(todo)
        }
    }
    const toggleComplete=($id,completed)=>{
        appWrite.updateTodo($id,{completed:!completed})
        setTodos(todos.map((todo)=>todo.$id===$id?{...todo,completed:!todo.completed}:todo))
            

    }
    useEffect(()=>{
        const fetchTodos=async()=>{
           try {
             const response=await appWrite.listTodos()
             if (response&&response.documents) {
                 setTodos(response.documents)
             }
             else{
                 setTodos([])
             }
           } catch (error) {
            console.error(error)
            setTodos([])
            
           }
        }
        fetchTodos()
        
    },[])

  return (
    <div className='flex flex-col justify-center items-center'>
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div className='min-w-72 w-1/2'>
        <div className=' w-full mb-10 flex flex-col justify-start items-start'>
        <form className='w-full flex gap-2 ' 
        onSubmit={handleAdd}>
            <input className='border bg-slate-200 rounded w-full'
            type='text'
            value={input}
            placeholder='Enter a task'
            onChange={(e)=>setInput(e.target.value)}
            />
            <button  className='px-2 py-1 rounded bg-purple-700 text-white' type='submit'>Add</button>
            
        </form>
        <div className='text-red-500'> {msg}</div>
        </div>
          
        {todos.map((todo)=>(
            <Todo key={todo.$id} todo={todo} editValue={editValue} setEditValue={setEditValue} handleEdit={handleEdit} toggleComplete={toggleComplete} handleDelete={handleDelete}/>
        ))
        }
        </div>
    </div>
  )
}

export default AddTodo
