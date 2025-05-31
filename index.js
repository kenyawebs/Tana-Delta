import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Kenya Criminal Legal Agent Assistant</title>
        <meta name="description" content="Legal assistance for criminal law cases in Kenya" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Sureintel Logo" className="h-10 w-auto" />
            <h1 className="ml-3 text-xl font-bold text-primary">Kenya Criminal Legal Agent</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-primary-dark font-medium">Home</Link></li>
              <li><Link href="/services" className="text-neutral hover:text-primary font-medium">Services</Link></li>
              <li><Link href="/about" className="text-neutral hover:text-primary font-medium">About</Link></li>
              <li><Link href="/contact" className="text-neutral hover:text-primary font-medium">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-white">Navigate Kenya's Criminal Law System with Confidence</h2>
                <p className="text-lg mb-6">Our AI-powered legal assistant provides guidance, document generation, and support for criminal law cases in Kenya.</p>
                <div className="flex space-x-4">
                  <Link href="/query" className="btn btn-secondary">Ask a Legal Question</Link>
                  <Link href="/documents" className="btn btn-outline bg-transparent border-white text-white hover:bg-white hover:text-primary">Upload Documents</Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img src="/legal-jargon.webp" alt="Legal Assistance" className="rounded-lg shadow-lg max-h-80" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card hover:shadow-lg transition-shadow">
                <img src="/document-review.webp" alt="Document Review" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Document Review</h3>
                  <p className="text-neutral-light mb-4">Upload legal documents for analysis and get expert insights on their implications.</p>
                  <Link href="/documents" className="text-primary font-medium hover:text-primary-dark">Learn more →</Link>
                </div>
              </div>
              
              <div className="card hover:shadow-lg transition-shadow">
                <img src="/ai-services.webp" alt="AI Legal Assistance" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">AI Legal Assistance</h3>
                  <p className="text-neutral-light mb-4">Get answers to your legal questions using our advanced AI-powered legal assistant.</p>
                  <Link href="/query" className="text-primary font-medium hover:text-primary-dark">Learn more →</Link>
                </div>
              </div>
              
              <div className="card hover:shadow-lg transition-shadow">
                <img src="/expertise.webp" alt="Legal Expertise" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Legal Expertise</h3>
                  <p className="text-neutral-light mb-4">Access a comprehensive database of Kenyan criminal law statutes and case precedents.</p>
                  <Link href="/resources" className="text-primary font-medium hover:text-primary-dark">Learn more →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Integration Section */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Connect via WhatsApp</h2>
                <p className="text-lg mb-6">Get legal assistance directly through WhatsApp. Simply scan the QR code or click the button below to start a conversation.</p>
                <a href="https://wa.me/254778401063" className="btn btn-primary flex items-center justify-center w-48">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
              <div className="flex justify-center">
                <img src="/shared_qr_code.png" alt="WhatsApp QR Code" className="max-w-xs" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <div className="p-6">
                  <p className="italic mb-4">"Finding SureIntel was a lifesaver for me and my family. Their team provided invaluable support and guidance throughout my legal ordeal, from ensuring clear communication with my loved ones to advocating for my rights within the system."</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">BS</div>
                    <div className="ml-4">
                      <h4 className="font-bold">Belinda Shakinga</h4>
                      <p className="text-sm text-neutral-light">Client</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="p-6">
                  <p className="italic mb-4">"I can't thank SureIntel enough for their dedicated assistance during a difficult time. Their meticulous review of the processes ahead of time gave me confidence in my case, and their personalized support helped alleviate much of the stress."</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">MW</div>
                    <div className="ml-4">
                      <h4 className="font-bold">Mark Wanjau</h4>
                      <p className="text-sm text-neutral-light">Client</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-dark text-white py-12">
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
