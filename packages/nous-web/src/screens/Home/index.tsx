import { useQuery } from '@tanstack/react-query';

type Repo = {
  stargazers_count: number;
  forks_count: number;
  open_issues: number;
  html_url: string;
  full_name: string;
};

export default function Home() {
  const repo = useQuery({
    queryKey: ['tanstack-query-repo'],
    queryFn: async (): Promise<Repo> => {
      const r = await fetch('https://api.github.com/repos/TanStack/query');
      if (!r.ok) throw new Error('Falha ao buscar repo');
      return r.json();
    },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Home</h1>

      {repo.isLoading && <p>Carregando…</p>}
      {repo.isError && <p className="text-red-500">{(repo.error as Error).message}</p>}

      {repo.isSuccess && (
        <div className="rounded border p-4">
          <p>
            <a className="underline" href={repo.data.html_url} target="_blank" rel="noreferrer">
              {repo.data.full_name}
            </a>
          </p>
          <ul className="text-sm mt-2 list-disc pl-5">
            <li>⭐ Stars: {repo.data.stargazers_count}</li>
            <li>🍴 Forks: {repo.data.forks_count}</li>
            <li>🐞 Issues abertas: {repo.data.open_issues}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
