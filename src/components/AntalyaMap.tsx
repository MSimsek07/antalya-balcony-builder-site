import React, { useState } from 'react';

interface ServiceDistrict {
  id: string;
  name: string;
  path: string;
  isServiceArea: boolean;
}

const AntalyaMap = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const districts: ServiceDistrict[] = [
    {
      id: "merkez",
      name: "Merkez",
      path: "M420 280 L460 270 L470 290 L455 320 L420 315 L410 300 Z",
      isServiceArea: true
    },
    {
      id: "kemer",
      name: "Kemer",
      path: "M410 320 L420 315 L430 340 L415 350 L405 340 Z",
      isServiceArea: true
    },
    {
      id: "kumluca",
      name: "Kumluca",
      path: "M380 330 L405 340 L410 360 L390 370 L370 355 Z",
      isServiceArea: true
    },
    {
      id: "elmali",
      name: "Elmalı",
      path: "M360 300 L390 290 L410 300 L400 330 L370 320 Z",
      isServiceArea: true
    },
    {
      id: "korkuteli",
      name: "Korkuteli",
      path: "M390 270 L420 280 L410 300 L390 290 L380 280 Z",
      isServiceArea: true
    },
    {
      id: "serik",
      name: "Serik",
      path: "M470 290 L500 285 L510 300 L500 320 L480 315 Z",
      isServiceArea: true
    },
    {
      id: "manavgat",
      name: "Manavgat",
      path: "M500 285 L530 280 L545 300 L535 320 L510 315 Z",
      isServiceArea: true
    },
    {
      id: "kas",
      name: "Kaş",
      path: "M340 340 L370 330 L380 350 L365 370 L340 360 Z",
      isServiceArea: false
    },
    {
      id: "finike",
      name: "Finike",
      path: "M370 330 L390 325 L400 345 L385 355 L370 350 Z",
      isServiceArea: false
    },
    {
      id: "ibradi",
      name: "İbradı",
      path: "M480 260 L500 255 L510 270 L500 285 L480 280 Z",
      isServiceArea: false
    },
    {
      id: "akseki",
      name: "Akseki",
      path: "M510 250 L540 245 L550 265 L540 280 L520 275 Z",
      isServiceArea: false
    },
    {
      id: "gundogmus",
      name: "Gündoğmuş",
      path: "M520 275 L540 270 L550 285 L540 300 L520 295 Z",
      isServiceArea: false
    },
    {
      id: "alanya",
      name: "Alanya",
      path: "M540 290 L570 285 L580 305 L570 320 L550 315 Z",
      isServiceArea: false
    },
    {
      id: "gazipasa",
      name: "Gazipaşa",
      path: "M570 300 L590 295 L600 310 L590 325 L575 320 Z",
      isServiceArea: false
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="aspect-[16/9] w-full">
        <svg
          viewBox="320 230 300 150"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        >
          {/* Background water effect */}
          <rect x="320" y="230" width="300" height="150" fill="#e5f6ff" rx="8" />
          
          {districts.map((district) => (
            <g key={district.id}>
              <path
                d={district.path}
                fill={district.isServiceArea 
                  ? hoveredDistrict === district.id 
                    ? '#0891b2' // Darker teal on hover
                    : '#0ea5e9' // Default blue for service areas
                  : '#e2e8f0' // Grey for non-service areas
                }
                stroke="white"
                strokeWidth="1.5"
                className={`transition-colors duration-300 ${
                  district.isServiceArea ? 'cursor-pointer' : 'opacity-50'
                }`}
                onMouseEnter={() => setHoveredDistrict(district.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
              />
              <text
                x={district.path.split(" ")[1]}
                y={district.path.split(" ")[2]}
                textAnchor="middle"
                fill={district.isServiceArea ? 'white' : '#64748b'}
                fontSize="8"
                className="font-medium pointer-events-none"
                transform={`translate(15, 15)`}
              >
                {district.name}
              </text>
              {district.isServiceArea && hoveredDistrict === district.id && (
                <circle
                  cx={district.path.split(" ")[1]}
                  cy={district.path.split(" ")[2]}
                  r="3"
                  fill="white"
                  className="animate-ping"
                  transform="translate(15, 15)"
                />
              )}
            </g>
          ))}
        </svg>
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
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default AntalyaMap;