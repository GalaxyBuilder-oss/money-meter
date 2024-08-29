import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import RegisterModal from "./RegisterModal";
import LoginModal from "./ModalLogin";

const components: {
  title: string;
  href: string;
  group: string;
  description: string;
}[] = [
  {
    title: "Tambah Transaksi",
    href: "/transaction/add",
    group: "/transaction",
    description: "Tambah Transaksimu Hari Ini Untuk Mulai Pencatatan.",
  },
  {
    title: "Lihat Transaksi",
    href: "/transaction",
    group: "/transaction",
    description: "Lihat Transaksi Yang Telah Kamu Catat Sebelumnya.",
  },
  {
    title: "Tambah Kategori",
    href: "/category/add",
    group: "/category",
    description: "Tambah Kategori Agar Transaksi Dapat Dibedakan",
  },
  {
    title: "Lihat Kategori",
    href: "/category",
    group: "/category",
    description: "Lihat Kategori Yang Sebelumnya Telah Kamu Buat.",
  },
];

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const location = useLocation();

  const toggleLoginModal = () => setLoginOpen(!isLoginOpen);
  const toggleSignupModal = () => setSignupOpen(!isSignupOpen);
  const isActive = (path: string) => location.pathname.startsWith(path);
  return (
    <header className="w-full h-[14vh] flex flex-col sm:flex-row items-center justify-around sm:justify-between p-4 z-10 dark:text-dark-link dark:bg-dark-bg bg-light-bg sticky top-0 border-b">
      <h1 className="text-2xl font-bold uppercase w1/3 dark:text-dark-title">
        Money Meter
      </h1>
      <NavigationMenu>
        <NavigationMenuList className="gap-2 justify-between">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
              Menu
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[98vw] gap-3 p-4 sm:w-[26vw] sm:grid-cols-2">
                {components.map(
                  (component) =>
                    !isActive(component.group) && (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    )
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/report" className={navigationMenuTriggerStyle()}>
                Laporan
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="#" />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mx-2 sm:mr-6 dark:text-dark-text">
                <DropdownMenuLabel>Sudah Punya Akun?</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={toggleLoginModal}
                  className="hover:cursor-pointer dark:text-dark-link"
                >
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={toggleSignupModal}
                  className="hover:cursor-pointer dark:text-dark-link"
                >
                  Daftar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isActive("apa") && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>GB</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-2 sm:mr-6 dark:text-dark-text">
                  <DropdownMenuLabel>GalaxyBuilder-OSS</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:cursor-pointer dark:text-dark-link">
                    <Link to="/profile">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:cursor-pointer dark:text-dark-link">
                    <Link to="/profile">Pengaturan</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:cursor-pointer dark:text-dark-link">
                    <Link to="/profile">Keluar</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <RegisterModal
        isOpen={isSignupOpen}
        setIsOpen={setSignupOpen}
        toggleSignupModal={toggleSignupModal}
      />
      <LoginModal
        isOpen={isLoginOpen}
        setIsOpen={setLoginOpen}
        toggleLoginModal={toggleLoginModal}
      />
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href as string}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-200 dark:hover:bg-slate-900 hover:text-light-text dark:hover:text-dark-text",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-dark-text font-normal">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
