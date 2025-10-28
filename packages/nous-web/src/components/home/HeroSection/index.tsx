export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="text-left">
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">
            A biblioteca como o ato sereno de{" "}
            <span className="text-primary underline decoration-primary/40">contemplar a essência</span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-muted-foreground">
            Organize acervo, empréstimos e cálculos de multa de forma simples, elegante e escalável.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#destaques"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Explorar catálogo
            </a>
            <a
              href="/login"
              className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-muted"
            >
              Acesso administrativo
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-xl border bg-gradient-to-br from-secondary to-muted" />
          <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
