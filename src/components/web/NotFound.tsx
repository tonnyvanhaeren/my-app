import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { House } from 'lucide-react';

export function NotFound() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-1 mt-15">
        <h1 className="text-3xl text-orange-500">404</h1>
        <p className="text-2xl">Pagina niet gevonden</p>
        <Link to="/">
          <Button className="mt-3" size={'lg'} variant={"default"}><House /> Terug naar home</Button>
        </Link>

        {/* <a
          href="/"
          style={{
            marginTop: '1rem',
            padding: '0.6rem 1.2rem',
            borderRadius: '999px',
            border: '1px solid #ddd',
            textDecoration: 'none',
            color: '#111',
            background: '#f7f7f7',
          }}
        >
          Terug naar home
        </a> */}
      </div>

    </>

  )
}
