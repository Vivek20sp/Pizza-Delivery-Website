import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../Context/AuthonicationContext';

const useLoginIn = () => {
    const [loading, setloading] = useState(false);
    const context = useContext(AuthContext);
    const { setauthToken } = context;
    const login = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, email: email, password: password }),
            });
            const data = await response.json();
            
            if (!data  && data.error!==null) {
                throw new Error(data.error);
            }
            localStorage.setItem('token', data.token);
            
            setauthToken(data.token);
            
            return data;

        } catch (error) {
            console.log(error.message);
            toast.error('Sign In Unsuccessful');
        } finally {
            setloading(false);
        }
    };
    return { loading, login }
}

export default useLoginIn
