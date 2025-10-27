import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "@/shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function BooksTab() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["books"], queryFn: api.listBooks });

  const { register, handleSubmit, reset } =
    useForm<{ title: string; price: number }>();

  const m = useMutation({
    mutationFn: (d: { title: string; price: number }) => api.registerBook(d),
    onSuccess: () => { reset(); qc.invalidateQueries({ queryKey: ["books"] }); }
  });

  return (
    <div className="grid gap-4">
      <Card className="p-4 space-y-2">
        <h2 className="font-medium">Cadastrar Livro</h2>
        <form className="flex gap-2"
          onSubmit={handleSubmit((d) => m.mutate({ ...d, price: Number(d.price) }))}>
          <Input placeholder="Título" {...register("title")} />
          <Input placeholder="Preço base" type="number" step="0.01" {...register("price")} />
          <Button type="submit" disabled={m.isPending}>Salvar</Button>
        </form>
      </Card>

      <Card className="p-4">
        <h2 className="font-medium mb-2">Livros</h2>
        <ul className="list-disc pl-5">
          {q.data?.map(b => (
            <li key={b.id}>{b.title} — R${b.price.toFixed(2)}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
