import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTreaty } from "@/routes/api.$";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

// Formulier schema
const FormSchema = z.object({
  email: z.email({
    message: "Ongeldig emailadres.",
  }),
  password: z.string().min(8, {
    message: "Wachtwoord moet minimaal 8 karakters lang zijn.",
  }),
});

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const api = getTreaty();
      const response = await api.auth.login.post(data);

      if (response.error) {
        toast.error(response.error.value.message || "Ongeldige email of wachtwoord.");
        return;
      }

      // Succesvol ingelogd
      toast.success("Succesvol ingelogd! Je wordt doorgestuurd...");
      navigate({ to: "/" });
    } catch (error) {
      toast.error("Er is iets misgegaan. Probeer het later opnieuw.");
    }
  }

  return (
    <div className="pt-20">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Inloggen</CardTitle>
          <CardDescription className="text-center">
            Vul je gegevens in om in te loggen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="voorbeeld@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wachtwoord</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Inloggen
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
