import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [deleteUser, setDeleteUser] = useState();
const [showDeletePopup,setShowDeletePopup]=useState(false)
  // get the user data API
  async function fetchData() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Create a new user data
  async function handleUserData() {
    const userName = name.trim();
    const userEmail = email.trim();
    const userAddress = address.trim();

    if (userName && userEmail && userAddress) {
      try {
        if (editUser) {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/users/${editUser.id}`,
            {
              method: "PUT",
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
          const updatedUser = await res.json();
          setData(
            data.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );

          setName("");
          setEmail("");
          setAddress("");
          setShowPopup(false);
          // setEditUser(null)
        } else {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              method: "POST",
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
          const newUser = await res.json();
          setData([...data, newUser]);

          setName("");
          setEmail("");
          setAddress("");
          setShowPopup(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // edit user data
  const handleEditUser = (data) => {
    setEditUser(data);
    setShowPopup(true);
    setName(data.name);
    setEmail(data.email);
    setAddress(data.address.city);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    setEditUser(null);
    setName("");
    setEmail("");
    setAddress("");
  };
  const handleConfirmation = async () => {
    if (deleteUser) {
      await fetch(
        `https://jsonplaceholder.typicode.com/users/${deleteUser.id}`,
        {
          method: "DELETE",
        }
      );
      setData(data.filter((user) => user.id !== deleteUser.id));
    }
  };

  const handleDeleteUser = (data) => {
    setDeleteUser(data);
    setShowDeletePopup(true)
  };


  return (
    <div className="container">
      <nav className="navbar">
        <h1>CRUD Operation Using ReactJs</h1>
        <button className="add-btn" onClick={() => setShowPopup(true)}>
          Add new user
        </button>
      </nav>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editUser ? "Edit User" : "Add User"}</h2>

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
              <button onClick={handleUserData}>
                {editUser ? "Update" : "Add"}
              </button>
              <button onClick={handleClose}>Close</button>
            </center>
          </div>
        </div>
      )}


{showDeletePopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteUser?.name}</strong>?
            </p>
            <center>
              <button
                onClick={handleConfirmation}
                style={{ backgroundColor: "#dc3545", color: "white" }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                style={{ backgroundColor: "#6c757d", color: "white" }}
              >
                Cancel
              </button>
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
            data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.address.city}</td>
                  <td>
                    {" "}
                    <button id="editBtn" onClick={() => handleEditUser(data)}>
                      Edit
                    </button>
                    <button
                      id="deleteBtn"
                      onClick={() => handleDeleteUser(data)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>No Data Found</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
