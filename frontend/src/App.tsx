import { AppProvider, Footer, Header, ModeToggle, ThemeProvider } from "@/components";
import { Outlet } from "react-router-dom";

const App = () => {

  return (
      <AppProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Header />
        <main className="min-h-screen dark:text-dark-text dark:bg-dark-bg p-4 flex justify-center">
          <Outlet />
          <ModeToggle />
        </main>
        <Footer />
      </ThemeProvider>
      </AppProvider>
  );
};

export default App;
