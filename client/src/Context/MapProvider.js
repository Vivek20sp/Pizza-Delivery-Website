import React, { useState } from 'react'
import MapContext from './MapContext'

const MapProvider = (props) => {
    const [Pincode, setPincode] = useState('');
    const [UserPincode, setUserPincode] = useState('')
    return (
        <MapContext.Provider value={{ Pincode, setPincode, UserPincode, setUserPincode }}>
            {props.children}
        </MapContext.Provider>
    )
}

export default MapProvider;
