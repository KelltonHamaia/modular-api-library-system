# 📚 Modular Library API
 
API REST para gerenciamento de uma biblioteca — livros, membros e empréstimos — construída como exercício de **arquitetura modular** em Node.js/TypeScript.
 
Este projeto foi meu primeiro mergulho prático em desenhar um backend por **capacidades de negócio** (módulos verticais) em vez de por camadas técnicas horizontais. O foco principal não foi "fazer funcionar rápido", e sim entender **onde cada regra deveria morar** e **como módulos deveriam se comunicar sem se acoplar**.
Logo, a idéia não era criar algo super mega complexo, mas sim estudar :D
 
## Stack
 
- **Node.js** + **TypeScript**
- **Express 5**
- **Drizzle ORM** + **PostgreSQL**
- **Zod** para validação de entrada
## Arquitetura
 
O projeto é organizado em módulos verticais (`books`, `members`, `loans`), cada um dividido em camadas com responsabilidade única:
 
```
modules/
  <module>/
    domain/       → tipos, regras de negócio puras (sem I/O) e contrato do repositório
    data/         → implementação concreta das queries (Drizzle)
    http/         → controllers, rotas e validação de entrada (Zod)
    <module>.service.ts → orquestra domain + data, é a única porta de entrada da lógica
    index.ts      → API pública do módulo — o único ponto por onde outro módulo pode consumir
```
 
### Regras seguidas ao longo do projeto
 
- **Nenhum módulo acessa a tabela/schema de outro diretamente.** Toda comunicação entre `loans`, `books` e `members` passa pelo `index.ts` de cada um — o "balcão" público do módulo.
- **`domain/` nunca faz I/O.** Só recebe dados já buscados e decide (valida, calcula, constrói objetos).
- **Contratos (`repository`) são definidos por quem é dono do dado**, nunca por quem consome.
- Funções seguem prefixos com significado: `find*` (pode não achar, retorna `null`), `get*` (garante o valor ou lança erro), `assert*/ensure*` (valida regra de negócio), `build*` (constrói um objeto novo), `count*` (agregação no banco).
## Endpoints
 
### Books
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/v1/books` | Cria um livro |
| `GET` | `/v1/books` | Lista todos os livros |
| `GET` | `/v1/books/:id` | Busca um livro por id |
 
### Members
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/v1/members` | Cadastra um membro (nasce com status `ACTIVE`) |
| `GET` | `/v1/members/:id` | Busca um membro por id |
| `PATCH` | `/v1/members/:id` | Atualiza o status (`ACTIVE`/`SUSPENDED`) |
 
### Loans
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/v1/loans` | Cria um empréstimo |
| `PATCH` | `/v1/loans/:id/return` | Registra a devolução |
| `GET` | `/v1/loans` | Lista empréstimos (aceita `?memberId=` para filtrar) |
 
## Regras de negócio implementadas
 
- Um membro suspenso não pode pegar livros emprestados.
- Limite de **3 empréstimos ativos** por membro.
- Um livro sem cópia disponível não pode ser emprestado.
- Um mesmo membro não pode ter dois empréstimos ativos do mesmo livro simultaneamente.
- Devolução calcula automaticamente se o empréstimo estava atrasado (`overdue`), comparando a data de devolução com o prazo (`dueDate`, calculado como 14 dias após o empréstimo).
- `availableCopies` nunca fica negativo nem ultrapassa `totalCopies` — garantido tanto na condição da query de update quanto por uma checagem de domínio logo em seguida.
## Como rodar
 
```bash
# instalar dependências
npm install
 
# configurar variáveis de ambiente
cp .env.example .env
# preencher DATABASE_URL e PORT
 
# gerar e aplicar migrations
npm run db:generate
npm run db:migrate
 
# subir em modo desenvolvimento
npm run dev
```
 
## Limitações conhecidas / próximos passos
 
Este projeto foi construído incrementalmente, com foco em aprendizado de arquitetura — por isso existem pontos conscientemente deixados para uma próxima iteração:
 
- **Nomenclatura de funções ainda não está 100% padronizada.** Em alguns pontos, o significado pretendido de `assert*`/`ensure*` não é totalmente consistente entre módulos — algo que pretendo fixar como convenção única desde o início na próxima versão. Ou em um novo projeto, nesse foquei em aprender mais sobre a arquitetura em si.
- **Sem transação cobrindo operações que tocam mais de uma tabela.** Por exemplo, criar um empréstimo e decrementar a cópia disponível são duas operações separadas — sob concorrência alta, existe uma pequena janela de inconsistência entre elas. A mitigação atual é uma condição atômica no próprio `UPDATE` (`WHERE availableCopies > 0`), que impede o valor de ficar inconsistente no nível do banco, mas não cobre o cenário completo com uma transação de verdade.
- **Sem proteção explícita contra devolver o mesmo empréstimo duas vezes.** Hoje isso só é parcialmente barrado quando o incremento de cópia atinge o limite do total.
- **Sem testes automatizados.** A arquitetura foi desenhada pensando em testabilidade (injeção de repositório via parâmetro padrão em todos os services), mas a suíte de testes em si ainda não foi escrita.
## O que eu aprenderia de novo, num v2
 
- Fixar o glossário de nomenclatura *antes* de escrever a primeira linha de código, não durante.
- Considerar uma factory por módulo para os services (`makeLoansService(repository)`), reduzindo a repetição do parâmetro padrão em cada função conforme os módulos crescem.
- Envolver `createLoan` e `returnLoan` em transações reais do Drizzle.
- Bom, esse readme eu gerei junto dos meus estudos e consultas com o Claude code, sendo um apanhado de geral. 
