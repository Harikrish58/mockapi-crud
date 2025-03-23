import React, { useEffect, useState } from "react";
import axios from "axios";

// Component to display a list of users on the home page
const Home = () => {
  // State to manage users data, loading status, and errors
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to fetch user data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Async function to retrieve users from the API
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

  // Conditional rendering for loading and error states
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  // Main UI rendering a grid of user cards
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {users.map((user) => (
          <div key={user.id} className="col">
            <div className="card">
              <div className="card-header">
                <h2>{user.name}</h2>
                <h5 className="text-muted">@{user.username}</h5>
              </div>
              <div className="card-body">
                <h5 className="card-title">Contact Information</h5>
                <p className="card-text">
                  Email: {user.email}
                  <br />
                  Phone: {user.phone}
                  <br />
                  Website: {user.website}
                </p>

                <h5 className="card-title">Address</h5>
                <p className="card-text">
                  {user.address.street}, {user.address.suite}
                  <br />
                  {user.address.city}, {user.address.zipcode}
                  <br />
                  Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                </p>

                <h5 className="card-title">Company</h5>
                <p className="card-text">
                  {user.company.name}
                  <br />
                  <small className="text-muted">
                    {user.company.catchPhrase}
                    <br />
                    {user.company.bs}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exports Home component for use in the app
export default Home;
