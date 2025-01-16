export default function ReviewCard({ review }) {
    return (
        <div className="col">
            <div className="card mb-3" style={{ height: "200px" }}>
                <div className="card-body">
                    <div className="card-head d-flex justify-content-between">

                        <h5 className="card-title">{review.username}</h5>
                        {/* <button className="btn btn-outline-danger" data-index={review.id}>
                        <i className="bi bi-trash"></i>
                    </button> */}
                    </div>

                    <div className="details mb-2">
                        <strong>Vote:</strong>
                        <span className="text-warning ms-2">
                            {
                                Array.from({ length: review.rating }).map((_, index) => (
                                    <i key={index} className="bi bi-star-fill"></i>
                                ))
                            }

                            {
                                Array.from({ length: 5 - review.rating }).map((_, index) => (
                                    <i key={index} className="bi bi-star"></i>
                                ))
                            }
                        </span>
                    </div>
                    <p className="card-text review-body">
                        {review.review_text}
                    </p>
                </div>
            </div>
        </div>
    );
};