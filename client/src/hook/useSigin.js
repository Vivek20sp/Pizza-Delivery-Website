import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import AuthContext from '../Context/AuthonicationContext';

const useSigin = () => {
    const [loading, setloading] = useState(false);
    const context = useContext(AuthContext);
    const { setauthToken } = context;

    const sigin = async (name, email, password, userType, phone, houseNo, address, city, state, pincode) => {
        setloading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, email: email, password: password, userType: userType, phone: phone, houseNo: houseNo, address: address, city: city, state: state, pincode: pincode }),
            });
            const data = await response.json();
            if (data.token === null || data.error !== null) {
                throw new Error(data.error);
            }
            localStorage.setItem('token', data.token);
            setauthToken(data.token);
            return data;

        } catch (error) {
            console.log(error.message);
            toast.error('Sign In Unsuccessful');
            return error.message;
        } finally {
            setloading(false);
        }
    }

    return { loading, sigin }
}

export default useSigin
