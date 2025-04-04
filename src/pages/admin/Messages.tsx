
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Trash2, 
  Mail, 
  Eye, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const AdminMessages = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Mock data
  const allMessages: Message[] = [
    {
      id: "MSG-2025-068",
      name: "Murat Acar",
      email: "murat.acar@example.com",
      subject: "Fiyat Teklifi",
      message: "Merhaba, 3x4 metre ölçülerinde bir balkon için cam balkon sistemi fiyat teklifi almak istiyorum. Teşekkürler.",
      date: "04.04.2025",
      read: false
    },
    {
      id: "MSG-2025-067",
      name: "Zeynep Çelik",
      email: "zeynep.celik@example.com",
      subject: "Proje Bilgisi",
      message: "Merhaba, geçen hafta yaptığımız görüşme sonucunda projemizin ne durumda olduğunu öğrenmek istiyorum. Montaj için tahmini bir tarih alabilir miyim?",
      date: "03.04.2025",
      read: false
    },
    {
      id: "MSG-2025-066",
      name: "Oğuz Şen",
      email: "oguz.sen@example.com",
      subject: "Montaj Talebi",
      message: "Daha önce sipariş ettiğim PVC pencerelerin montajı için randevu almak istiyorum. Önümüzdeki hafta Salı veya Çarşamba günü müsait olacağım.",
      date: "03.04.2025",
      read: true
    },
    {
      id: "MSG-2025-065",
      name: "Selin Koç",
      email: "selin.koc@example.com",
      subject: "Garanti Koşulları",
      message: "Merhaba, 6 ay önce montajını yaptığınız cam balkon sistemimde bir sorun oluştu. Garanti kapsamında değerlendirilebilir mi? Bilgi verirseniz sevinirim.",
      date: "02.04.2025",
      read: true
    },
    {
      id: "MSG-2025-064",
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@example.com",
      subject: "Ofis Bölme Sistemleri",
      message: "Yeni ofisimiz için cam bölme sistemleri hakkında bilgi almak istiyorum. Yaklaşık 120 metrekarelik bir alan için farklı bölme seçenekleriniz ve fiyatları hakkında bilgi verebilir misiniz?",
      date: "01.04.2025",
      read: true
    },
    {
      id: "MSG-2025-063",
      name: "Ayşe Kaya",
      email: "ayse.kaya@example.com",
      subject: "Pencere Değişimi",
      message: "Evimizin tüm pencerelerini değiştirmek istiyoruz. Ücretsiz keşif için ne zaman müsait olursunuz? Hafta sonu da hizmet veriyor musunuz?",
      date: "31.03.2025",
      read: true
    },
    {
      id: "MSG-2025-062",
      name: "Mehmet Demir",
      email: "mehmet.demir@example.com",
      subject: "Sineklik Montajı",
      message: "Balkonumuza yaptırdığımız cam sistemi için sineklik taktırmak istiyoruz. Ne kadar sürede yapılır ve maliyeti ne olur öğrenebilir miyim?",
      date: "30.03.2025",
      read: true
    },
    {
      id: "MSG-2025-061",
      name: "Elif Şahin",
      email: "elif.sahin@example.com",
      subject: "Cam Balkon Temizliği",
      message: "2 yıl önce yaptırdığımız cam balkon sisteminde kullanılabilecek en uygun temizlik malzemeleri hakkında bilgi verebilir misiniz? Teşekkürler.",
      date: "29.03.2025",
      read: true
    },
  ];

  const filteredMessages = allMessages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMessage = (message: Message) => {
    setSelectedMessage({
      ...message,
      read: true
    });
    setIsDetailOpen(true);
  };

  const handleDeleteMessage = (id: string) => {
    toast({
      title: "Mesaj silindi",
      description: `${id} numaralı mesaj başarıyla silindi.`,
    });
  };

  const markAsRead = (id: string) => {
    toast({
      title: "Okundu olarak işaretlendi",
      description: `${id} numaralı mesaj okundu olarak işaretlendi.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Mesajlar</h1>
        <p className="text-gray-500">Müşteri mesajlarını görüntüleyin ve yönetin</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-xl">Tüm Mesajlar</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Mesajlarda ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full md:w-64"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSearchTerm("")}
              >
                <RefreshCw className="h-4 w-4" />
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
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Gönderen</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Konu</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Tarih</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Durum</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      Mesaj bulunamadı
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((message, index) => (
                    <tr 
                      key={message.id} 
                      className={`${
                        index !== filteredMessages.length - 1 ? "border-b" : ""
                      } ${!message.read ? "bg-blue-50" : ""} hover:bg-gray-50 cursor-pointer`}
                      onClick={() => handleViewMessage(message)}
                    >
                      <td className="px-4 py-3">{message.id}</td>
                      <td className="px-4 py-3 font-medium">{message.name}</td>
                      <td className="px-4 py-3">{message.subject}</td>
                      <td className="px-4 py-3">{message.date}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            message.read 
                              ? "bg-gray-100 text-gray-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          {message.read ? "Okundu" : "Yeni"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewMessage(message)}
                          >
                            <Eye className="h-4 w-4 text-gray-500" />
                          </Button>
                          {!message.read && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => markAsRead(message.id)}
                            >
                              <Mail className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
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
              Toplam {filteredMessages.length} mesaj
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

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {selectedMessage.subject}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 my-4">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <div className="font-medium">{selectedMessage.name}</div>
                  <div className="text-sm text-gray-500">{selectedMessage.email}</div>
                </div>
                <div className="text-sm text-gray-500">{selectedMessage.date}</div>
              </div>
              <div className="py-2 text-gray-700 whitespace-pre-line">
                {selectedMessage.message}
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDetailOpen(false)}
              >
                Kapat
              </Button>
              <Button 
                className="bg-theme-teal hover:bg-theme-teal/90"
                onClick={() => {
                  setIsDetailOpen(false);
                  toast({
                    title: "E-posta hazırlandı",
                    description: `${selectedMessage.name} kişisine yanıt vermek için e-posta editörü açıldı.`,
                  });
                }}
              >
                Yanıtla
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminMessages;
