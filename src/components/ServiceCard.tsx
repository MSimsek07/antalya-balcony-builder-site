
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ServiceCard = ({ title, description, image, link }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden group">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-theme-blue mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={link}>
          <Button variant="outline" className="border-theme-teal text-theme-teal hover:bg-theme-teal hover:text-white">
            Detaylı Bilgi
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
