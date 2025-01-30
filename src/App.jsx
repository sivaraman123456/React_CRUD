import { useEffect, useState } from "react"
import axios from "axios";
const App = () => {
const [data, setData] = useState([])
const [editUser, setEditUser] = useState(null);
const [showPopup, setShowPopup] = useState(false);
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [address, setAddress] = useState('')
async function fetchData() {
  try {
    const res= await fetch('https://jsonplaceholder.typicode.com/users')
    const data=await res.json()
    console.log(data);
    setData(data)
  } catch (error) {
    console.log(error);
    
  }

  }

  async function handleUserData() {
    const userName = name.trim();
    const userEmail = email.trim();
    const userAddress = address.trim();

    if (userName && userEmail && userAddress) {
      try {
       const res = await fetch(
            `https://jsonplaceholder.typicode.com/users`,
            {
              method:"POST",
              headers: { "Content-Type": "application/json; charset=UTF-8" },
              body: JSON.stringify({
                name: userName,
                email: userEmail,
                address: {
                  city: userAddress,
                },
              }),
            }
          );
          const newUser = res.json();
          setData([...data, newUser]);
        
        setName("");
        setEmail("");
        setAddress("");
        setShowPopup(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

useEffect(()=>{
  try {
    fetchData()
  } catch (error) {
    console.log(error);
    
  }

},[])

 

  return (
    <div className='container'>
    <nav className="navbar">
      <h1>CRUD Operation Using ReactJs</h1>
      <button className="add-btn" onClick={()=>setShowPopup(true)}>
        Add new user
      </button>
    </nav>
    {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {/* <h2>{editUser ? "Edit User" : "Add User"}</h2> */}
            <h2>Add User</h2>
            <label>Enter User Name:</label>
            <input
              type="text"
              placeholder="Enter User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Enter User Email:</label>
            <input
              type="email"
              placeholder="Enter User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Enter User Address:</label>
            <input
              type="text"
              placeholder="Enter User Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <br />
            <center>
              <button  onClick={handleUserData}>
                {/* {editUser ? "Update" : "Add"} */}
                ADD
              </button>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </center>
          </div>
        </div>
      )}
    <table border={1}>
      <thead>
        <tr>
          <th>User ID</th>
          <th>User Name</th>
          <th>User Email</th>
          <th>User Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
       {data.length > 0 ? (
        data.map((data,index)=>{
          return  <tr key={index} >
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.address.city}</td>
                </tr>
               })
       ) :(
        <div>
          No Data Found
        </div>
       ) }
      </tbody>
    </table>
  </div>
  )
}

export default App