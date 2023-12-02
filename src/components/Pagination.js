import PropTypes from "prop-types";

import "../App.css";

const Pagination = (props) => {
  const {  usersLength, setPage, page,selectedUsersCount } = props;

  const getTotalPages = (length) => {
    return Math.ceil(length / 10);
  };
  const totalPages = getTotalPages(usersLength);
  const changePage = (index) => {
    setPage(index);
  };

  const navigatePage = (index) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }
    setPage(index);
  };

  return (
    <div className="paginationContainer">
        <p className="text-gray-700 mb-2">
      Selected {selectedUsersCount} out of {usersLength} entries | Page {page} of {totalPages}
    </p>

      {usersLength > 0 && (
        <nav aria-label="Page navigation">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={() => navigatePage(1)}
                disabled={page === 1}
                className={`first-page flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === 1 ? "cursor-not-allowed" : ""
                }`}
              >
                First Page
              </button>
            </li>
            <li>
              <button
                onClick={() => navigatePage(page - 1)}
                disabled={page === 1}
                className={`previous-page flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === 1 ? "cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i + 1}>
                <button
                  onClick={() => changePage(i + 1)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    page === i + 1
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white font-bold"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigatePage(page + 1)}
                disabled={page === totalPages}
                className={`next-page flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === totalPages ? "cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </li>
            <li>
              <button
                onClick={() => navigatePage(totalPages)}
                disabled={page === totalPages}
                className={`last-page flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === totalPages ? "cursor-not-allowed" : ""
                }`}
              >
                Last Page
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

Pagination.propTypes = {
  usersLength: PropTypes.number,
  setPage: PropTypes.func,
  page: PropTypes.number,
  deleteSelected: PropTypes.func,
};

export default Pagination;
