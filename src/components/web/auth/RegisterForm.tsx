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
import { api } from "@/routes/api.$";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

// Formulier schema
const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: "Voornaam moet minimaal 2 karakters lang zijn.",
  }),
  lastname: z.string().min(2, {
    message: "Achternaam moet minimaal 2 karakters lang zijn.",
  }),
  email: z.string().email({
    message: "Ongeldig emailadres.",
  }),
  mobile: z.string().min(10, {
    message: "Telefoonnummer moet minimaal 10 karakters lang zijn.",
  }),
  password: z.string().min(8, {
    message: "Wachtwoord moet minimaal 8 karakters lang zijn.",
  }),
});

export function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {

      const response = await api.api.auth.register.post(data);

      if (response.error) {
        toast.error(response.error.value.error.message || "Registratie mislukt.");
        return;
      }

      // Succesvolle registratie
      toast.success("Succesvol geregistreerd! Je wordt doorgestuurd naar de inlogpagina...");
      navigate({ to: "/auth/login" });
    } catch (error) {
      toast.error("Er is iets misgegaan. Probeer het later opnieuw.");
    }
  }

  return (
    <div className="pt-20">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Registreren</CardTitle>
          <CardDescription className="text-center">
            Vul je gegevens in om een account aan te maken.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voornaam</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achternaam</FormLabel>
                    <FormControl>
                      <Input placeholder="Janssen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefoonnummer</FormLabel>
                    <FormControl>
                      <Input placeholder="0612345678" {...field} />
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
                Registreren
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
