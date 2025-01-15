export default function SingleDocCard({ doctorDetails }) {
    return (
        <>
            {/* doctor card */}
            <div className="card my-4" style={{ maxWidth: "" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="/default-doct.jpg" className="img-fluid rounded-start" alt={doctorDetails.name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="header mb-2">
                                <h5 className="card-title">{doctorDetails.name} {doctorDetails.last_name}</h5>
                                <span className="badge mb-3">{doctorDetails.department}</span>
                            </div>

                            <div className="body">
                                <h5 className="card-text mb-2">Contacts</h5>
                                <p className="card-text mb-1"><span className="text-muted">Email: </span><i>{doctorDetails.email}</i></p>
                                <p className="card-text mb-1"><span className="text-muted">Phone: </span><i>{doctorDetails.phone_number}</i></p>
                                <p className="card-text mb-4"><span className="text-muted">Address: </span><i>{doctorDetails.address}</i></p>
                                <p className="card-text m-0"><span className="text-muted"></span>{doctorDetails.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};