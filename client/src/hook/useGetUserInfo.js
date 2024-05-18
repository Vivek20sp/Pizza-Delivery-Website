import { useState } from 'react';

const useGetUserInfo = () => {
    const [loading, setloading] = useState(false);
    const authToken = localStorage.getItem('token');
    const userInfo = async () => {
        try {
            setloading(true);
            const response = await fetch('http://localhost:5000/api/auth/getUserInfo', {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                },
            });
            const data = await response.json();

            if (!data && data.error !== null) {
                throw new Error(data.error);
            }

            return data.user;
        } catch (error) {
            console.log(error.message);
            return error.message;
        } finally {
            setloading(false);
        }
    }
    return { loading, userInfo }
}

export default useGetUserInfo
