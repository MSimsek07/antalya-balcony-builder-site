import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
  overlay?: boolean;
}

const Hero = ({
  title,
  subtitle,
  buttonText,
  buttonLink = "/contact",
  image = "https://res.cloudinary.com/drxariwwg/image/upload/v1745410335/k17komqkm02um6nqcw8i.avif",
  overlay = true,
}: HeroProps) => {
  return (
    <div className="relative min-h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      {overlay && (
        <div className="absolute inset-0 bg-theme-blue/70"></div>
      )}
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            {subtitle}
          </p>
          {buttonText && (
            <a 
              href="https://api.whatsapp.com/send?phone=905454043462"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-green-500 hover:bg-green-600 px-8 py-2.5 text-lg font-medium text-white transition-colors"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-6 w-6" />
              WhatsApp ile İletişim
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
