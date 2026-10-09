import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { createBook } from '../services/booksApi';
import type { BookFormProps, BookFormState, ReadingStatus } from '../types/book';

const initialFormState: BookFormState = {
  title: '',
  author: '',
  status: 'Não lido',
};

export default function BookForm({ onBookCreated }: BookFormProps) {
  const [formState, setFormState] = useState<BookFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<Key extends keyof BookFormState>(key: Key, value: BookFormState[Key]) {
    setFormState((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createBook({
        title: formState.title.trim(),
        author: formState.author.trim(),
        status: formState.status,
      });
      setFormState(initialFormState);
      onBookCreated();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível cadastrar o livro.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-panel" aria-labelledby="form-title">
      <div className="panel-kicker"><span className="kicker-mark" /> Novo registro</div>
      <h2 id="form-title">Mais uma história para guardar.</h2>
      <p className="form-intro">Adicione um livro à sua estante pessoal.</p>

      <form onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="book-title">Título</label>
        <input
          autoComplete="off"
          id="book-title"
          maxLength={120}
          onChange={(event) => updateField('title', event.currentTarget.value)}
          placeholder="Ex.: A vida invisível de Addie LaRue"
          required
          value={formState.title}
        />

        <label className="field-label" htmlFor="book-author">Autor(a)</label>
        <input
          autoComplete="off"
          id="book-author"
          maxLength={100}
          onChange={(event) => updateField('author', event.currentTarget.value)}
          placeholder="Ex.: V. E. Schwab"
          required
          value={formState.author}
        />

        <fieldset className="status-fieldset">
          <legend className="field-label">Status de leitura</legend>
          <div className="status-options">
            {(['Não lido', 'Lido'] satisfies ReadingStatus[]).map((status) => (
              <label className={`status-option${formState.status === status ? ' is-selected' : ''}`} key={status}>
                <input
                  checked={formState.status === status}
                  name="status"
                  onChange={() => updateField('status', status)}
                  type="radio"
                  value={status}
                />
                <span className={`status-dot ${status === 'Lido' ? 'dot-read' : 'dot-unread'}`} />
                {status}
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button className="submit-button" disabled={isSubmitting} type="submit">
          <Plus aria-hidden="true" size={18} strokeWidth={2.5} />
          {isSubmitting ? 'Salvando...' : 'Adicionar à estante'}
        </button>
      </form>
      <div className="form-footnote"><span aria-hidden="true">✳</span> Sua próxima leitura começa aqui.</div>
    </section>
  );
}
