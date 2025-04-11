
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Image, 
  TrendingUp, 
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  
  // Mock data
  const stats = [
    { 
      title: "Toplam Hizmet", 
      value: 8, 
      icon: Package, 
      change: "+2", 
      trend: "up",
      link: "/admin/services" 
    },
    { 
      title: "Galeri Öğeleri", 
      value: 12, 
      icon: Image, 
      change: "+4", 
      trend: "up",
      link: "/admin/gallery" 
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Yönetim Paneli</h1>
        <p className="text-gray-500">Hoş geldiniz, bugün 4 Nisan 2025</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-theme-teal" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span 
                  className={`text-sm ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change} son 30 günde
                </span>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate(stat.link)}
                >
                  Yönet
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
