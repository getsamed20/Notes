import { Link } from "react-router-dom"
import { useState , useEffect } from "react"
import "./style.css"

export default function Note(){
    const [note,setNote]=useState('')

    const [notesList,setNotesList]=useState(()=>{
        const localValue = localStorage.getItem('ITEMS')
        if(localValue==null)return []
        return JSON.parse(localValue)})

        useEffect(()=>{
            localStorage.setItem('ITEMS', JSON.stringify(notesList))
        }, [notesList])

    const handelChange=(e)=>{
        setNote(e.target.value)
    }
    const handelSubmit=(e)=>{
        e.preventDefault()
        setNotesList((currentNote)=>{return[...currentNote, {id:crypto.randomUUID(), title:note}]})
        setNote("")
    }
    const deleteNote=(id)=>{
        setNotesList((currentNote)=>currentNote.filter((notes)=>id!==notes.id))
    }
    
    console.log(note)
    console.log(notesList)

    return <div className="container-note">
    <div className="nav">
            <Link to="/" className="navLink">Todos</Link>
            <Link to="note" className="navLink">Notes</Link>
    </div>
   <div className="notesList">
    {notesList.map((notes)=>
        (<div className="note old" key={notes.id}>
        <form onSubmit={handelSubmit}>
            <p>{notes.title}</p>
            <button className="delete-btn" onClick={()=>deleteNote(notes.id)}>✖</button>
        </form>
    </div>)
    )}
    <div className="note">
        <form onSubmit={handelSubmit}>
            <textarea onChange={handelChange} value={note} placeholder="Write here.."></textarea>
            <button className="delete-btn">✖</button>
            <button className="delete-btn">✔</button>

        </form>
    </div>
    </div>
</div>

 
}