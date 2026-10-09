export type ReadingStatus = 'Lido' | 'Não lido';

export interface Book {
  _id: string;
  title: string;
  author: string;
  status: ReadingStatus;
}

export type NewBook = Omit<Book, '_id'>;

export interface BookFormState {
  title: string;
  author: string;
  status: ReadingStatus;
}

export interface BookFormProps {
  onBookCreated: () => void;
}

export interface BookItemProps {
  book: Book;
  isRemoving: boolean;
  onRemove: (bookId: string) => Promise<void>;
}

export interface BookListProps {
  reloadToken: number;
}
