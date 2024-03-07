"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

export default function Home() {
  const onClick = () => {
    logout();
  };

  return (
    <main className="flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-r from-sky-300 via-sky-500 to-sky-700">
      <div>
        Welcome Home
      </div>
      <Button onClick={onClick}></Button>
    </main>
  );
}