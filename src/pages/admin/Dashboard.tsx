
import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { 
  Home, 
  Users, 
  Package, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminHome from "./Home";
import AdminMessages from "./Messages";
import AdminProjects from "./Projects";
import AdminSettings from "./Settings";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    onLogout();
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { name: "Panel", icon: Home, path: "/admin" },
    { name: "Projeler", icon: Package, path: "/admin/projects" },
    { name: "Mesajlar", icon: MessageSquare, path: "/admin/messages" },
    { name: "Ayarlar", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for desktop */}
      <aside
        className={`bg-theme-blue text-white w-64 fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="h-20 flex items-center justify-center border-b border-theme-blue-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-theme-blue-700 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-theme-blue-700">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-white hover:bg-theme-blue-700 w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Çıkış Yap</span>
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-0 z-10 lg:left-64">
          <div className="flex items-center justify-between h-full px-4">
            <button
              className="p-2 rounded-md lg:hidden"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <div>
              <span className="text-sm text-gray-500">Hoş geldiniz, Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mt-16 p-6">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/projects" element={<AdminProjects />} />
            <Route path="/messages" element={<AdminMessages />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
