import { AppSidebar } from "../app-sidebar/page";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex ">
        <AppSidebar />
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
