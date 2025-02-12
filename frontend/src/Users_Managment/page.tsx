'use client';
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  registeredDate: string;
  status: string;
  borrowedBooks: number;
}

const UsersData = () => {
  // State for users
  const [users, setUsers] = useState<User[]>([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    fetch('http://localhost:3000/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Unauthorized: Invalid or expired token');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Error: Data is not an array');
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Calculate start and end index for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle remove user
  const handleRemoveUser = (id: string) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.error('Error removing user:', error));
  };

  // Handle toggle status
  const handleToggleStatus = (id: string) => {
    const user = users.find(user => user._id === id);
    if (user) {
      const newStatus = user.status === "Active" ? "Banned" : "Active";
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token found');
        return;
      }

      fetch(`http://localhost:3000/users/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then(response => response.json())
        .then(updatedUser => {
          setUsers(users.map(user => user._id === id ? updatedUser : user));
        })
        .catch(error => console.error('Error updating user status:', error));
    }
  };

  return (
    <div className="p-6 w-[1120px]">
      <h2 className="text-[24px] font-bold text-gray-700 mb-4">User List</h2>
      <div className="flex space-x-6 text-sm font-medium text-gray-600 border-b pb-2">
        <p className="text-blue-600 border-b-2 border-blue-600">All Users</p>
        <p>Active</p>
        <p>Banned</p>
      </div>
      <div className="overflow-x-auto bg-white rounded-3xl shadow-md p-4 my-2">
        <table className="min-w-full p-4 font-body text-base md:w-[743px]">
          <thead className='border-b'>
            <tr className='font-medium text-base text-custom-light-purple'>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Registered Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Borrowed Books</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className='font-medium text-base font-body'>
            {currentRows.map((user, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="px-6 py-4 text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-gray-900">{user.registeredDate}</td>
                <td 
                  className={`px-6 py-4 cursor-pointer ${user.status === "Active" ? "text-green-500" : "text-red-500"}`}
                  onClick={() => handleToggleStatus(user._id)}
                >
                  {user.status}
                </td>
                <td className="px-6 py-4 text-gray-900">{user.borrowedBooks}</td>
                <td className="px-6 py-4 text-gray-900">
                  <button
                    onClick={() => handleRemoveUser(user._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 rounded-md ${currentPage === 1 ? "text-gray-400" : "text-blue-600 hover:underline"}`}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-600 text-white" : "text-blue-600 hover:underline"}`}>{index + 1}</button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "text-gray-400" : "text-blue-600 hover:underline"}`}>Next</button>
      </div>
    </div>
  );
};

export default UsersData;