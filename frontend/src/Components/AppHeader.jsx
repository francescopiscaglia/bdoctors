import { NavLink } from "react-router-dom"
import logo from '/logo.jpg'

export default function AppHeader() {
    return (
        <>

            <header>
                <nav className="navbar navbar-expand-sm navbar-light">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarID"
                            aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarID">
                            <div className="navbar-nav d-flex justify-content-between align-items-center">
                                <NavLink to='/'><img src={logo} className='logo' alt="logo" /></NavLink>
                                <NavLink className='text-white text-decoration-none p-3' to="/">Home</NavLink>
                                <NavLink className='text-white text-decoration-none p-3' to="/search">Advanced Search</NavLink>
                                <NavLink className='text-white text-decoration-none p-3' to="/add">Add a Doctor</NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
