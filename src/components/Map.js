import {useState} from 'react'; 

import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker'; 
import LocationInfoBox from './LocationInfoBox'; 

const Map = ({eventData, center, zoom}) => {

    const [locationInfo, setLocationInfo] = useState(null); 


    const markers = eventData.map( ev => {
        if((ev.categories[0].id === 15 ||  ev.categories[0].id === 8  || ev.categories[0].id === 12) &&  ev.id !== "EONET_354" ){
            return <LocationMarker 
                        key={ev.id}
                        lat={ev.geometries[0].coordinates[1]} 
                        lng={ev.geometries[0].coordinates[0]}
                        categoryId={ev.categories[0].id}
                        onClick={() => setLocationInfo({id: ev.id, title: ev.title})}
                    />
        }
        return null; 
    }); 

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyDeg6-zXMtN34n6UYti4kAtUe-eUZKrYRw"}}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {markers}
            </GoogleMapReact>

            {locationInfo && <LocationInfoBox info={locationInfo}/>}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat:  -33.4513,
        lng:  -70.6653
    }, 
    zoom:3
}

export default Map
