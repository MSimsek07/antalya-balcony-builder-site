import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AntalyaMap = () => {
  // REMOVED the districts array and related logic

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="aspect-[16/9] w-full relative overflow-hidden rounded-xl shadow-md">
        <img
          src="/antalya_map.png" // UPDATED image source
          alt="Antalya Hizmet Bölgeleri Haritası"
          className="w-full h-full object-cover"
          // Error handling can be added if needed
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg'; // Fallback image
            target.onerror = null; // Prevent infinite loops
          }}
        />
        {/* REMOVED the .map function that rendered district points */}
      </div>
    </div>
  );
};

export default AntalyaMap;
