import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Results() {
  // Mock query result data
  const [queryResult, setQueryResult] = useState({
    id: 'q-123456',
    query: 'What are the legal requirements for bail in Kenya?',
    status: 'completed',
    created_at: '2025-04-02T14:30:00Z',
    answer: `
      In Kenya, the legal requirements for bail are primarily governed by the Constitution of Kenya 2010, the Criminal Procedure Code, and the Bail and Bond Policy Guidelines.
      
      The key requirements include:
      
      1. **Constitutional Right**: Article 49(1)(h) of the Constitution of Kenya 2010 provides that an arrested person has the right to be released on bond or bail on reasonable conditions, pending a charge or trial, unless there are compelling reasons not to be released.
      
      2. **Factors Considered by Courts**:
         - The nature and seriousness of the offense
         - The strength of the prosecution's case
         - The character, antecedents, associations, and community ties of the accused
         - The accused's record in respect of fulfilling obligations under previous bail grants
         - The likelihood of the accused interfering with witnesses
         - The need to protect the victim(s) of the crime
         
      3. **Bail Application Process**:
         - The application can be made orally or in writing
         - The accused must provide personal details including fixed abode
         - Sureties may be required, who must demonstrate ability to pay the bail amount if the accused absconds
         
      4. **Bail Terms**:
         - Cash bail (money deposited with the court)
         - Bond (promise to pay if the accused fails to appear)
         - Personal recognizance (release on own promise to appear)
         
      5. **Compelling Reasons for Denial**:
         - Risk of flight
         - Risk of interfering with witnesses
         - Risk of committing other offenses
         - Protection of the accused from harm
         
      It's important to note that for certain serious offenses like murder, terrorism, and robbery with violence, the threshold for granting bail is higher, though not impossible.
    `,
    references: [
      {
        title: 'Constitution of Kenya',
        section: 'Article 49(1)(h)',
        text: 'An arrested person has the right to be released on bond or bail, on reasonable conditions, pending a charge or trial, unless there are compelling reasons not to be released.'
      },
      {
        title: 'Criminal Procedure Code',
        section: 'Section 123',
        text: 'When any person, other than a person accused of murder, treason, robbery with violence, attempted robbery with violence and any related offence is arrested or detained without warrant by an officer in charge of a police station, or appears or is brought before a court, and is prepared at any time while in the custody of that officer or at any stage of the proceedings before that court to give bail, that person may be admitted to bail.'
      },
      {
        title: 'Bail and Bond Policy Guidelines',
        section: 'Section 4.3',
        text: 'The Constitution provides that an arrested person has the right "to be released on bond or bail, on reasonable conditions, pending a charge or trial, unless there are compelling reasons not to be released."'
      }
    ],
    case_laws: [
      {
        case_number: 'Criminal Appeal No. 32 of 2000',
        case_name: 'Dominic Karanja v Republic',
        summary: 'The Court of Appeal held that the right to bail is not absolute and can be limited where there are compelling reasons.'
      },
      {
        case_number: 'Misc. Criminal Application No. 21 of 2019',
        case_name: 'Republic v Joseph Irungu & Another',
        summary: 'The High Court outlined factors to be considered in determining whether to grant bail, including the nature of charges, the strength of the prosecution case, and the character of the accused.'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Query Results | Kenya Criminal Legal Agent Assistant</title>
        <meta name="description" content="Legal query results from Kenya Criminal Legal Agent Assistant" />
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
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">Query Results</h2>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {queryResult.status}
              </span>
            </div>
            <p className="text-neutral-light mt-2">
              Query ID: {queryResult.id} • Submitted: {new Date(queryResult.created_at).toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Your Question</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-neutral">{queryResult.query}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Answer</h3>
            </div>
            <div className="px-6 py-4">
              <div className="prose max-w-none">
                {queryResult.answer.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Legal References</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-6">
                {queryResult.references.map((reference, index) => (
                  <div key={index} className="border-l-4 border-primary-light pl-4">
                    <h4 className="font-bold text-neutral">{reference.title}</h4>
                    <p className="text-sm text-neutral-light mb-2">{reference.section}</p>
                    <p className="text-neutral">{reference.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Relevant Case Law</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-6">
                {queryResult.case_laws.map((case_law, index) => (
                  <div key={index} className="border-l-4 border-secondary-light pl-4">
                    <h4 className="font-bold text-neutral">{case_law.case_name}</h4>
                    <p className="text-sm text-neutral-light mb-2">{case_law.case_number}</p>
                    <p className="text-neutral">{case_law.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="btn btn-primary">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download as PDF
            </button>
            
            <button className="btn btn-outline">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Ask a Follow-up Question
            </button>
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-primary mb-4">Need Further Assistance?</h3>
            <p className="mb-4">Connect with us directly through WhatsApp for personalized legal guidance:</p>
            <div className="flex items-center justify-center space-x-6">
              <img src="/shared_qr_code.png" alt="WhatsApp QR Code" className="w-32 h-32" />
              <a href="https://wa.me/254778401063" className="btn btn-primary flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
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
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382
(Content truncated due to size limit. Use line ranges to read in chunks)