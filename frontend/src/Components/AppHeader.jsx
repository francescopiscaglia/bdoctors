import { NavLink } from "react-router-dom"
import logo from '/logo.jpg';
import logo2 from '/2.png';

export default function AppHeader() {
    return (
        <>

            <header>
                <div className="container">
                    <nav className="navbar navbar-expand-sm navbar-light">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarID"
                                aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarID">
                                <div className="navbar-nav d-flex  align-items-center justify-content-between">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="left">
                                            <NavLink to='/'>
                                                <img src={logo2} className='logo' alt="logo" />
                                            </NavLink>

                                        </div>

                                        <div className="right">
                                            <NavLink className='text-decoration-none p-3 m-0' to="/">
                                                <i class="bi bi-house"></i>
                                            </NavLink>
                                            <NavLink className='text-decoration-none p-3 m-0' to="/search">
                                                <i class="bi bi-search"></i>
                                            </NavLink>
                                            <NavLink className='text-decoration-none p-3 m-0' to="/add">
                                                <i class="bi bi-plus-circle"></i>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
