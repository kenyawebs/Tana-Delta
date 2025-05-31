import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// System Settings Component
export default function SystemSettings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    whatsappNumber: '+254 0778401063',
    whatsappEnabled: true,
    queryProcessingTimeout: 120,
    documentProcessingTimeout: 300,
    maxQueryLength: 1000,
    maxDocumentSize: 10,
    allowedDocumentTypes: ['pdf', 'docx', 'doc', 'txt'],
    maintenanceMode: false,
    debugMode: false,
    notificationsEnabled: true,
    autoDeleteInactiveUsers: false,
    inactiveUserDays: 90,
    systemVersion: '1.0.0'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  
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
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);
  
  // Handle settings change
  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? Number(value) : value
    }));
  };
  
  // Handle document type toggle
  const handleDocTypeToggle = (type) => {
    setSettings(prev => {
      const currentTypes = [...prev.allowedDocumentTypes];
      
      if (currentTypes.includes(type)) {
        return {
          ...prev,
          allowedDocumentTypes: currentTypes.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          allowedDocumentTypes: [...currentTypes, type]
        };
      }
    });
  };
  
  // Handle save settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(false);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful save
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setIsSaving(false);
      setSaveError(true);
      
      // Reset error message after 3 seconds
      setTimeout(() => {
        setSaveError(false);
      }, 3000);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading system settings...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 text-xl">Authentication required</p>
          <p className="mt-2 text-gray-700">Please log in to access system settings.</p>
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
        <title>System Settings | Kenya Criminal Legal Agent</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="SureIntel Logo" className="h-10 w-auto" />
            <h1 className="ml-4 text-2xl font-bold text-gray-900">System Settings</h1>
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
        {/* Settings Form */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">System Configuration</h2>
            <p className="text-sm text-gray-600">Manage system settings and preferences</p>
          </div>
          
          <form onSubmit={handleSaveSettings}>
            <div className="p-6 space-y-8">
              {/* WhatsApp Settings */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">WhatsApp Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Business Number
                    </label>
                    <input
                      type="text"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={settings.whatsappNumber}
                      onChange={handleSettingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="whatsappEnabled"
                      name="whatsappEnabled"
                      checked={settings.whatsappEnabled}
                      onChange={handleSettingChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="whatsappEnabled" className="ml-2 block text-sm text-gray-700">
                      Enable WhatsApp Integration
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Processing Settings */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">Processing Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="queryProcessingTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                      Query Processing Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      id="queryProcessingTimeout"
                      name="queryProcessingTimeout"
                      value={settings.queryProcessingTimeout}
                      onChange={handleSettingChange}
                      min="30"
                      max="600"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="documentProcessingTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                      Document Processing Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      id="documentProcessingTimeout"
                      name="documentProcessingTimeout"
                      value={settings.documentProcessingTimeout}
                      onChange={handleSettingChange}
                      min="60"
                      max="1200"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxQueryLength" className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Query Length (characters)
                    </label>
                    <input
                      type="number"
                      id="maxQueryLength"
                      name="maxQueryLength"
                      value={settings.maxQueryLength}
                      onChange={handleSettingChange}
                      min="100"
                      max="5000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxDocumentSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Document Size (MB)
                    </label>
                    <input
                      type="number"
                      id="maxDocumentSize"
                      name="maxDocumentSize"
                      value={settings.maxDocumentSize}
                      onChange={handleSettingChange}
                      min="1"
                      max="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Document Types */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">Allowed Document Types</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['pdf', 'docx', 'doc', 'txt', 'rtf', 'jpg', 'png', 'odt'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`docType-${type}`}
                        checked={settings.allowedDocumentTypes.includes(type)}
                        onChange={() => handleDocTypeToggle(type)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`docType-${type}`} className="ml-2 block text-sm text-gray-700 uppercase">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* System Settings */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">System Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleSettingChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                      Maintenance Mode
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="debugMode"
                      name="debugMode"
                      checked={settings.debugMode}
                      onChange={handleSettingChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="debugMode" className="ml-2 block text-sm text-gray-700">
                      Debug Mode
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notificationsEnabled"
                      name="notificationsEnabled"
                      checked={settings.notificationsEnabled}
                      onChange={handleSettingChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="notificationsEnabled" className="ml-2 block text-sm text-gray-700">
                      Enable Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoDeleteInactiveUsers"
                      name="autoDeleteInactiveUsers"
                      checked={settings.autoDeleteInactiveUsers}
                      onChange={handleSettingChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoDeleteInactiveUsers" className="ml-2 block text-sm text-gray-700">
                      Auto-Delete Inactive Users
                    </label>
                  </div>
                  {settings.autoDeleteInactiveUsers && (
                    <div>
                      <label htmlFor="inactiveUserDays" className="block text-sm font-medium text-gray-700 mb-1">
                        Days Before User Deletion
                      </label>
                      <input
                        type="number"
                        id="inactiveUserDays"
                        name="inactiveUserDays"
                        value={settings.inactiveUserDays}
                        onChange={handleSettingChange}
                        min="30"
                        max="365"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* System Information */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">System Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">System Version</p>
                      <p className="text-sm font-medium text-gray-900">{settings.systemVersion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-50
(Content truncated due to size limit. Use line ranges to read in chunks)