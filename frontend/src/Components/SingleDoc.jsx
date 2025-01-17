export default function SingleDoc({ doctor }) {
    return (
        <>
            <div className="container py-4">
                <div className="row g-0">

                    {/* name */}
                    <div className="col-xs-6 col-md-8">
                        <img src="/default-doct.jpg" alt={doctor.name} style={{ borderRadius: "5px 0 0 5px" }} />
                    </div>

                    {/* details */}
                    <div className="col details p-3" style={{ border: "1px solid lightgray", borderRadius: "0 5px 5px 0" }}>

                        <h4 className="card-title mb-2">{doctor.name} {doctor.last_name}</h4>
                        <p className="card-text mb-0">{doctor.department}</p>

                    </div>
                </div>
            </div>
        </>
    );
};