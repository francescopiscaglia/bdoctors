import { Link } from "react-router-dom";

export default function DoctorCard({ filteredDoctors, loading }) {
    return (
        <>
            {/* cards */}
            <div className="mt-4">
                {!loading && filteredDoctors.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
                        {filteredDoctors.map((doctor) => (
                            <Link to={`/${doctor.slug}`} className="col mb-3 text-decoration-none" key={doctor.id}>
                                <div className="card shadow-sm">
                                    <img src="/default-doct.jpg" alt="default-dc" className="card-img-top" />

                                    <div className="card-body">
                                        <h5 className="card-title mb-0">
                                            {doctor.name} {doctor.last_name}
                                        </h5>
                                        <span className="badge mb-3">{doctor.department}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
};