import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us | Kenya Criminal Legal Agent Assistant</title>
        <meta name="description" content="Learn about the Kenya Criminal Legal Agent Assistant and our mission to provide accessible legal information" />
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">About Us</h2>
            <p className="text-lg text-neutral-light">Empowering Kenyans with accessible legal information and support</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Our Mission</h3>
            <p className="text-neutral mb-4">
              At Sureintel Kenya Criminal Legal Agent Assistant, our mission is to democratize access to legal information and support for all Kenyans. We believe that understanding your rights and the legal system is fundamental to achieving justice.
            </p>
            <p className="text-neutral mb-4">
              The Kenyan criminal justice system can be complex and intimidating, especially for those without legal training or representation. Our AI-powered platform bridges this gap by providing accurate, accessible, and actionable legal information to anyone who needs it.
            </p>
            <p className="text-neutral">
              We are committed to empowering individuals with the knowledge they need to navigate the criminal justice system, whether they're seeking information about their rights, understanding legal procedures, or reviewing legal documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Our Approach</h3>
              <p className="text-neutral mb-4">
                We combine cutting-edge artificial intelligence with comprehensive legal knowledge to provide accurate and relevant information tailored to your specific needs.
              </p>
              <p className="text-neutral">
                Our system is designed to understand complex legal queries, analyze documents, and provide clear, actionable guidance based on Kenyan law and precedents.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Our Values</h3>
              <ul className="space-y-2 text-neutral">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Accessibility:</strong> Making legal information available to all Kenyans regardless of background or resources</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Accuracy:</strong> Providing reliable information based on current laws and precedents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Empowerment:</strong> Enabling individuals to make informed decisions about their legal matters</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Innovation:</strong> Leveraging technology to improve access to justice</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary-light rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Ask Your Question</h4>
                <p className="text-neutral">Submit your legal query through our platform or WhatsApp</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-light rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">AI Analysis</h4>
                <p className="text-neutral">Our system analyzes your query and retrieves relevant legal information</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-light rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Get Your Answer</h4>
                <p className="text-neutral">Receive a comprehensive response with references to relevant laws and cases</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-primary mb-6">Important Disclaimer</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    The information provided by the Kenya Criminal Legal Agent Assistant is for general informational purposes only and should not be considered as legal advice. While we strive to provide accurate and up-to-date information, we make no warranties about the completeness, reliability, or accuracy of this information.
                  </p>
                  <p className="text-sm text-yellow-700 mt-2">
                    Any action you take based on the information provided by our service is strictly at your own risk. We strongly recommend consulting with a qualified legal professional for advice specific to your situation.
                  </p>
                </div>
              </div>
            </div>
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
