import type { Book, NewBook } from '../types/book';

const apiBaseUrl = import.meta.env.VITE_CRUDCRUD_URL?.replace(/\/+$/, '');

function getBooksUrl(): string {
  if (!apiBaseUrl) {
    throw new Error('Configure a variável VITE_CRUDCRUD_URL no arquivo .env.local.');
  }

  return `${apiBaseUrl}/books`;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `A API respondeu com erro (${response.status}).`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function getBooks(): Promise<Book[]> {
  return request<Book[]>(getBooksUrl());
}

export async function createBook(book: NewBook): Promise<Book> {
  return request<Book>(getBooksUrl(), {
    method: 'POST',
    body: JSON.stringify(book),
  });
}

export async function deleteBook(bookId: string): Promise<void> {
  return request<void>(`${getBooksUrl()}/${encodeURIComponent(bookId)}`, {
    method: 'DELETE',
  });
}
