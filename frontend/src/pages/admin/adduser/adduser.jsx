import "./adduser.scss";
import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import axios from "axios";
import Admin_sidebar from "../../../components/admin/admin_sidebar/Admin_sidebar";

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [acessLevel, setAcessLevel] = useState("");
  const [email, setEmail] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/admin/register",
        {
          username: userName,
          acessLevel: acessLevel,
          email: email,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        if (res.data === "User Registered") {
          alert("User Registered");
        } else {
          alert("Error");
        }
      });
  };

  return (
    <div className="new">
      <Admin_sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add User</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>User Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <br></br>

              <div className="formInput">
                <label>acessLevel</label>

                <select
                  value={acessLevel}
                  onChange={(e) => {
                    setAcessLevel(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select Access Level
                  </option>
                  <option value="0">Admin</option>
                  <option value="1">cashier</option>
                  <option value="2">HR Manger</option>
                  <option value="3">Purchase Manager</option>
                  <option value="4">Warehouse Operator</option>
                  <option value="5">Accountant</option>
                </select>
              </div>

              <div className="break"></div>
              <button onClick={submitForm}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
