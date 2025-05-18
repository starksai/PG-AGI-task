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

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
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
  );
}