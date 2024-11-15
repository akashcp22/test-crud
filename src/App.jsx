import Create from "./Components/Create"
import Home from "./Components/Home"
import Read from "./Components/Read"
import Update from "./Components/Update"
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/read/:id" element={<Read/>}/>
      </Routes>
    </>
  )
}

export default App
