import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './style.css'

export default function TodoForm(){
    const [item,setItem]=useState('')
    const [itemsList,setItemsList]=useState(()=>{
        const localValue = localStorage.getItem('ITEMS')
        if(localValue==null)return []
        return JSON.parse(localValue)
    })
    useEffect(()=>{
        localStorage.setItem('ITEMS', JSON.stringify(itemsList))
    }, [itemsList])
    const handelChange=(e)=>{
        setItem(e.target.value)
    }
    const handelSubmit=(e)=>{
        e.preventDefault()
        setItemsList((currentItems)=>{return[... currentItems, {id:crypto.randomUUID(), title:item, completed:false}]})
        setItem('')
    }
    const changeState=(id, completed)=>{
        setItemsList((currentItems) => currentItems.map((todo) =>{
          if(todo.id===id){
            return{... todo, completed}
          }
          return todo
        }))
      }
      const deleteItem=(id)=>{
            setItemsList((currentItems)=>currentItems.filter((todo)=> todo.id!==id))
      }
    console.log(itemsList)
        return <div className="container">

        <div className="nav">
            <Link to="/" className="navLink">Todos</Link>
            <Link to="note" className="navLink">Notes</Link>
        </div>

    <form onSubmit={handelSubmit} className="task-form">
        <input type="text" value={item} onChange={handelChange}/>
        <button className="add">Add</button>
    </form>
    <h2>Items</h2>
    <ul>
        {itemsList.length===0 && "No items"}
        {itemsList.map((todo)=> 
        (<li key={todo.id} >
        <label className={todo.completed ? "completed":""} htmlFor={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={e=>changeState(todo.id, e.target.checked)} id={todo.id}/>
            {todo.title}
        </label>
        <button onClick={()=>deleteItem(todo.id)} className="delete-btn">✖</button>
    </li>)
    )}
        
    </ul>
    </div>
  
}
