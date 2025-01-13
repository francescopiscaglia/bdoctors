export default function Homepage() {

    fetch('http://localhost:3008/api/doctors')
        .then(res => res.json())
        .then(data => {
            console.log('data', data)
        })

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}