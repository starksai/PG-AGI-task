"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const taglines = [
    "Stay Informed with News!",
    "Track Financial Markets!",
    "Check the Latest Weather!"
  ]

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

 
 

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev
      if (newTheme) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      return newTheme
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Hub</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* News Dashboard Card */}
          <div
            className="relative bg-cover bg-center rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-64"
            style={{ backgroundImage: "url('https://www.rgu.ac.uk/images/Research_Projects_Images/ResearchProjects2-agence-olloweb-520914-unsplash.jpg')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
              <h2 className="text-xl font-semibold mb-4 text-white drop-shadow-md">News Dashboard</h2>
              <p className="text-white mb-4 text-center drop-shadow-md">
                Stay updated with the latest news across various categories.
              </p>
              <Link href="/news">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Go to News
                </button>
              </Link>
            </div>
          </div>

          {/* Finance Dashboard Card */}
          <div
            className="relative bg-cover bg-center rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-64"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
              <h2 className="text-xl font-semibold mb-4 text-white drop-shadow-md">Finance Dashboard</h2>
              <p className="text-white mb-4 text-center drop-shadow-md">
                Track financial markets and economic updates.
              </p>
              <Link href="/finance">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Go to Finance
                </button>
              </Link>
            </div>
          </div>

          {/* Weather Dashboard Card */}
          <div
            className="relative bg-cover bg-center rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-64"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
              <h2 className="text-xl font-semibold mb-4 text-white drop-shadow-md">Weather Dashboard</h2>
              <p className="text-white mb-4 text-center drop-shadow-md">
                Check the latest weather updates and forecasts.
              </p>
              <Link href="/weather">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Go to Weather
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation for Tagline */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </div>
  )
}