export default function AdvancedResearch() {
    return (
        <>
            <div className="container">
                <form className="row g-3 needs-validation mt-3">
                    <div className="col-md-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <select className="form-select" id="department" required>
                            <option>...</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};