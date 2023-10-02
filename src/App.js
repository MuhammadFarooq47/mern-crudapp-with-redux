import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Users";
import CreateUsers from "./CreateUsers";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getUser } from './redux/userSlice';
import UpdateUsers from "./UpdateUsers";

function App() {

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.41:3001/api/v1/users/');
      // console.log("User Data ==>>", response.data)
      dispatch(getUser(response.data));
    } catch (error) {
      console.log("Get data error ==>>>", error)
    }
  };

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/create" element={<CreateUsers />} />
      <Route path="/edit/:id" element={<UpdateUsers />} />
    </Routes>
   </Router>
  );
}

export default App;
