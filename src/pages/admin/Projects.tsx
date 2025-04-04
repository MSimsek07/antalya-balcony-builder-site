
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  customer: string;
  service: string;
  status: "Completed" | "In Progress" | "Pending";
  startDate: string;
  endDate?: string;
  amount: string;
  address: string;
}

const AdminProjects = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data
  const allProjects: Project[] = [
    { 
      id: "PRJ-2025-042", 
      customer: "Mehmet Yılmaz", 
      service: "Cam Balkon", 
      status: "In Progress", 
      startDate: "03.04.2025", 
      amount: "4500₺",
      address: "Muratpaşa, Antalya"
    },
    { 
      id: "PRJ-2025-041", 
      customer: "Ayşe Kaya", 
      service: "PVC Pencere", 
      status: "Pending", 
      startDate: "02.04.2025", 
      amount: "6200₺",
      address: "Konyaaltı, Antalya"
    },
    { 
      id: "PRJ-2025-040", 
      customer: "Ali Demir", 
      service: "Ofis Bölme", 
      status: "Completed", 
      startDate: "01.04.2025", 
      endDate: "02.04.2025", 
      amount: "7800₺",
      address: "Kepez, Antalya"
    },
    { 
      id: "PRJ-2025-039", 
      customer: "Fatma Şahin", 
      service: "Sineklik", 
      status: "Completed", 
      startDate: "31.03.2025", 
      endDate: "01.04.2025", 
      amount: "1200₺",
      address: "Muratpaşa, Antalya" 
    },
    { 
      id: "PRJ-2025-038", 
      customer: "Hasan Yıldız", 
      service: "Cam Balkon", 
      status: "Completed", 
      startDate: "30.03.2025", 
      endDate: "01.04.2025", 
      amount: "3800₺",
      address: "Döşemealtı, Antalya"
    },
    { 
      id: "PRJ-2025-037", 
      customer: "Zeynep Arslan", 
      service: "Isıcamlı PVC Pencere", 
      status: "In Progress", 
      startDate: "29.03.2025", 
      amount: "5400₺",
      address: "Konyaaltı, Antalya" 
    },
    { 
      id: "PRJ-2025-036", 
      customer: "Ahmet Özdemir", 
      service: "Panjur Sistemleri", 
      status: "Pending", 
      startDate: "28.03.2025", 
      amount: "2800₺",
      address: "Kepez, Antalya"
    },
    { 
      id: "PRJ-2025-035", 
      customer: "Selin Koç", 
      service: "Kış Bahçesi", 
      status: "In Progress", 
      startDate: "27.03.2025", 
      amount: "12500₺",
      address: "Muratpaşa, Antalya"
    },
  ];

  const filteredProjects = allProjects
    .filter(project => 
      (statusFilter ? project.status === statusFilter : true) &&
      (searchTerm ? 
        project.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.address.toLowerCase().includes(searchTerm.toLowerCase())
        : true
      )
    );

  const handleEditProject = (project: Project) => {
    toast({
      title: "Proje düzenleme",
      description: `${project.id} numaralı proje düzenleme formu açıldı.`,
    });
  };

  const handleDeleteProject = (id: string) => {
    toast({
      title: "Proje silindi",
      description: `${id} numaralı proje başarıyla silindi.`,
    });
  };

  const handleAddNewProject = () => {
    toast({
      title: "Yeni proje",
      description: "Yeni proje ekleme formu açıldı.",
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter(undefined);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Projeler</h1>
        <p className="text-gray-500">Tüm projeleri görüntüleyin ve yönetin</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-xl">Tüm Projeler</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Projelerde ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full md:w-64"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              {(searchTerm || statusFilter) && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={clearFilters}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              <Button 
                className="bg-theme-teal hover:bg-theme-teal/90"
                onClick={handleAddNewProject}
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Proje
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Müşteri</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Hizmet</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Adres</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Durum</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Başlangıç</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">Tutar</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      Proje bulunamadı
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project, index) => (
                    <tr 
                      key={project.id} 
                      className={index !== filteredProjects.length - 1 ? "border-b" : ""}
                    >
                      <td className="px-4 py-3">{project.id}</td>
                      <td className="px-4 py-3 font-medium">{project.customer}</td>
                      <td className="px-4 py-3">{project.service}</td>
                      <td className="px-4 py-3">{project.address}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs ${
                            project.status === "Completed" 
                              ? "bg-green-100 text-green-800" 
                              : project.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {project.status === "Completed" 
                            ? "Tamamlandı" 
                            : project.status === "In Progress"
                            ? "Devam Ediyor"
                            : "Beklemede"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{project.startDate}</td>
                      <td className="px-4 py-3 text-right font-medium">{project.amount}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                İşlemler
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleEditProject(project)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteProject(project.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Sil
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Toplam {filteredProjects.length} proje
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Önceki
              </Button>
              <Button variant="outline" size="sm" disabled>
                Sonraki
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Projeleri Filtrele</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Proje Durumu</label>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tüm durumlar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tüm durumlar</SelectItem>
                  <SelectItem value="Completed">Tamamlandı</SelectItem>
                  <SelectItem value="In Progress">Devam Ediyor</SelectItem>
                  <SelectItem value="Pending">Beklemede</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={clearFilters}
            >
              Filtreleri Temizle
            </Button>
            <Button 
              className="bg-theme-teal hover:bg-theme-teal/90"
              onClick={() => setIsFilterOpen(false)}
            >
              Uygula
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
