
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Image, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit
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

  const serviceItems = [
    {
      id: "1",
      title: "Cam Balkon",
      description: "Balkonunuzu dört mevsim kullanılabilir bir alana çeviriyoruz.",
      views: 452,
      lastUpdated: "01.04.2025"
    },
    {
      id: "2",
      title: "Isıcamlı PVC Pencere",
      description: "Yüksek ısı ve ses yalıtımı sağlayan sistemler.",
      views: 386,
      lastUpdated: "02.04.2025"
    },
    {
      id: "3",
      title: "Ofis Cam Bölmesi",
      description: "Modern ofis alanları için şık ve fonksiyonel çözümler.",
      views: 247,
      lastUpdated: "03.04.2025"
    },
    {
      id: "4",
      title: "Sineklik",
      description: "Yaz aylarında böceklerden korunmanızı sağlayan sistemler.",
      views: 183,
      lastUpdated: "04.04.2025"
    },
  ];

  const galleryItems = [
    {
      id: "1",
      category: "Cam Balkon",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      views: 225,
      lastUpdated: "02.04.2025"
    },
    {
      id: "2",
      category: "PVC Pencere",
      image: "https://images.unsplash.com/photo-1600573472556-e636c2acda88",
      views: 198,
      lastUpdated: "03.04.2025"
    },
    {
      id: "3",
      category: "Ofis Bölme",
      image: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a",
      views: 163,
      lastUpdated: "03.04.2025"
    },
    {
      id: "4",
      category: "Cam Balkon",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
      views: 142,
      lastUpdated: "04.04.2025"
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

      {/* Popular Services */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Popüler Hizmetler</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/admin/services")}
            >
              Tümünü Gör
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Hizmet</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Görüntülenme</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Son Güncelleme</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {serviceItems.map((item, index) => (
                  <tr key={index} className={index !== serviceItems.length - 1 ? "border-b" : ""}>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-gray-400 mr-2" />
                        {item.views}
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.lastUpdated}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/admin/services")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Popular Gallery Items */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Popüler Galeri Öğeleri</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/admin/gallery")}
            >
              Tümünü Gör
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 text-white bg-black bg-opacity-50 hover:bg-opacity-70"
                    onClick={() => navigate("/admin/gallery")}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  <div className="font-medium text-sm">{item.category}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {item.views}
                    </div>
                    <div>{item.lastUpdated}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHome;
