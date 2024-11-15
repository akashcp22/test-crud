import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Update() {

  const {id} = useParams();

  const [values, setValues] = useState({
    ptitle : '',
    pbody : ''
})

const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:3000/posts/` + id)
    .then(res => {
      setValues(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  
  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3000/posts/' + id, values)
    .then(res => {
    console.log(res.data)
    navigate('/')
    .catch(err => console.log(err))
  })
  
  }

  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
          <h1>Update post </h1>
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label htmlFor="name">Title :</label>
              <input type="text" value={values.ptitle} onChange={e => setValues({...values, ptitle : e.target.value})} name='name'className='form-control' placeholder='Enter Name' />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Body :</label>
              <input type="text" value={values.pbody} onChange={e => setValues({...values, pbody : e.target.value})} name='email' className='form-control' placeholder='Enter Email' />
            </div>
            <button  className='btn btn-success me-2'>Update</button>
            <Link to='/' className='btn btn-primary'>Back</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Update


// import React from 'react'
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function Update() {
//   return (
//     <Container className="mt-5">
//       <Row>
//         {[...Array(6)].map((_, index) => (
//           <Col key={index} xs={12} sm={6} md={4} lg={3}>
//             <Card className="m-3" style={{ width: '18rem' }}>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>Name: </ListGroup.Item>
//                 <ListGroup.Item>Email: </ListGroup.Item>
//                 <ListGroup.Item>Phone:</ListGroup.Item>
//                 <ListGroup.Item>
//                   <button className="btn btn-success me-2">Edit</button>
//                   <button className="btn btn-danger">Delete</button>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }



// export default Update;

