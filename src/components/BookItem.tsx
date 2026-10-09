import { BookOpen, Check, Trash2 } from 'lucide-react';
import type { BookItemProps } from '../types/book';

export default function BookItem({ book, isRemoving, onRemove }: BookItemProps) {
  const isRead = book.status === 'Lido';

  return (
    <li className="book-row">
      <div className={`book-mark ${isRead ? 'mark-read' : 'mark-unread'}`} aria-hidden="true">
        {isRead ? <Check size={19} strokeWidth={2.2} /> : <BookOpen size={19} strokeWidth={1.8} />}
      </div>
      <div className="book-copy">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
      <span className={`book-status ${isRead ? 'status-read' : 'status-unread'}`}>
        <span className="status-dot" />{book.status}
      </span>
      <button
        aria-label={`Remover ${book.title}`}
        className="remove-button"
        disabled={isRemoving}
        onClick={() => void onRemove(book._id)}
        title="Remover livro"
        type="button"
      >
        <Trash2 aria-hidden="true" size={17} />
      </button>
    </li>
  );
}
