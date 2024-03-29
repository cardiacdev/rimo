import { getServerAuthSession } from "~/server/auth";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { NavigationLinks } from "./navigation-links";
import { buttonVariants } from "~/components/ui/button";

export const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-x-4">
          <Link href={"/"} className="hidden sm:block">
            <span className="text-2xl font-bold">RI</span>
            <span className="text-2xl font-bold text-primary">MO</span>
          </Link>
          <NavigationLinks />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4 ">
          <nav className="flex items-center space-x-4">
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className={buttonVariants({ variant: "outline" })}
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
