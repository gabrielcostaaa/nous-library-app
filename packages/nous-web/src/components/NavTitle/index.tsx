import { Link } from "react-router-dom";

export default function NavTitle() {

  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <img
          src={`${import.meta.env.BASE_URL}icon.png`}
          alt="Nous Library"
          className="h-10 w-10 rounded-2xl"
        />
        <span className="font-semibold text-primary">Nous Library</span>
      </div>
    </Link>
  )
}