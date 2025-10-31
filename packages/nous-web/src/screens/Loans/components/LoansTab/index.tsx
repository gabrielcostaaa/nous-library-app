import { useQuery } from "@tanstack/react-query";
import { api } from "@/services";

import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/DataTable";
import { columns } from "../Columns";
import type { ListLoansResponse } from "@/services/LoansService/interface";

export default function LoansPage() {
  const { data, isLoading, isError, error } = useQuery<ListLoansResponse>({
    queryKey: ["loans"],
    queryFn: api.loans.list,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Carregando empréstimos...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar os dados</AlertTitle>
        <AlertDescription>
          Não foi possível buscar a lista de empréstimos. Tente novamente mais
          tarde.
          <p className="mt-2 text-xs opacity-80">
            Detalhe: {(error as Error).message}
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Gerenciamento de Empréstimos
        </h1>
        <p className="text-muted-foreground">
          Visualize e administre todos os empréstimos da biblioteca.
        </p>
      </div>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
