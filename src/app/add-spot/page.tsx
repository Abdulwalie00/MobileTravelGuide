"use client";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Link from "next/link";
import {TouristSpot} from "../../../types/TouristSpot";

export default function AddSpot() {
    const [formData, setFormData] = useState<Omit<TouristSpot, "Attraction_Id">>({
        Name: "",
        Location: "",
        Description: "",
        Attraction_inquiry_id: "",
        Municipality_id: "",
        Rating: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addDoc(collection(db, "touristSpots"), formData);
        alert("Spot added successfully!");
        setFormData({
            Name: "",
            Location: "",
            Description: "",
            Attraction_inquiry_id: "",
            Municipality_id: "",
            Rating: 0,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                Add New Tourist Spot
            </h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.Name}
                            onChange={(e) =>
                                setFormData({ ...formData, Name: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            placeholder="Location"
                            value={formData.Location}
                            onChange={(e) =>
                                setFormData({ ...formData, Location: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            placeholder="Description"
                            value={formData.Description}
                            onChange={(e) =>
                                setFormData({ ...formData, Description: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Inquiry ID</label>
                        <input
                            type="text"
                            placeholder="Inquiry ID"
                            value={formData.Attraction_inquiry_id}
                            onChange={(e) =>
                                setFormData({ ...formData, Attraction_inquiry_id: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Municipality ID</label>
                        <input
                            type="text"
                            placeholder="Municipality ID"
                            value={formData.Municipality_id}
                            onChange={(e) =>
                                setFormData({ ...formData, Municipality_id: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Rating</label>
                        <input
                            type="number"
                            placeholder="Rating"
                            value={formData.Rating}
                            onChange={(e) =>
                                setFormData({ ...formData, Rating: parseFloat(e.target.value) })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <Link
                        href="/"
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Add Spot
                    </button>
                </div>
            </form>
        </div>
    );
}
