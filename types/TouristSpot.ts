export interface TouristSpot {
    Attraction_Id: string;
    Name: string;
    Location: string;
    Description: string;
    Attraction_inquiry_id: string;
    Municipality_id: string;
    Rating: number;
    Image_URL?: string; // Optional field for the image URL
}
