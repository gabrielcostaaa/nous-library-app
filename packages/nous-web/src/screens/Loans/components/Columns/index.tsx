"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownLeft } from "lucide-react";
import type { Loan } from "@/services/models";

const ReturnAction = ({ loan }: { loan: Loan }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutationFn: () => api.loans.returnLoan(loan.id), //criar uma rota que marca um empréstimo como devolvido
    onSuccess: () => {
      toast.success("Empréstimo devolvido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
    onError: (error) => {
      toast.error(
        `Falha ao devolver: ${(error as Error).message || "Erro desconhecido"}`
      );
    },
  });

  if (loan.returnDate) {
    return (
      <Badge variant="secondary" className="text-xs">
        Devolvido em {format(new Date(loan.returnDate), "dd/MM/yyyy")}
      </Badge>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      <ArrowDownLeft className="mr-2 h-3.5 w-3.5" />
      {mutation.isPending ? "Devolvendo..." : "Registrar Devolução"}
    </Button>
  );
};

export const columns: ColumnDef<Loan>[] = [
  {
    accessorKey: "book.title",
    header: "Livro",
  },
  {
    accessorKey: "user.name",
    header: "Usuário",
  },
  {
    accessorKey: "loanDate",
    header: "Data do Empréstimo",
    cell: ({ row }) => format(new Date(row.original.loanDate), "dd/MM/yyyy"),
  },
  {
    accessorKey: "dueDate",
    header: "Data de Devolução",
    cell: ({ row }) => {
      const dueDate = new Date(row.original.dueDate);
      const isOverdue = !row.original.returnDate && new Date() > dueDate;
      return (
        <span className={isOverdue ? "font-semibold text-destructive" : ""}>
          {format(dueDate, "dd/MM/yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "returnedAt",
    header: "Status",
    cell: ({ row }) => {
      const { returnDate, dueDate } = row.original;
      if (returnDate) {
        return <Badge variant="default">Devolvido</Badge>;
      }
      if (new Date() > new Date(dueDate)) {
        return <Badge variant="destructive">Atrasado</Badge>;
      }
      return <Badge variant="outline">Emprestado</Badge>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <ReturnAction loan={row.original} />,
  },
];