import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'
function Create() {

  const [values, setValues] = useState({
    ptitle : '',
    pbody : ''
  })

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/posts', values)
    .then(res => {
      console.log(res.data)
      navigate('/')
      .catch(err => console.log(err))
    })
  }

  return (
    <>
     
     <div className="d-flex w-100 vh-50 justify-content-center  bg-dark">
        <div className='w-50 border bg-light shadow px-5 pt-3 pb-5 rounded'>
          <h1>Add new post </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="title">Title</label>
              <input type="text" name='title' onChange={e => setValues({...values, ptitle : e.target.value})} className='form-control' placeholder='Enter title'/>
            </div>
            <div className="mb-2">
              <label htmlFor="body">Body :</label>
              <input type="text" name='body' onChange={e => setValues({...values, pbody : e.target.value})} className='form-control' placeholder='Enter body'/>
            </div>
           
            <button className='btn btn-success me-2'>Submit</button>
            <Link to='/' className='btn btn-primary'>Back</Link>
          </form>
        </div>
      </div>
     
    </>
  )
}

export default Create
