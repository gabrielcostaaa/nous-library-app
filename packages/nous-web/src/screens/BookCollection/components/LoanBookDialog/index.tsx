"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/services";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";

import type { User, Book } from "@/services/models";
import type { RegisterLoanBody } from "@/services/LoansService/interface";

interface LoanBookDialogProps {
  book: Book | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function toLocalDatetimeValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

export function LoanBookDialog({ book, isOpen, onOpenChange }: LoanBookDialogProps) {
  const qc = useQueryClient();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return toLocalDatetimeValue(d);
  });

  useEffect(() => {
    if (isOpen) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      setDueDate(toLocalDatetimeValue(d));
      setSelectedUserId(null);
    }
  }, [isOpen, book?.id]);

  const minDue = useMemo(() => toLocalDatetimeValue(new Date()), []);

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: api.user.list,
    enabled: isOpen,
  });

  const loanMutation = useMutation({
    mutationFn: (payload: RegisterLoanBody) => api.loans.register(payload),
    onSuccess: () => {
      toast.success(`Livro "${book?.title}" emprestado com sucesso!`);
      qc.invalidateQueries({ queryKey: ["books"] });
      qc.invalidateQueries({ queryKey: ["loans"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        `Falha ao emprestar: ${(error as Error)?.message || "Erro desconhecido"}`
      );
    },
  });

  const handleSubmit = () => {
    if (!book) {
      toast.warning("Livro inválido.");
      return;
    }
    if (!selectedUserId) {
      toast.warning("Selecione um usuário.");
      return;
    }
    if (!dueDate) {
      toast.warning("Informe a data de devolução (due date).");
      return;
    }

    const dueDateISO = new Date(dueDate).toISOString();
    const payload: RegisterLoanBody = {
      bookId: book.id,
      userId: selectedUserId,
      dueDate: dueDateISO,
    };

    loanMutation.mutate(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Emprestar Livro</DialogTitle>
          <DialogDescription>
            Selecione o usuário e a data de devolução para o livro{" "}
            <span className="font-semibold text-foreground">{book?.title}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="user-select">Usuário</Label>
            {isLoadingUsers && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando usuários...
              </div>
            )}
            {isErrorUsers && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                Falha ao carregar usuários.
              </div>
            )}
            {users && (
              <Select
                onValueChange={(value) => setSelectedUserId(value)}
                disabled={loanMutation.isPending}
              >
                <SelectTrigger id="user-select">
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="due-date">Data de devolução</Label>
            <Input
              id="due-date"
              type="datetime-local"
              min={minDue}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={loanMutation.isPending}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loanMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedUserId || !dueDate || loanMutation.isPending}
          >
            {loanMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Emprestando...
              </>
            ) : (
              "Confirmar Empréstimo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
