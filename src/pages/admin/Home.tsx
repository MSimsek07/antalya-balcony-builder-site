
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Calendar, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  TrendingDown
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const AdminHome = () => {
  // Mock data
  const stats = [
    { 
      title: "Toplam Proje", 
      icon: Package,
      iconColor: "#33C3F0",
      value: 1909, 
      change: "+12%", 
      trend: "up" 
    },
    { 
      title: "Aktif Projeler", 
      icon: Calendar,
      iconColor: "#33C3F0",
      value: 28, 
      change: "+4%", 
      trend: "up" 
    },
    { 
      title: "Yeni Mesajlar", 
      icon: MessageSquare,
      iconColor: "#33C3F0",
      value: 14, 
      change: "-3%", 
      trend: "down" 
    },
    { 
      title: "Toplam Müşteri", 
      icon: Users,
      iconColor: "#33C3F0",
      value: 4172, 
      change: "+8%", 
      trend: "up" 
    },
  ];

  const recentProjects = [
    { 
      id: "PRJ-2025-042", 
      customer: "Mehmet Yılmaz", 
      service: "Cam Balkon", 
      status: "In Progress", 
      date: "03.04.2025", 
      amount: "4500₺" 
    },
    { 
      id: "PRJ-2025-041", 
      customer: "Ayşe Kaya", 
      service: "PVC Pencere", 
      status: "Pending", 
      date: "02.04.2025", 
      amount: "6200₺" 
    },
    { 
      id: "PRJ-2025-040", 
      customer: "Ali Demir", 
      service: "Ofis Bölme", 
      status: "Completed", 
      date: "01.04.2025", 
      amount: "7800₺" 
    },
    { 
      id: "PRJ-2025-039", 
      customer: "Fatma Şahin", 
      service: "Sineklik", 
      status: "Completed", 
      date: "31.03.2025", 
      amount: "1200₺" 
    },
    { 
      id: "PRJ-2025-038", 
      customer: "Hasan Yıldız", 
      service: "Cam Balkon", 
      status: "Completed", 
      date: "30.03.2025", 
      amount: "3800₺" 
    },
  ];

  const recentMessages = [
    {
      id: "MSG-2025-068",
      name: "Murat Acar",
      subject: "Fiyat Teklifi",
      date: "04.04.2025",
      read: false
    },
    {
      id: "MSG-2025-067",
      name: "Zeynep Çelik",
      subject: "Proje Bilgisi",
      date: "03.04.2025",
      read: false
    },
    {
      id: "MSG-2025-066",
      name: "Oğuz Şen",
      subject: "Montaj Talebi",
      date: "03.04.2025",
      read: true
    },
    {
      id: "MSG-2025-065",
      name: "Selin Koç",
      subject: "Garanti Koşulları",
      date: "02.04.2025",
      read: true
    },
  ];

  const getStatusLabel = (status: string) => {
    switch(status) {
      case "Completed": return "Tamamlandı";
      case "In Progress": return "Devam Ediyor";
      case "Pending": return "Beklemede";
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Yönetim Paneli</h1>
        <p className="text-gray-500">Hoş geldiniz, bugün 4 Nisan 2025</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm border border-gray-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5" style={{ color: stat.iconColor }} />
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects Table */}
      <Card className="shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl">Son Projeler</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Hizmet</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">Tutar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProjects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{project.id}</TableCell>
                  <TableCell>{project.customer}</TableCell>
                  <TableCell>{project.service}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${getStatusClass(project.status)}`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                  </TableCell>
                  <TableCell>{project.date}</TableCell>
                  <TableCell className="text-right font-medium">{project.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card className="shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl">Son Mesajlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${message.read ? "bg-gray-300" : "bg-theme-teal"}`} />
                  <div>
                    <div className="font-medium">{message.name}</div>
                    <div className="text-sm text-gray-500">{message.subject}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{message.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHome;
