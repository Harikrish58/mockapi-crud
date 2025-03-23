import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Component for creating a new user
const Create = () => {
  // State initialized with an object for new user data, plus loading and error states
  const [createData, setCreateData] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    setCreateData((prevData) => updateNestedObject(prevData, name, value));
  };

  // Async function to submit new user data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `https://67db1e961fd9e43fe473a653.mockapi.io/api/users/`,
        createData
      );
      navigate("/users", { state: { success: "User created successfully!" } });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Conditional rendering for loading, error, and no-data states
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">Error: {error}</div>;
  if (!createData) return null;

  // Main UI rendering a form to create a new user
  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Create User</h2>
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
                value={createData.id}
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
                value={createData.name}
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
                value={createData.username}
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
                value={createData.email}
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
                    value={createData.address.street}
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
                    value={createData.address.suite}
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
                    value={createData.address.city}
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
                    value={createData.address.zipcode}
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
                    value={createData.address.geo.lat}
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
                    value={createData.address.geo.lng}
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
                value={createData.phone}
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
                value={createData.website}
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
                    value={createData.company.name}
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
                    value={createData.company.catchPhrase}
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
                    value={createData.company.bs}
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
                {loading ? "Creating..." : "Create User"}
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

// Exports Create component for use in the app
export default Create;