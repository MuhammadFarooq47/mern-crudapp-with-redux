import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { deleteUser } from './redux/userSlice';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import { useNavigate } from 'react-router-dom';

function Users() {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (id, name) => {
    setUserName(name);
    setUserID(id);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.0.41:3001/api/v1/users/delete/${id}`);
      dispatch(deleteUser(id));
      if (response.status >= 300) {
        console.log(`handleDelete error : ${response.data.message}`);
      } else {
        console.log('Deletion successful', response.data);
      //  window.location.reload()
       setShow(false);

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm">
          Add +
        </Link>
        {users?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td> {user.name} </td>
                    <td> {user.email} </td>
                    <td> {user.age} </td>
                    <td>
                      <Link to={`/edit/${user.id}`} className='btn btn-success btn-sm me-2'> Update </Link>
                      <button className='btn btn-danger btn-sm' onClick={() => handleShow(user.id, user.name)}> Delete </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className='text-center m-5'> Data Not Found... </p>
        )}

        {/* Modal Start */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><RiDeleteBin6Line size={20} color="red" /> Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add your modal content here */}
            <p>Are you sure you want to delete {userName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleDelete(userID)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal End */}
      </div>
    </div>
  );
}

export default Users;
