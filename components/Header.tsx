"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

const Header = () => {
  const onClick = () => {
    logout();
  };

  return ( 
    <header className="bg-white p-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">E-Commerce</h1>
        <Button onClick={onClick}>Logout</Button>
      </div>
    </header>
   );
}
 
export default Header;