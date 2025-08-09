import { Badge } from "../ui/badge";
import { getRoleColor, getRoleText } from "@/lib/utils";

interface UserI {
  id: string;
  email: string;
  name?: string | null;
  role: "CLIENT" | "BUSINESS";
}

export function Header({
  title,
  user,
}: {
  title: string;
  user: UserI | undefined;
}) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <Badge className={getRoleColor(user?.role || "CLIENT")}>
                {getRoleText(user?.role || "CLIENT")}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
