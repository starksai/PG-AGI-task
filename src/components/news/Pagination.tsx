interface PaginationProps {
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  totalResults: number;
}

export default function Pagination({
  page,
  handlePrevPage,
  handleNextPage,
  totalResults,
}: PaginationProps) {
  return (
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
        disabled={totalResults <= page * 10}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 dark:disabled:bg-gray-600"
      >
        Next
      </button>
    </div>
  );
}