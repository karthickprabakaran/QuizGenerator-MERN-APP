import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [usersData, setUsersData] = useState<{ name: string; email: string; rank: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserRanks();
  }, []);

  const fetchUserRanks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/get-rank'); // Make sure this URL is correct
      setUsersData(response.data.users); // Assuming the response contains the 'users' array
    } catch (error) {
      console.error('Error fetching data:', error);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred while fetching data.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Users and Their Ranks</h1>
      {usersData.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Rank</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr
                  key={user.email}
                  className="transition-all duration-300 ease-in-out hover:bg-blue-50"
                >
                  <td className="px-6 py-4 border-b text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{user.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
