import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";//MapContainer will the container for our map. TileLayer will openly display map tiles from openstreetmap.org

function LeafLetMap(){
    <MapContainer center={[52.505, -0.09]} zoom={13} scrollWheelZoom={true}> 
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>
}

export {LeafLetMap};