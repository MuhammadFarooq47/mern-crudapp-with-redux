import axios from "axios";
import { useState } from "react";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUsers() {

  const {id} = useParams()
  const users = useSelector(state => state.users.users)
  const user = users.find(uid => uid.id === id)
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

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
        const response = await axios.put(`http://192.168.0.41:3001/api/v1/users/update/${id}`,  {
          name,
          email,
          age
        })
        console.log("Update response", response.data)
          dispatch(updateUser({id,name,email,age}))
          navigate('/')
      }catch(error){
        console.log("Error from Update User ==>>>", error)
      }
  }

return (
  <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
    <div className="w-50 bg-white rounded p-3">
      <form onSubmit={handleSubmit}>
        <h2>Update User</h2>
        <div className="mb-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter Email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="">Age</label>
          <input
            type="text"
            value={age}
            placeholder="Enter Age"
            className="form-control"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button className="btn btn-success">Update</button>
      </form>
    </div>
  </div>
);
}

export default UpdateUsers;