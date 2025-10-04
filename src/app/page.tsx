"use client";

import { useSearchParams } from "next/navigation";

import DestinationCarousel, {
  sampleDestinations,
} from "@/components/DestinationCarousel";
import Footer from "@/components/Footer";
import EnhancedSearchBox from "@/components/EnhancedSearchBox";

export default function Home() {
  const searchParams = useSearchParams();
  const hasSearchParams =
    searchParams.get("location") ||
    searchParams.get("checkIn") ||
    searchParams.get("checkOut");

  // If user has searched, show a simplified results view
  if (hasSearchParams) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Search Results
          </h1>
          <p className="text-gray-600">
            Results for your search will appear here. This is a demo showing the
            homepage structure.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  // Default homepage layout
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Hero Section with Search */}
      <div className="relative bg-white">
        {/* Main Search Area */}
        <div className="pt-6 pb-12">
          <EnhancedSearchBox
            onSearch={(data: unknown) => {
              // Handle search functionality
              console.log("Search data:", data);
            }}
          />
        </div>
      </div>

      {/* Destination Carousels */}
      <main className="bg-white">
        {sampleDestinations.map((destination, index) => (
          <DestinationCarousel
            key={index}
            title={destination.title}
            properties={destination.properties}
          />
        ))}

        {/* Additional destination sections to match the real Airbnb */}
        <DestinationCarousel
          title="Stay in London"
          properties={[
            {
              id: "london1",
              title: "Room in Hackney",
              location: "£15 for 3 nights • 4.60",
              images: [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720&h=720&fit=crop",
              ],
              rating: 4.6,
              reviewCount: 85,
              price: 15,
              nights: 3,
              isGuestFavorite: false,
            },
            {
              id: "london2",
              title: "Room in Hill Park",
              location: "£15 for 3 nights • 4.79",
              images: [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
              ],
              rating: 4.79,
              reviewCount: 92,
              price: 15,
              nights: 3,
              isGuestFavorite: true,
            },
          ]}
        />

        <DestinationCarousel
          title="Available next month in Toronto"
          properties={[
            {
              id: "toronto1",
              title: "Room in Mississauga Village",
              location: "$32 for 5 nights • 4.86",
              images: [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
              ],
              rating: 4.86,
              reviewCount: 74,
              price: 32,
              nights: 5,
              isGuestFavorite: false,
            },
            {
              id: "toronto2",
              title: "Room in Church-Wellesley",
              location: "$45 for 5 nights • 4.71",
              images: [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
              ],
              rating: 4.71,
              reviewCount: 63,
              price: 45,
              nights: 5,
              isGuestFavorite: true,
            },
          ]}
        />

        <DestinationCarousel
          title="Homes in Seoul"
          properties={[
            {
              id: "seoul1",
              title: "Room in Gangnam-gu",
              location: "₩4.5 for 5 nights • 4.89",
              images: [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720&h=720&fit=crop",
              ],
              rating: 4.89,
              reviewCount: 127,
              price: 45,
              nights: 5,
              isGuestFavorite: false,
            },
            {
              id: "seoul2",
              title: "Room in Seoul",
              location: "₩69 for 2 nights • 4.76",
              images: [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
              ],
              rating: 4.76,
              reviewCount: 89,
              price: 69,
              nights: 2,
              isGuestFavorite: true,
            },
          ]}
        />

        {/* Inspiration Section - Minimal */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Inspiration for future getaways
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { label: "Popular", subtext: "Travel tips & inspiration" },
                { label: "Arts & culture", subtext: "Find things to do" },
                { label: "Outdoors", subtext: "Add dates for prices" },
                {
                  label: "Family-friendly travel",
                  subtext: "Take from Dec 16-Jan 4",
                },
                {
                  label: "Vacation ideas for a budget",
                  subtext: "Make it special without breaking...",
                },
                {
                  label: "Travel Europe on a budget",
                  subtext: "From remote villas to design...",
                },
              ].map((item, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 text-xs">{item.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
