import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        try {
          response = await axios.get(`http://localhost:3000/posts/${id}`);
          setData(response.data); 
        } catch (error) {
          console.log("Data not found in JSON Server, trying JSONPlaceholder...");
          
          response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
          setData(response.data); 
        }
        setLoading(false); 
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>View User Details</h1>
        {loading ? (
          <div className="text-center p-5">
            <i className="fa-solid fa-spinner fa-spin fa-7x" style={{ color: 'black' }}></i>
            <h4 className="pt-2" style={{ color: 'black' }}>Loading</h4>
          </div>
        ) : data ? (
          <div>
            <div className="mb-2">
              <strong>Title: <br /> {data.title || data.ptitle}</strong>
            </div>
            <div className="mb-2">
              <strong>Body: <br />  {data.body || data.pbody}</strong>
            </div>
            <Link to={`/update/${id}`} className='btn btn-success me-2'>Edit</Link>
            <Link to='/' className='btn btn-primary'>Back</Link>
          </div>
        ) : (
          <div className="text-center p-5">
            <h4 className="pt-2" style={{ color: 'black' }}>No data found</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Read;
