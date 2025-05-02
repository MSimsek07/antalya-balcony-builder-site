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
  Briefcase,
  PanelLeft
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import AdminHome from "./Home";
import AdminServices from "./Services";
import AdminProjects from "./Projects"; 
import AdminSecuritySettings from "./settings/SecuritySettings";
import AdminCompanySettings from "./settings/CompanySettings";
import AdminWebsiteSettings from "./settings/WebsiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"; 
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
  SidebarMenuBadge,
  SidebarTrigger,
  useSidebar // Import useSidebar hook
} from "@/components/ui/sidebar";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig"; // Import Firebase auth instance

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar(); // Get sidebar context

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      toast({
        title: "Çıkış yapıldı",
        description: "Başarıyla çıkış yaptınız.",
      });
      onLogout();
      // Close mobile sidebar on logout if open
      if (isMobile) {
        setOpenMobile(false);
      }
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Çıkış yapılamadı",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  // Helper function to handle navigation and close mobile sidebar
  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const mainNavItems = [
    { name: "Panel", icon: Home, path: "/admin" },
    { name: "Hizmetler", icon: Package, path: "/admin/services" },
    { name: "Projeler", icon: Briefcase, path: "/admin/projects" },
  ];

  const settingsNavItems = [
    { name: "Güvenlik", icon: Lock, path: "/admin/settings/security" },
    { name: "Şirket", icon: Building, path: "/admin/settings/company" },
    { name: "Web Sitesi", icon: Globe, path: "/admin/settings/website" },
  ];

  return (
    // SidebarProvider should wrap the component using the hook
    // If SidebarProvider is higher up the tree, this is fine.
    // Otherwise, create a sub-component or move the hook call.
    // Assuming SidebarProvider is wrapping this component correctly.
    <div className="min-h-screen flex w-full bg-gray-100">
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link 
            to="/"
            className="inline-flex items-center text-theme-teal hover:text-theme-teal/90 mb-2"
            onClick={() => handleNavigate("/")} // Close on link click too
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
                      onClick={() => handleNavigate(item.path)} // Use helper function
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
                      onClick={() => handleNavigate(item.path)} // Use helper function
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
            onClick={handleLogout} // Logout handler already closes sidebar
          >
            <LogOut className="h-5 w-5" />
            <span>Çıkış Yap</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header bar for mobile trigger */}
        <header className="flex items-center justify-between p-4 border-b bg-white md:hidden">
          <SidebarTrigger className="text-gray-700 hover:text-gray-900" /> 
          <span className="font-semibold text-theme-blue">Admin Paneli</span>
          <div></div> 
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/services" element={<AdminServices />} />
            <Route path="/projects" element={<AdminProjects />} />
            <Route path="/settings/security" element={<AdminSecuritySettings />} />
            <Route path="/settings/company" element={<AdminCompanySettings />} />
            <Route path="/settings/website" element={<AdminWebsiteSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// IMPORTANT: Wrap the exported component with SidebarProvider if not already done higher up
const AdminDashboardWithProvider = ({ onLogout }: AdminDashboardProps) => (
  <SidebarProvider defaultOpen={true}>
    <AdminDashboard onLogout={onLogout} />
  </SidebarProvider>
);

export default AdminDashboardWithProvider;
