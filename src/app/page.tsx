import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default async function Home() {
  return (
    <main className="flex min-h-screen bg-background">
      <div className="container flex flex-col items-center pt-10 text-center">
        <h1 className="text-6xl font-bold tracking-tighter lg:text-8xl/none">
          <span>RI</span>
          <span className="text-primary">MO</span>
        </h1>
        <p className="mx-auto mt-2 max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
          Track your favorite Rick & Morty characters and episodes in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
          <Link
            href={"/character"}
            className={cn(buttonVariants(), "p-10 text-2xl")}
          >
            Browse Characters
          </Link>
          <Link
            href={"/episode"}
            className={cn(buttonVariants(), "p-10 text-2xl")}
          >
            Browse Episodes
          </Link>
        </div>
      </div>
    </main>
  );
}
