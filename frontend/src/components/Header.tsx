import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const Header = () => {
  return (
    <header className="w-screen h-[20vh] flex flex-col items-center justify-between sticky top-0 bg-white bg-opacity-40 backdrop-blur-md p-2">
      <h1 className="text-2xl font-bold uppercase">Money Meter</h1>
      <NavigationMenu className="">
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className="font-regular hover:underline hover:font-bold">
                Dashbord
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-regular hover:underline hover:font-bold">
              Transaksi
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <li className="hover:underline">
                  <NavigationMenuLink>Buat Transaksi</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink>Lihat Transaksi</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs">
              <NavigationMenuLink className="font-regular hover:underline hover:font-bold">
                Laporan
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <li className="hover:underline">
                  <NavigationMenuLink>Buat Transaksi</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink>Lihat Transaksi</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
