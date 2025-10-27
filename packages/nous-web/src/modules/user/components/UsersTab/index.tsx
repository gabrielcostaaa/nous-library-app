import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6).optional(), // só para admin
  makeAdmin: z.boolean().default(false),
});
type FormData = z.infer<typeof Schema>;

export default function UsersTab() {
  const { register, handleSubmit, watch, reset, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(Schema), defaultValues: { makeAdmin: false } });

  const m = useMutation({
    mutationFn: async (d: FormData) => {
      if (d.makeAdmin) {
        return api.createAdmin({ email: d.email, password: d.password! });
      }
      return api.createUser({ name: d.name, email: d.email });
    },
    onSuccess: () => reset(),
  });

  const isAdmin = watch("makeAdmin");

  return (
    <Card className="p-4 space-y-3">
      <h2 className="font-medium">Cadastro de Usuário</h2>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-3"
        onSubmit={handleSubmit((d) => m.mutate(d))}>
        <Input placeholder="Nome" {...register("name")} />
        <Input placeholder="E-mail" type="email" {...register("email")} />
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" {...register("makeAdmin")} />
          <span>Admin</span>
        </label>
        {isAdmin && (
          <Input placeholder="Senha (admin)" type="password" {...register("password")} />
        )}
        <div className="md:col-span-3">
          <Button type="submit" disabled={m.isPending}>Salvar</Button>
        </div>
      </form>
      {(errors.name || errors.email) && <p className="text-xs text-red-500">Revise os campos</p>}
    </Card>
  );
}
