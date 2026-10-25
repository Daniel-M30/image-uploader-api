# Image Uploader API

**API em Node.js e TypeScript para receber imagens e integrá-las ao Google Cloud Storage.**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4-3178c6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express)
![Google Cloud Storage](https://img.shields.io/badge/Google_Cloud-Storage-4285f4?logo=googlecloud&logoColor=white)
![Multer](https://img.shields.io/badge/Upload-Multer-5b5b5b)

## Sobre o projeto

A **Image Uploader API** recebe arquivos de imagem e utiliza o Google Cloud Storage para armazená-los em um bucket configurado. Ela é o back-end da [interface Image Uploader](https://github.com/Daniel-M30/image-uploader), desenvolvida em React e TypeScript.

O servidor expõe uma rota HTTP para upload. A resposta de sucesso contém o campo `publicUrl`, que representa o endereço montado pela aplicação. A acessibilidade efetiva desse endereço depende das permissões do objeto e do bucket.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| Node.js | Ambiente de execução |
| TypeScript | Tipagem |
| Express 4 | API HTTP |
| Multer e multer-google-storage | Recebimento de arquivos e integração com o bucket |
| Google Cloud Storage | Armazenamento de imagens |
| dotenv | Variáveis de ambiente |
| CORS | Middleware de acesso entre origens |

## Funcionamento do upload

1. O cliente envia uma requisição `multipart/form-data` com o campo `file`.
2. O middleware Multer recebe o arquivo e o encaminha ao armazenamento configurado.
3. A aplicação tenta construir o endereço da imagem enviada.
4. A rota responde com a propriedade `publicUrl`, caso o processamento seja concluído.

O código possui filtro de tipos MIME para JPEG e PNG. A filtragem do MIME enviado pelo cliente não equivale a verificar o conteúdo real do arquivo.

## Executando localmente

### Pré-requisitos

- Node.js e npm compatíveis com as dependências históricas (a versão do Node não está fixada).
- Um projeto no Google Cloud com bucket de teste.
- Credencial local com acesso adequado ao bucket.

### Instalação

```bash
git clone https://github.com/Daniel-M30/image-uploader-api.git
cd image-uploader-api
npm ci
```

Copie [`.env.example`](.env.example) para `.env` e preencha:

| Variável | Finalidade |
| --- | --- |
| `GS_BUCKET_NAME` | Nome do bucket |
| `GS_PROJECT_ID` | Identificador do projeto Google Cloud |
| `GS_KEY_PATH` | Caminho local até o arquivo de credencial |

**Nunca envie credenciais reais ao GitHub.** Mantenha o arquivo de credencial fora do repositório. O `.gitignore` impede o versionamento do `.env`, mas não protege automaticamente qualquer arquivo JSON colocado no diretório.

### Iniciar o servidor

```bash
npm run dev
```

A API escuta na porta `3333`, definida em [`src/server.ts`](src/server.ts).

## Endpoint

### `POST /upload`

**Corpo:** `multipart/form-data` com uma imagem no campo `file`.

**Tipos MIME aceitos no filtro atual:** `image/jpeg`, `image/jpg` e `image/png`.

Exemplo com cURL:

```bash
curl --request POST --form "file=@imagem.png" http://localhost:3333/upload
```

No Windows PowerShell, utilize `curl.exe` se `curl` estiver associado a outro comando.

Em um envio processado pela rota, a resposta tem o formato:

```json
{
  "publicUrl": "URL_RETORNADA_PELA_API"
}
```

O valor acima é apenas ilustrativo; não representa uma URL pública verificada.

Se nenhum arquivo for disponibilizado à rota, a resposta é `HTTP 400`:

```json
{
  "message": "No image found!!"
}
```

Erros do armazenamento podem não seguir esse mesmo contrato de resposta.

## Estrutura do projeto

- `src/server.ts` — Inicialização do Express, middleware e endpoint de upload.
- `src/configs/MulterStorage.ts` — Configuração do Multer, nome dos arquivos, filtro MIME e Google Cloud Storage.
- `.env.example` — Modelo de variáveis sem credenciais.

## Estado atual e cuidados de segurança

Esta documentação foi preparada pela leitura do código, sem executar uploads ou acessar uma conta Google Cloud.

- A rota de upload não possui autenticação.
- O código não define um limite explícito de tamanho para o arquivo.
- O middleware CORS é usado sem restrição de origem.
- O filtro MIME não valida os bytes do arquivo.
- A construção da URL e as permissões do armazenamento precisam de verificação prática.
- Não existem scripts de build ou testes automatizados declarados em `package.json`.
- Dependências e credenciais precisam de revisão antes de uma implantação pública.

**Não exponha esta API diretamente à internet sem revisar esses pontos.**

## Licença

O arquivo [LICENSE](LICENSE) apresenta a licença **MIT**. Entretanto, `package.json` informa `ISC`; essa divergência deve ser resolvida futuramente sem alterar a licença por suposição.

## Autor e contato

Desenvolvido por [Daniel Monteiro](https://github.com/Daniel-M30).

[Conversar sobre um projeto](mailto:dvalerio.monteiro@gmail.com) · [LinkedIn](https://www.linkedin.com/in/dvalerio-monteiro).
