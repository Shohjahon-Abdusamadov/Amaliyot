import { Link } from "react-router-dom"


const Header = ({ title }) => {
    return (
        <header className="Header">
            <Link style={{fontSize: "1.5rem", textDecoration: "none", color: "black"}} to="/">{title}</Link>
        </header>
    )
}

export default Header
