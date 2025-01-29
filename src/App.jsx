import { useEffect, useState } from "react"

const App = () => {
const [data, setData] = useState([])

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
    </nav>

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