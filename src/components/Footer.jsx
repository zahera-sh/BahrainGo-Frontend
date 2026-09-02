import { Link } from "react-router";
import "../styles/navFooter.css";

function Footer() {

    return (
        <footer>

            <div className='footerlinks'>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/about">About Us</Link>
                <Link to="/how">How to Use</Link>
                <Link to="/notrealpage">x</Link>
            </div>

            <div className='footercopyright'>
                <p>© 2026 Bahrain.Go!</p>
            </div>

        </footer>
    );

}

export default Footer;