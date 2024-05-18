import { useState } from 'react'

const useGetProductById = () => {
    const [loading, setloading] = useState(false);
    const item = async (id) => {
        try {
            setloading(true);
            const response = await fetch(`http://localhost:4000/api/uploadImage/getImage/${id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!data && data.error !== null) {
                throw new Error(data.error);
            }
            return data;
        } catch (error) {
            console.log(error.message);
            return error.message;
        } finally {
            setloading(true);
        }
    }
    return { item, loading };
}

export default useGetProductById
