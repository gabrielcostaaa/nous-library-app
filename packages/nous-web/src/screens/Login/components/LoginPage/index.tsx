import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { saveToken } from "@/shared/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services";

const schema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [params] = useSearchParams();
  const roleParam = (params.get("role") === "admin" ? "admin" : "user") as "admin" | "user";
  const isAdmin = roleParam === "admin";

  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const ui = useMemo(() => {
    return isAdmin
      ? {
        title: "Acesso Administrativo",
        subtitle: "Entre com seu e-mail e senha para gerenciar a biblioteca.",
        emailPlaceholder: "admin@nous.com",
        successRedirect: "/",
      }
      : {
        title: "Acesso ao Portal",
        subtitle: "Faça login para acompanhar empréstimos e catálogo.",
        emailPlaceholder: "seu@email.com",
        successRedirect: "/",
      };
  }, [isAdmin]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const m = useMutation({
    mutationFn: (data: FormData) =>
      isAdmin
        ? api.admin.login({ email: data.email, password: data.password })
        : api.user.login({ email: data.email, password: data.password }),
    onSuccess: ({ access_token }: { access_token: string }) => {
      saveToken(access_token);
      toast.success("Login realizado com sucesso!");
      nav(ui.successRedirect);
    },
    onError: (error) => {
      toast.error((error as Error).message || "E-mail ou senha inválidos.");
    },
  });

  return (
    <div className="min-h-screen flex font-sans bg-background">
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden text-primary-foreground"
        style={{ backgroundColor: "#2B3A67" }}
      >
        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#2B3A67" }} />
            </div>
            <h1 className="text-xl font-semibold text-white">Nous Library</h1>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl text-white mb-6 leading-tight">🏛️ Nous Library App</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              "A biblioteca como o ato sereno de contemplar a essência"
            </p>
          </div>

          <div className="flex justify-between items-center text-white/70 text-sm">
            <span>Copyright © {new Date().getFullYear()} Nous Library.</span>
            <span className="cursor-pointer hover:text-white/90">Política de Privacidade</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#2B3A67" }}
            >
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Nous Library</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl text-foreground">{ui.title}</h2>
              <p className="text-muted-foreground">{ui.subtitle}</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit((d) => m.mutate(d))}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={ui.emailPlaceholder}
                  className="h-12"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="h-12 pr-10"
                    {...register("password")}
                    aria-invalid={!!errors.password}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-12 text-sm font-medium" disabled={isSubmitting || m.isPending}>
                {isSubmitting || m.isPending ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground">
              {isAdmin ? (
                <>
                  Não é admin?{" "}
                  <Link className="underline hover:opacity-80" to="/login?role=user">
                    Entrar como usuário
                  </Link>
                </>
              ) : (
                <>
                  É administrador?{" "}
                  <Link className="underline hover:opacity-80" to="/login?role=admin">
                    Acessar painel
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
