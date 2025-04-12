import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  onDetailsClick: () => void;
}

const ServiceCard = ({ title, description, image, onDetailsClick }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-theme-blue mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <Button 
          variant="outline" 
          className="w-full border-theme-teal text-theme-teal hover:bg-theme-teal hover:text-white"
          onClick={onDetailsClick}
        >
          Detaylı Bilgi
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
