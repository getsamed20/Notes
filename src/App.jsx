import Todo from './todo.jsx'
import Note from './note.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
export default function App(){
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Todo/> } />
        <Route path="note" element={ <Note/> } />
      </Routes>
      </BrowserRouter>
  )
}