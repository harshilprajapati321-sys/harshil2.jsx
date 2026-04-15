
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Form() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const API = "http://localhost:3008/users";

  const fetchData = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const Submit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post(API, formData);
    }

    setFormData({ name: "", email: "", password: "" });
    fetchData();
  };

  const Delete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchData();
  };

  const Edit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  return (
    <div className="container py-5">

     
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-header  text-black text-center">
          <h3>{editId ? "Update User" : "Add User"}</h3>
        </div>

        <div className="card-body">
          <form onSubmit={Submit}>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={Change}
                  className="form-control mb-3"
                />
              </div>

              <div className="col-md-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={Change}
                  className="form-control mb-3"
                />
              </div>

              <div className="col-md-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={Change}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-outline-success px-4">
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>

    
      <div className="card shadow border-0">
        <div className="card-header  text-black text-center">
          <h4>User List</h4>
        </div>

        <div className="card-body">
          <table className="table table-hover text-center align-middle">
            <thead className="">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {item.password}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => Edit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => Delete(item.id)}
                    >
                       Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

       
        </div>
      </div>
    </div>
  );
}