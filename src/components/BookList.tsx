import { useEffect, useState } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import { deleteBook, getBooks } from '../services/booksApi';
import type { Book, BookListProps } from '../types/book';
import BookItem from './BookItem';

type BookFilter = 'Todos' | 'Não lidos' | 'Lidos';

export default function BookList({ reloadToken }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<BookFilter>('Todos');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    setError(null);

    getBooks()
      .then((result) => {
        if (isCurrent) setBooks(result);
      })
      .catch((requestError: unknown) => {
        if (isCurrent) {
          setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os livros.');
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [reloadToken, retryToken]);

  async function handleRemove(bookId: string) {
    setRemovingId(bookId);
    setError(null);

    try {
      await deleteBook(bookId);
      setBooks((currentBooks) => currentBooks.filter((book) => book._id !== bookId));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível remover o livro.');
    } finally {
      setRemovingId(null);
    }
  }

  const visibleBooks = books.filter((book) => {
    if (filter === 'Lidos') return book.status === 'Lido';
    if (filter === 'Não lidos') return book.status === 'Não lido';
    return true;
  });
  const readCount = books.filter((book) => book.status === 'Lido').length;

  return (
    <section className="list-panel" aria-labelledby="list-title">
      <div className="list-heading">
        <div>
          <div className="panel-kicker"><span className="kicker-mark" /> Sua coleção</div>
          <h2 id="list-title">Na estante <span className="total-count">{books.length.toString().padStart(2, '0')}</span></h2>
        </div>
        <div className="reading-summary"><span>{readCount}</span> lidos <i /> <span>{books.length - readCount}</span> por ler</div>
      </div>

      <div className="list-toolbar">
        <div className="filter-tabs" role="group" aria-label="Filtrar livros">
          {(['Todos', 'Não lidos', 'Lidos'] satisfies BookFilter[]).map((option) => (
            <button
              aria-pressed={filter === option}
              className={`filter-tab${filter === option ? ' is-active' : ''}`}
              key={option}
              onClick={() => setFilter(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
        <span className="sort-caption">{visibleBooks.length} {visibleBooks.length === 1 ? 'livro' : 'livros'}</span>
      </div>

      {error && (
        <div className="request-error" role="alert">
          <p>{error}</p>
          <button onClick={() => setRetryToken((current) => current + 1)} type="button">
            <RefreshCw aria-hidden="true" size={14} /> Tentar novamente
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="list-message" role="status"><span className="loading-ring" /> Buscando sua coleção...</div>
      ) : visibleBooks.length > 0 ? (
        <ul className="book-list">
          {visibleBooks.map((book) => (
            <BookItem book={book} isRemoving={removingId === book._id} key={book._id} onRemove={handleRemove} />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon"><BookOpen aria-hidden="true" size={23} strokeWidth={1.6} /></span>
          <h3>{books.length === 0 ? 'Sua estante começa agora.' : 'Nenhum livro por aqui.'}</h3>
          <p>{books.length === 0 ? 'Cadastre um título ao lado para montar sua coleção.' : 'Escolha outro filtro para ver os livros da coleção.'}</p>
        </div>
      )}
    </section>
  );
}
