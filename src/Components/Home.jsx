import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const searchPost = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(
      data.filter((item) =>
        (item.title || item.ptitle).toLowerCase().includes(searchText)
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [localData, placeholderData] = await Promise.all([
          axios.get("http://localhost:3000/posts"),
          axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
        ]);

        const combinedData = [...localData.data, ...placeholderData.data];
        setData(combinedData);
        setSearch(combinedData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      try {
        const isLocalData = data.find((item) => item.id === id && item.ptitle);
        if (isLocalData) {
          await axios.delete(`http://localhost:3000/posts/${id}`);
        } else {
          await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        }
        setData(data.filter((item) => item.id !== id));
        setSearch(data.filter((item) => item.id !== id));
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-90">
        <h1 className="py-2">POSTS</h1>
        <div className="w-75 rounded bg-white border shadow p-4">
          {loading ? (
            <div className="text-center p-5">
              <i
                className="fa-solid fa-spinner fa-spin fa-7x"
                style={{ color: 'black' }}
              ></i>
              <h4 className="pt-2" style={{ color: 'black' }}>Loading</h4>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between mb-3">
                <Link to="/create" className="btn btn-success">New Post</Link>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control w-50"
                  onChange={searchPost}
                />
              </div>

              <Container>
                <Row>
                  {search.length > 0 ? (
                    search.map((d, i) => (
                      <Col key={i} xs={12} sm={6} md={6} lg={6} className="mb-4">
                        <Card style={{height:"200px"}}>
                          <Card.Body>
                            <Card.Title>{d.ptitle || d.title}</Card.Title>
                            <Card.Text>{d.pbody || d.body}</Card.Text>
                            <div className="d-flex justify-content-between">
                              <Link
                                to={`/update/${d.id}`}
                                className="btn btn-sm btn-primary"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(d.id)}
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <p className="text-center w-100">No posts available.</p>
                  )}
                </Row>
              </Container>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
