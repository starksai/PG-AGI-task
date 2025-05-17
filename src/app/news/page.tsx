"use client"

import { fetchAllCategories, fetchNews } from "@/services/newsService"
import { useEffect, useState } from "react"

// Define TypeScript interface for news article
interface Article {
  source: { id: string | null; name: string }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

// Interface for API response
interface NewsResponse {
  status: string
  totalResults: number
  articles: Article[]
}

export default function NewsDashboard() {
  const [newsData, setNewsData] = useState<{ [key: string]: NewsResponse } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const categories = ['technology', 'sports', 'business', 'health', 'entertainment']

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

  // Fetch news data
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        if (selectedCategory) {
          const res = await fetchNews(selectedCategory, page)
          setNewsData({ [selectedCategory]: res })
        } else {
          const res = await fetchAllCategories(page)
          setNewsData(res)
        }
        setError(null)
      } catch (err) {
        setError("Failed to fetch news. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [selectedCategory, page])

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setPage(1) // Reset page when changing category
  }

  const handleNextPage = () => {
    setPage(prev => prev + 1)
  }

  const handlePrevPage = () => {
    setPage(prev => Math.max(1, prev - 1))
  }

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

  const openModal = (article: Article) => {
    setSelectedArticle(article)
  }

  const closeModal = () => {
    setSelectedArticle(null)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News Dashboard</h1>
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-md ${
              !selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md capitalize ${
                selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center">
            <p className="text-lg text-gray-900 dark:text-white">Loading news...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && newsData && (
          <div>
            {Object.entries(newsData).map(([category, data]) => (
              <div key={category} className="mb-12">
                {!selectedCategory && (
                  <h2 className="text-2xl font-semibold capitalize mb-4 text-gray-900 dark:text-white">{category} News</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.articles.map((article: Article, index: number) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => openModal(article)}
                    >
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
                          {article.description || "No description available"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          By {article.author || "Unknown"} |{" "}
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 dark:disabled:bg-gray-600"
              >
                Previous
              </button>
              <span className="self-center text-gray-900 dark:text-white">Page {page}</span>
              <button
                onClick={handleNextPage}
                disabled={newsData && Object.values(newsData)[0].totalResults <= page * 10}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 dark:disabled:bg-gray-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {selectedArticle && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedArticle.title}</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {selectedArticle.urlToImage && (
                  <img
                    src={selectedArticle.urlToImage}
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedArticle.description || "No description available"}</p>
                <p className="text-gray-800 dark:text-gray-200 mb-4">{selectedArticle.content || "No additional content available"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  By {selectedArticle.author || "Unknown"} | {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Source: {selectedArticle.source.name}</p>
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Read full article
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}