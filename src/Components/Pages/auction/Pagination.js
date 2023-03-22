import React from "react";

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <>
      <div className="col-12">
        <ul className="pagination justify-content-center mt-4">
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item"}
          >
            <a
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              href="javascript:void();"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </a>
          </li>
          {pages.map((page, index) => {
            return (
              <li className={page === currentPage ? "page-item active" : ""}>
                <a
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className="page-link"
                  href="javascript:void();"
                >
                  {page}
                </a>
              </li>
            );
            // return <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? 'active' : ''}>{page}</button>;
          })}
          <li
            className={
              currentPage === pages.length - 0
                ? "page-item disabled"
                : "page-item"
            }
          >
            <a
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              href="javascript:void()"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Pagination;
