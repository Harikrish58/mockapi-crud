import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component for editing an existing user
const Edit = () => {
  // Extracts user ID from URL and sets up state for data, loading, and errors
  const { id } = useParams();
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Effect to fetch user data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Async function to fetch user data from the API based on ID
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://67db1e961fd9e43fe473a653.mockapi.io/api/users/${id}`
      );
      setEditData(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Utility function to update nested object properties
  const updateNestedObject = (obj, path, value) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const newObj = { ...obj };

    let current = newObj;
    for (const key of keys) {
      current[key] = { ...current[key] } || {};
      current = current[key];
    }
    current[lastKey] = value;

    return newObj;
  };

  // Handler for input changes, updates state with nested support
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => updateNestedObject(prevData, name, value));
  };

  // Async function to submit updated user data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `https://67db1e961fd9e43fe473a653.mockapi.io/api/users/${id}`,
        editData
      );
      navigate("/users", { state: { success: "User updated successfully!" } });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Conditional rendering for loading, error, and no-data states
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="text-center text-danger mt-5">Error: {error}</div>;
  if (!editData) return null;

  // Main UI rendering a form to edit user details
  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Edit User</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* ID */}
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                ID
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={editData.id || ""}
                onChange={handleChange}
                disabled
              />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={editData.name || ""}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={editData.username || ""}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={editData.email || ""}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Address Fields */}
            <fieldset className="mb-3" disabled={loading}>
              <legend className="fs-5">Address</legend>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="address.street" className="form-label">
                    Street
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address.street"
                    name="address.street"
                    value={editData.address?.street || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address.suite" className="form-label">
                    Suite
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address.suite"
                    name="address.suite"
                    value={editData.address?.suite || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address.city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address.city"
                    name="address.city"
                    value={editData.address?.city || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address.zipcode" className="form-label">
                    Zipcode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address.zipcode"
                    name="address.zipcode"
                    value={editData.address?.zipcode || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Geo Fields */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="address.geo.lat" className="form-label">
                    Latitude
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address.geo.lat"
                    name="address.geo.lat"
                    value={editData.address?.geo?.lat || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address.geo.lng" className="form-label">
                    Longitude
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address.geo.lng"
                    name="address.geo.lng"
                    value={editData.address?.geo?.lng || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </fieldset>

            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={editData.phone || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Website */}
            <div className="mb-3">
              <label htmlFor="website" className="form-label">
                Website
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                name="website"
                value={editData.website || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Company Fields */}
            <fieldset className="mb-3" disabled={loading}>
              <legend className="fs-5">Company</legend>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="company.name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company.name"
                    name="company.name"
                    value={editData.company?.name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="company.catchPhrase" className="form-label">
                    Catch Phrase
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company.catchPhrase"
                    name="company.catchPhrase"
                    value={editData.company?.catchPhrase || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="company.bs" className="form-label">
                    Business Strategy
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company.bs"
                    name="company.bs"
                    value={editData.company?.bs || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </fieldset>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update User"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/users")}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Exports Edit component for use in the app
export default Edit;
