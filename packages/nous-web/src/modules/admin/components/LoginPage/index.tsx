import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/shared/api";
import { saveToken } from "@/shared/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const m = useMutation({
    mutationFn: (data: FormData) => api.adminLogin(data.email, data.password),
    onSuccess: ({ token }) => {
      saveToken(token);
      nav("/");
    },
  });

  return (
    <div className="min-h-svh flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <form
          className="space-y-3"
          onSubmit={handleSubmit((d) => m.mutate(d))}
        >
          <div>
            <Input placeholder="email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
          <div>
            <Input placeholder="senha" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>
          <Button disabled={isSubmitting || m.isPending} type="submit" className="w-full">
            Entrar
          </Button>
          {m.isError && <p className="text-red-500 text-xs">{(m.error as Error).message}</p>}
        </form>
      </Card>
    </div>
  );
}
