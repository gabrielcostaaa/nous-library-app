import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>
      <Link to="/" className="underline">Voltar para Home</Link>
    </div>
  );
}
