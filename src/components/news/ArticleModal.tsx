import React from "react";

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface ArticleModalProps {
  article: Article | null;
  closeModal: () => void;
}

export default function ArticleModal({ article, closeModal }: ArticleModalProps) {
  if (!article) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {article.title}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          )}
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {article.description || "No description available"}
          </p>
          <p className="text-gray-800 dark:text-gray-200 mb-4">
            {article.content || "No additional content available"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            By {article.author || "Unknown"} |{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Source: {article.source.name}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 dark:text-blue-400 hover:underline"
          >
            Read full article
          </a>
        </div>
      </div>
    </div>
  );
}