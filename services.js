import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Services | Kenya Criminal Legal Agent Assistant</title>
        <meta name="description" content="Explore the services offered by Kenya Criminal Legal Agent Assistant" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-lg text-neutral-light max-w-3xl mx-auto">
              We provide AI-powered legal assistance to help you navigate Kenya's criminal justice system with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="p-6">
                <div className="w-12 h-12 rounded-md bg-primary-light flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Legal Queries</h3>
                <p className="text-neutral mb-4">
                  Get answers to your criminal law questions based on Kenyan legislation, case law, and legal procedures.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Instant answers to legal questions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>References to relevant laws and cases</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Procedural guidance and explanations</span>
                  </li>
                </ul>
                <Link href="/query" className="btn btn-primary w-full">Ask a Question</Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="p-6">
                <div className="w-12 h-12 rounded-md bg-primary-light flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Document Review</h3>
                <p className="text-neutral mb-4">
                  Upload legal documents for analysis, explanation, and guidance on how to respond or proceed.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Analysis of charge sheets and court orders</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Explanation of legal terminology</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Guidance on next steps and responses</span>
                  </li>
                </ul>
                <Link href="/documents" className="btn btn-primary w-full">Upload Document</Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="p-6">
                <div className="w-12 h-12 rounded-md bg-primary-light flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">WhatsApp Assistance</h3>
                <p className="text-neutral mb-4">
                  Connect with our legal assistant directly through WhatsApp for convenient and accessible support.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 access to legal information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Send documents and queries via chat</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Receive responses in simple language</span>
                  </li>
                </ul>
                <a href="https://wa.me/254778401063" className="btn btn-primary w-full flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6">How Our Services Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary-light rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Submit Your Query</h4>
                <p className="text-neutral">Ask a legal question or upload a document for review</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-light rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">AI Analysis</h4>
                <p className="text-neutral">Our system analyzes your query using Kenyan legal databases</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-light rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Expert Review</h4>
                <p className="text-neutral">Complex queries are reviewed for accuracy and completeness</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-light rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">4</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Receive Response</h4>
                <p className="text-neutral">Get a comprehensive answer with legal references and guidance</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-primary mb-4">For Individuals</h3>
              <p className="text-neutral mb-4">
                Our services are designed to help individuals navigate the complexities of Kenya's criminal justice system, whether you're facing charges, have been arrested, or simply need to understand your rights.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Understand your legal rights and options</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Get guidance on bail applications and appeals</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Learn about court procedures and what to expect</span>
                </li>
              </ul>
              <Link href="/query" className="btn btn-outline">Get Started</Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-primary mb-4">For Family Members</h3>
              <p className="text-neutral mb-4">
                If you have a family member involved in the criminal justice system, our services can help you understand their situation and how you can support them effectively.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Understand visitation rights and procedures</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Learn about bail and bond processes</span>
       
(Content truncated due to size limit. Use line ranges to read in chunks)