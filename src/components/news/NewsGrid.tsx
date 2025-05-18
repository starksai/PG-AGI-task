import ArticleCard from './ArticleCard';

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

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface NewsGridProps {
  newsData: { [key: string]: NewsResponse };
  selectedCategory: string | null;
  openModal: (article: Article) => void;
}

export default function NewsGrid({
  newsData,
  selectedCategory,
  openModal,
}: NewsGridProps) {
  return (
    <div>
      {Object.entries(newsData).map(([category, data]) => (
        <div key={category} className="mb-12">
          {!selectedCategory && (
            <h2 className="text-2xl font-semibold capitalize mb-4 text-gray-900 dark:text-white">
              {category} News
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.articles.map((article, index) => (
              <ArticleCard
                key={index}
                article={article}
                onClick={() => openModal(article)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}