import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// User Management Component
export default function UserManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'user'
  });
  
  // Authentication check
  useEffect(() => {
    // In a real implementation, this would check for a valid admin session
    // For now, we'll simulate authentication
    const checkAuth = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate successful authentication
        setIsAuthenticated(true);
        setIsLoading(false);
        
        // Load users data
        loadUsers();
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);
  
  // Load users data
  const loadUsers = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate users data
      const mockUsers = [
        {
          id: 'u1001',
          name: 'John Doe',
          phone: '+254712345678',
          email: 'john.doe@example.com',
          role: 'user',
          status: 'active',
          lastActive: '2025-05-19T07:30:00Z',
          queries: 12,
          documents: 5
        },
        {
          id: 'u1002',
          name: 'Jane Smith',
          phone: '+254723456789',
          email: 'jane.smith@example.com',
          role: 'user',
          status: 'active',
          lastActive: '2025-05-19T08:15:00Z',
          queries: 8,
          documents: 3
        },
        {
          id: 'u1003',
          name: 'Michael Johnson',
          phone: '+254734567890',
          email: 'michael.johnson@example.com',
          role: 'user',
          status: 'inactive',
          lastActive: '2025-05-10T14:20:00Z',
          queries: 5,
          documents: 2
        },
        {
          id: 'u1004',
          name: 'Sarah Williams',
          phone: '+254745678901',
          email: 'sarah.williams@example.com',
          role: 'user',
          status: 'active',
          lastActive: '2025-05-18T16:45:00Z',
          queries: 15,
          documents: 7
        },
        {
          id: 'u1005',
          name: 'David Brown',
          phone: '+254756789012',
          email: 'david.brown@example.com',
          role: 'user',
          status: 'active',
          lastActive: '2025-05-19T09:10:00Z',
          queries: 3,
          documents: 1
        },
        {
          id: 'u1006',
          name: 'Emily Davis',
          phone: '+254767890123',
          email: 'emily.davis@example.com',
          role: 'user',
          status: 'active',
          lastActive: '2025-05-17T11:30:00Z',
          queries: 7,
          documents: 4
        },
        {
          id: 'u1007',
          name: 'James Wilson',
          phone: '+254778901234',
          email: 'james.wilson@example.com',
          role: 'user',
          status: 'inactive',
          lastActive: '2025-05-05T09:45:00Z',
          queries: 2,
          documents: 0
        },
        {
          id: 'u1008',
          name: 'Admin User',
          phone: '+254778401063',
          email: 'admin@sureintel.co.ke',
          role: 'admin',
          status: 'active',
          lastActive: '2025-05-19T09:00:00Z',
          queries: 0,
          documents: 0
        }
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle new user input change
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle add user form submission
  const handleAddUser = (e) => {
    e.preventDefault();
    
    // In a real implementation, this would send a request to the API
    // For now, we'll simulate adding a user
    const newUserId = `u${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toISOString();
    
    const addedUser = {
      id: newUserId,
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      lastActive: currentDate,
      queries: 0,
      documents: 0
    };
    
    setUsers(prev => [addedUser, ...prev]);
    setShowAddUserModal(false);
    setNewUser({
      name: '',
      phone: '',
      email: '',
      role: 'user'
    });
  };
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-800';
    
    if (status === 'active') {
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
    } else if (status === 'inactive') {
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  // Role badge component
  const RoleBadge = ({ role }) => {
    let bgColor = 'bg-blue-100';
    let textColor = 'text-blue-800';
    
    if (role === 'admin') {
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading user management...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 text-xl">Authentication required</p>
          <p className="mt-2 text-gray-700">Please log in to access user management.</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>User Management | Kenya Criminal Legal Agent</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="SureIntel Logo" className="h-10 w-auto" />
            <h1 className="ml-4 text-2xl font-bold text-gray-900">User Management</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <a className="text-sm text-blue-600 hover:text-blue-800">Dashboard</a>
            </Link>
            <span className="text-sm text-gray-600">Admin User</span>
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Add User */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-gray-900">Users</h2>
              <p className="text-sm text-gray-600">Manage system users and their permissions</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add User
              </button>
            </div>
          </div>
          
          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(user.lastActive)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className="font-medium">{user.queries}</span> queries
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">{user.documents}</span> documents
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/users/${user.id}`}>
                        <a className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                      </Link>
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      {user.role !== 'admin' && (
                        <button className={`${user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}>
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white p
(Content truncated due to size limit. Use line ranges to read in chunks)