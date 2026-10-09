import { useState } from 'react';
import { ArrowDownRight, LibraryBig } from 'lucide-react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

export default function App() {
  const [reloadToken, setReloadToken] = useState(0);

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Entrelinhas, início">
          <span className="brand-icon"><LibraryBig aria-hidden="true" size={19} strokeWidth={1.9} /></span>
          <span>entrelinhas<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-note"><span className="topbar-dot" /> UM LUGAR PARA CADA HISTÓRIA</div>
        <a className="topbar-link" href="#colecao">Minha coleção <ArrowDownRight aria-hidden="true" size={15} /></a>
      </header>

      <section className="intro" id="inicio">
        <div className="intro-copy">
          <p className="eyebrow"><span /> CATÁLOGO PESSOAL</p>
          <h1>Livros que ficam<br />com <em>a gente.</em></h1>
          <p className="intro-description">Um registro das histórias que já leu e das próximas que esperam por você.</p>
        </div>
        <div className="intro-aside" aria-hidden="true">
          <span className="aside-star">✳</span>
          <p>Leia no seu tempo.<br />Guarde para sempre.</p>
          <span className="aside-rule" />
        </div>
      </section>

      <div className="content-grid" id="colecao">
        <BookForm onBookCreated={() => setReloadToken((current) => current + 1)} />
        <BookList reloadToken={reloadToken} />
      </div>

      <footer className="page-footer">
        <span>ENTRELINHAS <span className="brand-period">✳</span></span>
        <span>Feito para quem nunca fecha um livro de verdade.</span>
      </footer>
    </main>
  );
}
