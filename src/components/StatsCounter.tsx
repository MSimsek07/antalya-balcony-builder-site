
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

const Counter = ({ value, suffix, label, duration = 2000 }: StatProps) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (inView) {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = timestamp - startTimeRef.current;
        const percentage = Math.min(progress / duration, 1);
        
        const currentCount = Math.floor(percentage * value);
        
        if (currentCount !== countRef.current) {
          countRef.current = currentCount;
          setCount(currentCount);
        }
        
        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex justify-center items-center space-x-1">
        <span className="text-4xl font-bold text-white">{count}</span>
        <span className="text-2xl font-bold text-theme-teal">{suffix}</span>
      </div>
      <p className="text-white/80 mt-2">{label}</p>
    </div>
  );
};

const StatsCounter = () => {
  const stats = [
    { value: 4172, suffix: "+", label: "Mutlu Müşteri", duration: 2500 },
    { value: 1909, suffix: "+", label: "Tamamlanan Proje", duration: 2500 },
    { value: 13, suffix: "+", label: "Yıllık Tecrübe", duration: 1500 },
    { value: 5, suffix: "+", label: "Profesyonellik", duration: 1000 },
  ];

  return (
    <div className="bg-theme-blue py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Counter
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={stat.duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
