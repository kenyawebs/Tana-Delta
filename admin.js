import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock statistics for the dashboard
  const stats = {
    totalQueries: 156,
    activeUsers: 42,
    documentsProcessed: 78,
    successRate: 94
  };
  
  // Mock recent queries for the dashboard
  const recentQueries = [
    { id: 'q-123', user: 'John Doe', query: 'What are the requirements for bail in Kenya?', date: '2025-04-02', status: 'completed' },
    { id: 'q-124', user: 'Jane Smith', query: 'How do I file an appeal for my case?', date: '2025-04-02', status: 'processing' },
    { id: 'q-125', user: 'Robert Johnson', query: 'What is the penalty for assault in Kenya?', date: '2025-04-01', status: 'completed' },
    { id: 'q-126', user: 'Mary Williams', query: 'Can I get legal aid for my criminal case?', date: '2025-04-01', status: 'completed' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call for admin login
    setTimeout(() => {
      setIsLoading(false);
      if (phoneNumber === '0778401063' && password === 'admin') {
        setIsLoggedIn(true);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Admin Login | Kenya Criminal Legal Agent Assistant</title>
          <meta name="description" content="Admin login for Kenya Criminal Legal Agent Assistant" />
        </Head>

        <div className="flex min-h-screen">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="mx-auto w-full max-w-md">
              <div className="text-center">
                <img src="/logo.png" alt="Sureintel Logo" className="h-16 w-auto mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-primary mb-4">Admin Login</h2>
                <p className="text-neutral-light">Access the admin dashboard</p>
              </div>

              <div className="mt-8">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                      <label htmlFor="phone_number" className="label">Phone Number</label>
                      <div className="mt-1">
                        <input
                          id="phone_number"
                          name="phone_number"
                          type="text"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="input"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="label">Password</label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="input"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <div>
                      <button
                        type="submit"
                        className={`w-full btn btn-primary py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/" className="text-primary hover:text-primary-dark">
                  Return to Home Page
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-0 flex-1 bg-primary">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white max-w-md px-8">
                <h2 className="text-3xl font-bold mb-4">Kenya Criminal Legal Agent</h2>
                <p className="text-xl mb-6">Admin Dashboard</p>
                <p className="mb-4">Manage users, monitor system performance, and configure settings for the Kenya Criminal Legal Agent Assistant.</p>
                <p>For administrator access only.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Admin Dashboard | Kenya Criminal Legal Agent Assistant</title>
        <meta name="description" content="Admin dashboard for Kenya Criminal Legal Agent Assistant" />
      </Head>

      <nav className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-auto" src="/logo.png" alt="Sureintel Logo" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="bg-primary-dark text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                  <a href="#" className="text-white hover:bg-primary-dark px-3 py-2 rounded-md text-sm font-medium">Users</a>
                  <a href="#" className="text-white hover:bg-primary-dark px-3 py-2 rounded-md text-sm font-medium">Queries</a>
                  <a href="#" className="text-white hover:bg-primary-dark px-3 py-2 rounded-md text-sm font-medium">Documents</a>
                  <a href="#" className="text-white hover:bg-primary-dark px-3 py-2 rounded-md text-sm font-medium">Settings</a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button 
                  className="text-white hover:bg-primary-dark px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Queries</dt>
                  <dd className="mt-1 text-3xl font-semibold text-primary">{stats.totalQueries}</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                  <dd className="mt-1 text-3xl font-semibold text-primary">{stats.activeUsers}</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Documents Processed</dt>
                  <dd className="mt-1 text-3xl font-semibold text-primary">{stats.documentsProcessed}</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Success Rate</dt>
                  <dd className="mt-1 text-3xl font-semibold text-primary">{stats.successRate}%</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Recent Queries */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Queries</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentQueries.map((query) => (
                    <tr key={query.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{query.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{query.user}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{query.query}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{query.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          query.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {query.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href="#" className="text-primary hover:text-primary-dark">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
              <a href="#" className="text-primary hover:text-primary-dark text-sm font-medium">View all queries →</a>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">System Settings</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="default_model" className="block text-sm font-medium text-gray-700">Default AI Model</label>
                  <select id="default_model" name="default_model" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                    <option>GPT-4o</option>
                    <option>Claude 3 Opus</option>
                    <option>Gemini 1.5 Pro</option>
                    <option>Mistral Large</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="whatsapp_status" className="block text-sm font-medium text-gray-700">WhatsApp Integration</label>
                  <select id="whatsapp_status" name="whatsapp_status" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="max_tokens" className="block text-sm font-medium text-gray-700">Max Tokens Per Query</label>
                  <input type="number" name="max_tokens" id="max_tokens" className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue="4000" />
                </div>
                <div>
                  <label htmlFor="query_timeout" className="block text-sm font-medium text-gray-700">Query Timeout (seconds)</label>
                  <input type="number" name="query_timeout" id="query_timeout" className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue="60" />
                </div>
              </div>
              <div className="mt-6">
                <button type="button" className="btn btn-primary">Save Settings</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
