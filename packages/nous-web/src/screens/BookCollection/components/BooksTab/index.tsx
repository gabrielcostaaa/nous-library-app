"use client";

import { useMemo, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import type { Book } from "@/services/models";
import { api } from "@/services";

type BookFormData = {
  title: string;
  author: string;
  genre: string;
  imageUrl?: string;
  basePrice: number;
  basePriceMasked?: string;
};

export default function BooksTab() {
  const qc = useQueryClient();
  const [query, setQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: () => api.books.list(),
  });

  const formatBRL = (n: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      isFinite(n) ? n : 0
    );
  const digitsToNumber = (s: string) => {
    const onlyDigits = s.replace(/\D/g, "");
    return onlyDigits ? Number(onlyDigits) / 100 : 0;
  };

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    control: controlAdd,
    setValue: setValueAdd,
  } = useForm<BookFormData>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue,
    control: controlEdit,
  } = useForm<BookFormData>();

  const addCoverInputRef = useRef<HTMLInputElement>(null);
  const editCoverInputRef = useRef<HTMLInputElement>(null);
  const [addCoverFile, setAddCoverFile] = useState<File | null>(null);
  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);

  const addMutation = useMutation({
    mutationFn: (data: BookFormData | FormData) => api.books.register(data as any),
    onSuccess: () => {
      resetAdd();
      setAddCoverFile(null);
      setIsAddDialogOpen(false);
      qc.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BookFormData | FormData }) =>
      api.books.update(id, data as any),
    onSuccess: () => {
      resetEdit();
      setEditCoverFile(null);
      setEditingBook(null);
      qc.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.books.delete(id),
    onSuccess: () => {
      setDeletingBookId(null);
      qc.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setEditCoverFile(null);
    setValue("title", book.title);
    setValue("author", book.author);
    setValue("genre", book.genre);
    setValue("imageUrl", book.imageUrl || "");
    setValue("basePrice", book.basePrice);
    setValue("basePriceMasked", formatBRL(book.basePrice));
  };

  const onSubmitAdd = (data: BookFormData) => {
    if (addCoverFile) {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("author", data.author);
      if (data.genre) fd.append("genre", data.genre);
      fd.append("basePrice", String(data.basePrice));
      fd.append("cover", addCoverFile);
      addMutation.mutate(fd);
    } else {
      addMutation.mutate(data);
    }
  };

  const onSubmitEdit = (data: BookFormData) => {
    if (!editingBook) return;
    if (editCoverFile) {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("author", data.author);
      if (data.genre) fd.append("genre", data.genre);
      fd.append("basePrice", String(data.basePrice));
      fd.append("cover", editCoverFile);
      updateMutation.mutate({ id: editingBook.id, data: fd });
    } else {
      updateMutation.mutate({ id: editingBook.id, data });
    }
  };

  const filtered = useMemo(() => {
    if (!books) return [];
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }, [books, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">Acervo de Livros</h2>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou autor…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) {
                setAddCoverFile(null);
                resetAdd();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Livro</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitAdd(onSubmitAdd)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="add-title">Título *</Label>
                  <Input id="add-title" {...registerAdd("title", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-author">Autor *</Label>
                  <Input id="add-author" {...registerAdd("author", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-genre">Gênero</Label>
                  <Input id="add-genre" {...registerAdd("genre")} />
                </div>

                <div className="space-y-2">
                  <Label>Capa do livro</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => addCoverInputRef.current?.click()}
                    >
                      Anexar imagem
                    </Button>
                    {addCoverFile && (
                      <span className="text-sm text-muted-foreground truncate max-w-[12rem]">
                        {addCoverFile.name}
                      </span>
                    )}
                  </div>
                  <input
                    ref={addCoverInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={(e) => setAddCoverFile(e.target.files?.[0] ?? null)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="add-basePrice">Preço Base *</Label>
                  <Controller
                    name="basePriceMasked"
                    control={controlAdd}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        id="add-basePrice"
                        inputMode="numeric"
                        placeholder="R$ 0,00"
                        value={value ?? ""}
                        onChange={(e) => {
                          const num = digitsToNumber(e.target.value);
                          setValueAdd("basePrice", num, { shouldDirty: true });
                          onChange(num ? formatBRL(num) : "");
                        }}
                      />
                    )}
                  />
                  <input
                    type="hidden"
                    {...registerAdd("basePrice", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={addMutation.isPending}>
                    {addMutation.isPending ? "Salvando..." : "Salvar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-4">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] w-full rounded-xl bg-muted" />
                <div className="mt-3 h-4 w-5/6 rounded bg-muted" />
                <div className="mt-2 h-3 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : !filtered.length ? (
          <p className="py-6 text-center text-muted-foreground">
            {query ? "Nenhum resultado para sua busca." : "Nenhum livro cadastrado ainda."}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((book) => {

              return (
                <div key={book.id} className="group">
                  <div className="relative">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
                      {book.imageUrl ? (
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                          sem capa
                        </div>
                      )}
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="absolute right-2 top-2 flex gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => handleEdit(book)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => setDeletingBookId(book.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="line-clamp-2 text-sm font-medium leading-snug">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {book.author}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Dialog
        open={!!editingBook}
        onOpenChange={(open) => {
          if (!open) {
            setEditCoverFile(null);
            setEditingBook(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Livro</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Título *</Label>
              <Input id="edit-title" {...registerEdit("title", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-author">Autor *</Label>
              <Input id="edit-author" {...registerEdit("author", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-genre">Gênero</Label>
              <Input id="edit-genre" {...registerEdit("genre")} />
            </div>

            <div className="space-y-2">
              <Label>Capa do livro</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => editCoverInputRef.current?.click()}
                >
                  Anexar imagem
                </Button>
                {editCoverFile && (
                  <span className="text-sm text-muted-foreground truncate max-w-[12rem]">
                    {editCoverFile.name}
                  </span>
                )}
              </div>
              <input
                ref={editCoverInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => setEditCoverFile(e.target.files?.[0] ?? null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-basePrice">Preço Base *</Label>
              <Controller
                name="basePriceMasked"
                control={controlEdit}
                render={({ field: { value, onChange } }) => (
                  <Input
                    id="edit-basePrice"
                    inputMode="numeric"
                    placeholder="R$ 0,00"
                    value={value ?? ""}
                    onChange={(e) => {
                      const num = digitsToNumber(e.target.value);
                      setValue("basePrice", num, { shouldDirty: true });
                      onChange(num ? formatBRL(num) : "");
                    }}
                  />
                )}
              />
              <input
                type="hidden"
                {...registerEdit("basePrice", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingBook(null)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingBookId}
        onOpenChange={(open) => !open && setDeletingBookId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este livro? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingBookId && deleteMutation.mutate(deletingBookId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Removendo..." : "Remover"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
