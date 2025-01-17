export default function Inpagination({ currentPage, totalPages, handlePageChange }) {
    return (
        <>
            <nav aria-label="Pagination" >
                <ul className="pagination justify-content-center mt-4" >

                    {/* Pulsante "Back" */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`} >
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ fontSize: "12px" }}
                        >
                            Back
                        </button>
                    </li>

                    {/* Numeri di pagina */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button
                                className="page-link bg-danger"
                                onClick={() => handlePageChange(index + 1)}
                                style={{ fontSize: "12px" }}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    {/* Pulsante "Next" */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            style={{ fontSize: "12px" }}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};