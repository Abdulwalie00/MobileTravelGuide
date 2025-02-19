"use client";
import React, { useState } from "react";
import {addDoc, collection, updateDoc} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Link from "next/link";
import { TouristSpot } from "../../../types/TouristSpot";

export default function AddSpot() {
    const [formData, setFormData] = useState<Omit<TouristSpot, "Attraction_Id" | "Image_Base64">>({
        Name: "",
        Location: "",
        Description: "",
        Attraction_inquiry_id: "",
        Municipality_id: "",
        Rating: 0,
        Image_Base64: "", // Add this line to track the base64 encoded image
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setFormData({ ...formData, Image_Base64: reader.result.toString().split(',')[1] });
                }
            };
            reader.readAsDataURL(file);
        }
        setImageFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageFile) {
            alert("Please select an image.");
            return;
        }

        try {
            // Add a new document to the "touristSpots" collection
            const docRef = await addDoc(collection(db, "touristSpots"), {
                ...formData,
            });

            // Use the auto-generated document ID as the Attraction_Id
            const attractionId = docRef.id;

            // Optionally, you can update the document to include the Attraction_Id
            await updateDoc(docRef, {
                Attraction_Id: attractionId,
            });

            alert("Spot added successfully!");
            setFormData({
                Name: "",
                Location: "",
                Description: "",
                Attraction_inquiry_id: "",
                Municipality_id: "",
                Rating: 0,
                Image_Base64: "", // Reset image base64
            });
            setImageFile(null); // Clear the image file state
        } catch (error) {
            console.error("Error adding spot:", error);
            alert("Failed to add spot.");
        }
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
                    <div>
                        <label className="block text-gray-700">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
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
