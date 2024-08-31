import {
  AppProvider,
  Footer,
  Header,
  ModeToggle,
  ThemeProvider,
} from "@/components";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppProvider>
        <Header />
        <main className="min-h-screen dark:text-dark-text dark:bg-dark-bg p-4 flex flex-col items-center">
          <Outlet />
          <ModeToggle />
        </main>
        <Footer />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
