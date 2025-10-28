import { useMemo, useRef } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
};

const MOCK: Book[] = [
  {
    id: "1",
    title: "A República",
    author: "Platão",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=640&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Ética a Nicômaco",
    author: "Aristóteles",
    cover:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=640&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Meditações",
    author: "Marco Aurélio",
    cover:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=640&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Discurso do Método",
    author: "Descartes",
    cover:
      "https://images.unsplash.com/photo-1544937950-fa07a98d237f?q=80&w=640&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Crítica da Razão Pura",
    author: "Immanuel Kant",
    cover:
      "https://images.unsplash.com/photo-1520170359210-6c51a69f9a4a?q=80&w=640&auto=format&fit=crop",
  },
];

export function BookCarousel() {
  // em produção, troque MOCK pelo seu fetch via TanStack Query
  const items = useMemo(() => MOCK, []);
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section id="destaques" className="py-8">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Destaques da Biblioteca</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-360)}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(360)}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none]"
        >
          {items.map((b) => (
            <article
              key={b.id}
              className="min-w-[240px] max-w-[240px] flex-shrink-0 rounded-xl border bg-card shadow-sm"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-t-xl">
                <img
                  src={b.cover}
                  alt={b.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 p-3">
                <h3 className="line-clamp-2 font-medium">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.author}</p>
                <button className="mt-2 w-full rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90">
                  Ver detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
