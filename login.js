import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'verification'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call to initiate WhatsApp authentication
    setTimeout(() => {
      setIsLoading(false);
      setStep('verification');
    }, 1500);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call to verify code
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home page after successful login
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Login | Kenya Criminal Legal Agent Assistant</title>
        <meta name="description" content="Login to access Kenya Criminal Legal Agent Assistant" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <img src="/logo.png" alt="Sureintel Logo" className="h-10 w-auto" />
            </Link>
            <h1 className="ml-3 text-xl font-bold text-primary">Kenya Criminal Legal Agent</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-neutral hover:text-primary font-medium">Home</Link></li>
              <li><Link href="/services" className="text-neutral hover:text-primary font-medium">Services</Link></li>
              <li><Link href="/about" className="text-neutral hover:text-primary font-medium">About</Link></li>
              <li><Link href="/contact" className="text-neutral hover:text-primary font-medium">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-4">Login</h2>
            <p className="text-lg text-neutral-light">Access your account using WhatsApp authentication</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phone_number" className="label">WhatsApp Phone Number</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +254
                    </span>
                    <input
                      type="text"
                      id="phone_number"
                      name="phone_number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-primary focus:border-primary border-gray-300"
                      placeholder="7XXXXXXXX"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Enter your WhatsApp number without the country code</p>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div className="flex justify-center">
                  <button 
                    type="submit" 
                    className={`btn btn-primary px-8 py-3 flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    Send Verification Code
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <div>
                  <label htmlFor="verification_code" className="label">Verification Code</label>
                  <input
                    type="text"
                    id="verification_code"
                    name="verification_code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="input"
                    placeholder="Enter the 6-digit code sent to your WhatsApp"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">Check your WhatsApp for a message from our system</p>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div className="flex justify-between">
                  <button 
                    type="button" 
                    className="text-primary hover:text-primary-dark"
                    onClick={() => setStep('phone')}
                  >
                    Back
                  </button>
                  
                  <button 
                    type="submit" 
                    className={`btn btn-primary px-8 py-3 flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    Verify & Login
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral">Need help? Contact us at <a href="mailto:info@sureintel.co.ke" className="text-primary">info@sureintel.co.ke</a></p>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-dark text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/logo.png" alt="Sureintel Logo" className="h-10 w-auto mb-4" />
              <p className="text-gray-300">Empowering individuals with legal knowledge and support in Kenya's criminal justice system.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link href="/services" className="text-gray-300 hover:text-white">Services</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/query" className="text-gray-300 hover:text-white">Legal Queries</Link></li>
                <li><Link href="/documents" className="text-gray-300 hover:text-white">Document Review</Link></li>
                <li><Link href="/resources" className="text-gray-300 hover:text-white">Legal Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">WhatsApp: +254 778401063</p>
              <p className="text-gray-300 mb-4">Email: info@sureintel.co.ke</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Sureintel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
