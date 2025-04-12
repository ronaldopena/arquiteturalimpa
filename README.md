# API de Gerenciamento de Tarefas

API REST para gerenciamento de tarefas desenvolvida com Node.js, TypeScript e Prisma.

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados:

```bash
npx prisma migrate dev
```

## Executando o projeto

Para desenvolvimento:

```bash
npm run dev
```

Para produção:

```bash
npm run build
npm start
```

## Endpoints da API

- `POST /tasks` - Criar uma nova tarefa
- `GET /tasks` - Listar todas as tarefas
- `GET /tasks/:id` - Buscar uma tarefa específica
- `PUT /tasks/:id` - Atualizar uma tarefa
- `DELETE /tasks/:id` - Deletar uma tarefa

## Exemplo de payload para criar/atualizar uma tarefa

```json
{
  "description": "Implementar nova funcionalidade",
  "status": "PENDING"
}
```

Status possíveis: `PENDING`, `IN_PROGRESS`, `COMPLETED`
