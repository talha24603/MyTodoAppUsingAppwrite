import React from 'react'

const Todo = ({todo,handleDelete,handleEdit,editValue,setEditValue,toggleComplete}) => {
  return (
    <div className={` m-2 flex flex-row justify-between p-2 border bg-slate-400 text-white ${ todo.completed?('line-through'):('')} rounded-md`}>
      <div>
        {todo.isEditable?(<input  className=' bg-white text-black border-none'
        type="text"
        value={editValue}
        onChange={(e)=>setEditValue(e.target.value)}
        />):(<>
            
        <input type="checkbox" checked={todo.completed} className='m-2' onChange={()=>toggleComplete(todo.$id,todo.completed)} />
            {todo.todo}</>)
}
      </div>
      <div>
      <button className={`px-2 py-1 rounded ${todo.completed?'opacity-40':''} bg-purple-600 text-white mr-2`}
      disabled={todo.completed}
      onClick={()=>handleEdit(todo.$id,todo.todo,todo.isEditable)}
      >{todo.isEditable?('save'):('edit')} </button>
      <button className='px-2 py-1 rounded bg-red-600 text-white'
      onClick={() => handleDelete(todo.$id)}
      >delete</button>
      </div>
    </div>
  )
}

export default Todo
