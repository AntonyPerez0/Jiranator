import "./index.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

// page routes
import HomePage from "@/pages/home";
import JiraTicketsPage from "@/pages/jira-tickets";
import AgileBoardPage from "@/pages/agile-board";
import QueryPage from "@/pages/query";
import SettingsPage from "@/pages/settings";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="jira-tickets" element={<JiraTicketsPage />} />
            <Route path="agile-board" element={<AgileBoardPage />} />
            <Route path="query" element={<QueryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
