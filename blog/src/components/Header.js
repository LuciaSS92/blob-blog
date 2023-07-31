import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="container-fluid  d-flex justify-content-center mt-3">
                <h1 id="header">The Blob() Blog</h1>
            </header>
            <nav id="nav" className="navbar d-flex justify-content-center ">
                <ul className="row ">
                    <li className="col btn btn-lg btn-secondary me-2"><Link className="link" to="/"> 🏠</Link></li>
                    <li className="col btn btn-lg btn-secondary me-2"><Link className="link" to="post">✒</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Header