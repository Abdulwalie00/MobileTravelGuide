"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link";
import {TouristSpot} from "../../types/TouristSpot";

export default function Home() {
    const [spots, setSpots] = useState<TouristSpot[]>([]);

    useEffect(() => {
        const fetchSpots = async () => {
            const querySnapshot = await getDocs(collection(db, "touristSpots"));
            const spotsData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                Attraction_Id: doc.id,
            })) as TouristSpot[];
            setSpots(spotsData);
        };
        fetchSpots();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                Tourist Spots
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spots.map((spot) => (
                    <div
                        key={spot.Attraction_Id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">{spot.Name}</h2>
                        <p className="text-gray-600 mt-2">{spot.Location}</p>
                        <p className="text-gray-700 mt-2">{spot.Description}</p>
                        <p className="text-yellow-500 mt-2">Rating: {spot.Rating}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Link
                    href="/add-spot"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Add New Spot
                </Link>
            </div>
        </div>
    );
}
