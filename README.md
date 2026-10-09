# Entrelinhas | Catálogo de livros

Aplicação React + TypeScript para organizar uma coleção de livros. A interface permite listar, cadastrar e remover registros armazenados na API CrudCrud.

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm
- Uma URL ativa gerada em [crudcrud.com](https://crudcrud.com)

## Configuração

1. Gere uma URL de API no CrudCrud. A URL inclui uma chave única e temporária.
2. Copie `.env.example` para `.env.local`.
3. Substitua o valor de `VITE_CRUDCRUD_URL` pela URL recebida, sem acrescentar `/books`.
4. Instale as dependências e inicie o servidor:

```sh
npm install
npm run dev
```

O catálogo usa o recurso `/books`, criado automaticamente pelo primeiro cadastro. Como as URLs do CrudCrud expiram, atualize a variável quando a chave deixar de funcionar. Não publique sua chave pessoal em um repositório público; `.env.local` já está ignorado pelo Git.

## Comandos

- `npm run dev`: servidor local de desenvolvimento.
- `npm run build`: checagem estrita do TypeScript e build de produção.
- `npm run preview`: visualiza localmente o build gerado.

## Tipos e componentes

- `src/types/book.ts`: modelo `Book`, `NewBook`, status e props/estado do formulário e lista.
- `src/services/booksApi.ts`: funções tipadas de leitura, criação e remoção via Fetch API.
- `src/components/BookList.tsx`: busca e exibe registros, filtra por status e coordena remoções.
- `src/components/BookForm.tsx`: valida campos obrigatórios e envia novos livros.
- `src/components/BookItem.tsx`: apresenta um registro e oferece a ação de remoção.

## Publicação no GitHub

Crie um repositório público vazio no GitHub, inicialize e envie este projeto com Git. Configure `VITE_CRUDCRUD_URL` nas variáveis de ambiente do serviço de hospedagem; não envie `.env.local` ao repositório. O link do repositório precisa ser compartilhado na plataforma de entrega.
