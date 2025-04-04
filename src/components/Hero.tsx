
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
  image = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
            <Link to={buttonLink}>
              <Button className="bg-theme-teal hover:bg-theme-teal/90 text-white px-8 py-2.5 text-lg">
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
