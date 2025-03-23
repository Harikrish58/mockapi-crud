import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const successMessage = location.state?.success;
    if (successMessage) {
      setMessage(successMessage);
    }
  }, [location.state]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://67db1e961fd9e43fe473a653.mockapi.io/api/users"
      );
      setUsers(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(
        `https://67db1e961fd9e43fe473a653.mockapi.io/api/users/${id}`
      );
      setUsers(users.filter((user) => user.id !== id));
      setMessage("User deleted successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">User Directory</h2>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Address</th>
                  <th scope="col">Company</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <div>
                        <strong>{user.name}</strong>
                        <div className="text-muted">@{user.username}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div>{user.email}</div>
                        <div>{user.phone}</div>
                        <div>
                          <a
                            href={`https://${user.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {user.website}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div>
                          {user.address.street}, {user.address.suite}
                        </div>
                        <div>
                          {user.address.city}, {user.address.zipcode}
                        </div>
                        <div className="text-muted">
                          Lat: {user.address.geo.lat}, Lng:{" "}
                          {user.address.geo.lng}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>{user.company.name}</strong>
                        <div className="text-muted">
                          {user.company.catchPhrase}
                        </div>
                        <div className="text-muted">{user.company.bs}</div>
                      </div>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(user.id)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(user.id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/create")}
        disabled={loading}
      >
        Add New User
      </button>
    </div>
  );
};

export default Users;