import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import { Box } from "@mui/material";
import { BIN } from "../Home/constants/data";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import BinHoverCard from "../Home/components/BinHoverCard";

// Marker icons
const binIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const userIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
});

// RoutingControl component
function RoutingControl({ from, to }: { from: [number, number]; to: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        const control = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
            routeWhileDragging: true,
            addWaypoints: false,
        }).addTo(map);

        return () => {
            control.remove();
        };
    }, [from, to, map]);

    return null;
}

export default function MapDetailed({ bin }: { bin: BIN }) {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const [hoveredBin, setHoveredBin] = useState<BIN | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserPosition([latitude, longitude]);
                },
                (error) => {
                    console.error("User location error:", error);
                    setUserPosition([27.6712, 85.335]);
                }
            );
        }
    }, []);

    if (!userPosition) return <Loader />;

    return (
        <Box sx={{ width: "100%", height: 500, my: 4, p: 3 }}>
            <MapContainer
                center={[bin.latitude, bin.longitude]}
                zoom={17}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User Marker */}
                <Marker position={userPosition} icon={userIcon}>
                    <Popup>You are here</Popup>
                </Marker>

                {/* Bin Marker */}
                <Marker
                    key={bin.id}
                    position={[bin.latitude, bin.longitude]}
                    icon={binIcon}
                    eventHandlers={{
                        click: () => navigate(`/${bin.id}`),
                        mouseover: () => setHoveredBin(bin),
                        mouseout: () => setHoveredBin(null),
                    }}
                />

                {/* Hover Card */}
                {hoveredBin && <BinHoverCard bin={hoveredBin} />}

                {/* Routing from user to bin */}
                <RoutingControl from={userPosition} to={[bin.latitude, bin.longitude]} />
            </MapContainer>
        </Box>
    );
}
