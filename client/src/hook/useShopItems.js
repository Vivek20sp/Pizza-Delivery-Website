import React, { useState } from 'react'

const useShopItems = () => {
  const [loading, setloading] = useState(false);
  const fetchItems = async () => {
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
        if(data.length===0 && data.error!==null){
            throw new Error('Internal Error Occurred')
        }
        return data;

    } catch (error) {
        console.log(error.message);
        return error.message;
    } finally {
        setloading(false);
    }
  }
  return {loading,fetchItems}
}

export default useShopItems
