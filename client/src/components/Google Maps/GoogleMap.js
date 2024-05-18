import React, { useContext, useEffect, useRef, useState } from "react";
import Map, { NavigationControl } from "react-map-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapContext from "../../Context/MapContext";

const MAPBOX_TOKEN = process.env.REACT_APP_CONNECTION_MAPBOX;

const GoogleMap = () => {
    const mapRef = useRef(null);
    const [directions, setDirections] = useState(null);
    const [mapReady, setMapReady] = useState(false);
    const mapContext = useContext(MapContext);
    const { Pincode, UserPincode } = mapContext;
    const userPin = UserPincode.toString();

    useEffect(() => {
        const initializeDirections = () => {
            const map = mapRef.current.getMap();
            const startCoordinates = Pincode;
            const endCoordinates = userPin;

            const directionsControl = new MapboxDirections({
                accessToken: MAPBOX_TOKEN
            });

            map.addControl(directionsControl, 'top-left');

            directionsControl.setOrigin(startCoordinates);
            directionsControl.setDestination(endCoordinates);

            setDirections(directionsControl);
        }; 

        if (mapReady && !directions) {
            initializeDirections();
        }
        // eslint-disable-next-line
    }, [mapReady,directions]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
            <Map
                ref={mapRef}
                onLoad={() => setMapReady(true)}
                initialViewState={{
                    longitude: 78.9629, // Center longitude of India
                    latitude: 20.5937, // Center latitude of India
                    zoom: 13,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <NavigationControl position={"top-right"} />
            </Map>
        </div>
    );
};

export default GoogleMap;
