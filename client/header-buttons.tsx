'use client';

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeaderButtons() {
  const pathname = usePathname();
  
  // Hide login button when user is on login page or authenticated pages
  const ShowLoginButton = pathname !== '/login' && !pathname.startsWith('/dashboard');
  
  if (!ShowLoginButton) {
    return null;
  }
  
  return (
    <Button variant="outline" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}