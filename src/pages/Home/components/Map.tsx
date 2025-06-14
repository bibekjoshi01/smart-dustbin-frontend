import { useEffect, useState } from "react";
import { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import Loader from "@/components/Loader";
import BinHoverCard from "./BinHoverCard";
import { useNavigate } from "react-router-dom";
import { binData as bins, BIN } from "../constants/data";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface BinMapProps {
    range: 'today' | 'month' | 'year';
}

// Marker icon
const binIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// User icon
const userIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
});

// Status to color mapping
const statusColorMap: Record<string, string> = {
    full: "#e53935", // red
    normal: "#fb8c00", // orange
    empty: "#43a047" // green
};

export default function BinMap({ range }: BinMapProps) {
    const navigate = useNavigate();
    const [hoveredBin, setHoveredBin] = useState<BIN | null>(null);
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserPosition([latitude, longitude]);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setUserPosition([27.6712, 85.335]); // fallback
                }
            );
        }
    }, []);

    if (!userPosition) return <Loader />;

    return (
        <Box sx={{ width: "100%", height: "500px", mt: -2, p: 3 }}>
            <MapContainer
                center={userPosition}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User */}
                <Marker position={userPosition} icon={userIcon}>
                    <Popup>You are here</Popup>
                </Marker>

                {/* Bins */}
                {bins.map((b) => {
                    const status = b[range].status || "empty";
                    const circleIcon = divIcon({
                        html: `<div style="
                            width: 40px;
                            height: 40px;
                            background-color: ${statusColorMap[status]};
                            border-radius: 50%;
                            opacity: 0.4;
                            transform: translate(-15px, -15px);
                        "></div>`,
                        className: "",
                    });

                    return (
                        <>
                            <Marker
                                key={`circle-${b.id}`}
                                position={[b.latitude, b.longitude]}
                                icon={circleIcon}
                                interactive={false}
                            />
                            <Marker
                                key={`bin-${b.id}`}
                                position={[b.latitude, b.longitude]}
                                icon={binIcon}
                                eventHandlers={{
                                    click: () => navigate(`/${b.id}`),
                                    mouseover: () => setHoveredBin(b),
                                    mouseout: () => setHoveredBin(null),
                                }}
                            />
                        </>
                    );
                })}

                {/* Hover Card */}
                {hoveredBin && <BinHoverCard bin={hoveredBin} />}
            </MapContainer>
        </Box>
    );
}
