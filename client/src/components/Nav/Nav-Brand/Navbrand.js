import './NavBrand.css'
import { Link } from 'react-router-dom';
import logoMain from '../../../asset/img/pizza-high-resolution-logo.png';

const NavBrand = () => {
    return (
        <div href="#home" className='navbrand__container'>
            <h1 className='navbrand'>
                <Link to="/" style={{height:"80px",width:"120px",marginTop:"20px",borderRadius:"10px"}}>
                    <img src={logoMain} height='80px' width='120px' alt="Logo" />
                </Link>
            </h1>
        </div>
    );
}

export default NavBrand;