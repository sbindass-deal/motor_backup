import React from 'react'

function SearchModal() {
  return (
    // <!-- The Search Modal -->
    <div className="modal fade searchModal" id="myModal">
        <button type="button" className="close" data-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
        <div className="modal-dialog modal-xl modal-dialog-centered">
            
            <div className="modal-content">			
                {/* <!-- Modal body --> */}
                <div className="modal-body">
                    <form className="searchForm">
                        <input type="text" name="" placeholder="Search..."/>
                        <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchModal