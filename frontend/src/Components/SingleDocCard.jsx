export default function SingleDocCard({ doctorDetails, doctorReviews }) {

    // cv static link
    const cvUrl = `http://localhost:3008/uploads/DOCTOR.pdf`; // works with link hardcoded to the crash course file

    const votes = doctorReviews.map(doctor => doctor.rating);

    // average
    let sum = 0;
    for (let i = 0; i < votes.length; i++) {
        sum += votes[i];
    };

    const average = sum / votes.length;


    return (
        <>
            {/* doctor card */}
            <div className="card my-4" style={{ maxWidth: "" }}>
                <div className="row g-0">

                    {/* name */}
                    <div className="col-md-4">
                        <img src="/default-doct.jpg" className="img-fluid rounded-start" alt={doctorDetails.name} />
                    </div>

                    {/* details */}
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="header mb-2">
                                <h5 className="card-title">{doctorDetails.name} {doctorDetails.last_name}</h5>
                                <span className="badge mb-3">{doctorDetails.department}</span>
                            </div>

                            {/* contacts */}
                            <div className="body">
                                <h5 className="card-text mb-2">Contacts</h5>
                                <p className="card-text mb-1"><span className="text-muted">Email: </span><i>{doctorDetails.email}</i></p>
                                <p className="card-text mb-1"><span className="text-muted">Phone: </span><i>{doctorDetails.phone_number}</i></p>
                                <p className="card-text "><span className="text-muted">Address: </span><i>{doctorDetails.address}</i></p>
                                <span className="badge text-bg-info mb-4">{
                                    average ? average.toFixed(1) : "0"
                                }/5</span>
                                <p className="card-text m-0"><span className="text-muted"></span>{doctorDetails.description}</p>
                            </div>

                            {/* cv preview */}
                            <div className="mt-4" style={{ fontSize: "14px" }}>
                                <a href={cvUrl} className="text-decoration-none" target="_blank">View my CV</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};