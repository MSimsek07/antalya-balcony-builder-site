import { 
  Home, 
  Package, 
  Settings,
  Image, 
  LogOut,
  User,
  Building,
  Globe,
  Lock,
  ArrowLeft,
  Briefcase // Changed icon for Projects
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import AdminHome from "./Home";
import AdminServices from "./Services";
// import AdminGallery from "./Gallery"; // Removed AdminGallery
import AdminProjects from "./Projects"; // Added AdminProjects
import AdminProfileSettings from "./settings/ProfileSettings";
import AdminSecuritySettings from "./settings/SecuritySettings";
import AdminCompanySettings from "./settings/CompanySettings";
import AdminWebsiteSettings from "./settings/WebsiteSettings";
import { useToast } from "@/hooks/use-toast";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge
} from "@/components/ui/sidebar";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    onLogout();
    navigate("/admin/login");
  };

  const mainNavItems = [
    { name: "Panel", icon: Home, path: "/admin" },
    { name: "Hizmetler", icon: Package, path: "/admin/services" },
    { name: "Projeler", icon: Briefcase, path: "/admin/projects" }, // Updated path and icon
  ];

  const settingsNavItems = [
    { name: "Profil", icon: User, path: "/admin/settings/profile" },
    { name: "Güvenlik", icon: Lock, path: "/admin/settings/security" },
    { name: "Şirket", icon: Building, path: "/admin/settings/company" },
    { name: "Web Sitesi", icon: Globe, path: "/admin/settings/website" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-100">
        <Sidebar>
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <Link 
              to="/"
              className="inline-flex items-center text-theme-teal hover:text-theme-teal/90 mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Ana Menü</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton 
                        tooltip={item.name}
                        onClick={() => navigate(item.path)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel>Ayarlar</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsNavItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton 
                        tooltip={item.name}
                        onClick={() => navigate(item.path)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <SidebarMenuButton 
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Çıkış Yap</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 h-screen overflow-auto">
          <main className="p-6">
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/services" element={<AdminServices />} />
              <Route path="/projects" element={<AdminProjects />} /> {/* Updated path and element */}
              <Route path="/settings/profile" element={<AdminProfileSettings />} />
              <Route path="/settings/security" element={<AdminSecuritySettings />} />
              <Route path="/settings/company" element={<AdminCompanySettings />} />
              <Route path="/settings/website" element={<AdminWebsiteSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
