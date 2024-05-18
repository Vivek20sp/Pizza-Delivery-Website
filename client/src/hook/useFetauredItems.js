import { useEffect, useState } from 'react'

const useFetauredItems = () => {
    const [loading, setloading] = useState(false);
    const [itemsData, setitemsData] = useState('')

    useEffect(() => {
        const items = async () => {
            try {
                setloading(true);
                const response = await fetch('http://localhost:4000/api/uploadImage/getAllImages', {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setitemsData(data);
            } catch (error) {
                console.log(error.message);

            } finally {
                setloading(false);
            }
        }
        if (itemsData.length === 0) {
            items();
        }
    }, [itemsData]);

    return { loading, itemsData }
}

export default useFetauredItems
