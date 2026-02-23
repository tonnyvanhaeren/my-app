import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
import { api } from "@/routes/api.$";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";


export const Route = createFileRoute('/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {

      const response = await api.api.users.get();
      if (response.error) {
        console.log('Response ', response)
        throw new Error(response.data.error.value.error.message || "Failed to fetch users");
      }
      console.log(response)
      return response.data.data.items;
    },
  });

  if (isError) {
    toast.error("Er is een fout opgetreden bij het laden van de gebruikers.");
    return <div>Er is een fout opgetreden bij het laden van de gebruikers.</div>;
  }


  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Gebruikers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="space-y-2">
              {users?.length ? (
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li key={user.id} className="p-2 border rounded">
                      {user.firstname} {user.lastname} - {user.email}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Geen gebruikers gevonden.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
