import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoansTab() {
  const [loanId, setLoanId] = useState<number | null>(null);

  const m = useMutation({
    mutationFn: (p: { userId: number; bookId: number; days: number }) =>
      api.registerLoan(p),
    onSuccess: ({ id }) => setLoanId(id),
  });

  const fine = useQuery({
    queryKey: ["loan", loanId, "fine"],
    queryFn: () => api.loanFine(loanId!),
    enabled: loanId != null,
  });

  const rental = useQuery({
    queryKey: ["loan", loanId, "rental"],
    queryFn: () => api.loanRental(loanId!),
    enabled: loanId != null,
  });

  return (
    <Card className="p-4 space-y-3">
      <h2 className="font-medium">Registrar Empréstimo</h2>
      <form className="grid grid-cols-1 md:grid-cols-4 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          m.mutate({
            userId: Number(fd.get("userId")),
            bookId: Number(fd.get("bookId")),
            days: Number(fd.get("days")),
          });
        }}>
        <Input name="userId" placeholder="ID usuário" type="number" />
        <Input name="bookId" placeholder="ID livro" type="number" />
        <Input name="days" placeholder="Dias" type="number" />
        <Button type="submit" disabled={m.isPending}>Emprestar</Button>
      </form>

      {loanId && (
        <div className="text-sm">
          <p>Empréstimo #{loanId}</p>
          <p>Multa: {fine.isSuccess ? `R$ ${fine.data.fine.toFixed(2)}` : "-"}</p>
          <p>Aluguel: {rental.isSuccess ? `R$ ${rental.data.rental.toFixed(2)}` : "-"}</p>
        </div>
      )}
    </Card>
  );
}
