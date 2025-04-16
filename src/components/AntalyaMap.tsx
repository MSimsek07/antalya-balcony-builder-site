import React from 'react';

interface ServiceDistrict {
  id: string;
  name: string;
  coords: { top: string; left: string; }; // Center coordinates
  isServiceArea: boolean;
}

const AntalyaMap = () => {
  const districts: ServiceDistrict[] = [
    {
      id: "merkez",
      name: "Merkez",
      coords: { top: "37%", left: "43%" }, // Adjusted for center
      isServiceArea: true
    },
    {
      id: "kemer",
      name: "Kemer",
      coords: { top: "53%", left: "33%" },
      isServiceArea: true
    },
    {
      id: "kumluca",
      name: "Kumluca",
      coords: { top: "63%", left: "28%" },
      isServiceArea: true
    },
    {
      id: "elmali",
      name: "Elmalı",
      coords: { top: "43%", left: "28%" },
      isServiceArea: true
    },
    {
      id: "korkuteli",
      name: "Korkuteli",
      coords: { top: "33%", left: "33%" },
      isServiceArea: true
    },
    {
      id: "serik",
      name: "Serik",
      coords: { top: "35%", left: "58%" },
      isServiceArea: true
    },
    {
      id: "manavgat",
      name: "Manavgat",
      coords: { top: "32%", left: "68%" },
      isServiceArea: true
    },
    {
      id: "kas",
      name: "Kaş",
      coords: { top: "73%", left: "13%" },
      isServiceArea: false
    },
    {
      id: "finike",
      name: "Finike",
      coords: { top: "68%", left: "18%" },
      isServiceArea: false
    },
    {
      id: "ibradi",
      name: "İbradı",
      coords: { top: "23%", left: "63%" },
      isServiceArea: false
    },
    {
      id: "akseki",
      name: "Akseki",
      coords: { top: "23%", left: "73%" },
      isServiceArea: false
    },
    {
      id: "gundogmus",
      name: "Gündoğmuş",
      coords: { top: "38%", left: "73%" },
      isServiceArea: false
    },
    {
      id: "alanya",
      name: "Alanya",
      coords: { top: "43%", left: "78%" },
      isServiceArea: false
    },
    {
      id: "gazipasa",
      name: "Gazipaşa",
      coords: { top: "53%", left: "83%" },
      isServiceArea: false
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="aspect-[16/9] w-full relative overflow-hidden rounded-xl shadow-md">
        <img
          src="/antalya_map.jpg"
          alt="Antalya Hizmet Bölgeleri Haritası"
          className="w-full h-full object-cover"
        />

        {districts.map((district) => (
          <div
            key={district.id}
            style={{
              position: "absolute",
              top: district.coords.top,
              left: district.coords.left,
              transform: "translate(-50%, -50%)", // Center the circle
              width: "20px", // Smaller circle
              height: "20px",
              borderRadius: "50%", // Make it a circle
              backgroundColor: district.isServiceArea ? "rgba(14, 165, 233, 0.5)" : "transparent", // Semi-transparent blue
              border: district.isServiceArea ? "1px solid rgb(14, 165, 233)" : "none",
              cursor: district.isServiceArea ? "pointer" : "default",
            }}
            className={`transition-colors duration-300 hover:scale-110 ${district.isServiceArea ? 'animate-pulse' : ''}`}
            onClick={() => {
              if (district.isServiceArea) {
                console.log(`Clicked on service area: ${district.name}`);
                // You can add navigation or other actions here
              }
            }}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-theme-blue"></span>
            <span className="text-sm text-gray-600">Hizmet Verdiğimiz Bölgeler</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-gray-300"></span>
            <span className="text-sm text-gray-600">Diğer Bölgeler</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {districts
            .filter(d => d.isServiceArea)
            .map(district => (
              <div
                key={district.id}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-theme-blue"></div>
                <span className="text-sm text-gray-600">{district.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AntalyaMap;
