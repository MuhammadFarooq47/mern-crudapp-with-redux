// import React, {useEffect} from "react";
import axios from "axios";
import { useState } from "react";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function CreateUser() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const userData = {
    //   name,
    //   email,
    //   age
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
          const response = await   axios.post('http://192.168.0.41:3001/api/v1/users/create',  {
            name,
            email,
            age
          })
            dispatch(addUser(response.data))
            navigate('/')
        }catch(error){
          console.log("Error from Create User ==>>>", error)
        }
    }

    // useEffect(() => {
    //   handleSubmit();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [name, email, age])

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              // value={name}
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              // value={email}
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              // value={age}
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;