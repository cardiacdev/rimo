import { ListContainer } from "./_components/list-container";

export default async function Home() {
  // TODO - prefetch character list

  return (
    <main className="flex min-h-screen bg-background">
      <div className="container flex pt-10 ">
        <ListContainer />
      </div>
    </main>
  );
}
