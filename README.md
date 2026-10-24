# Image Uploader API

API em Node.js e TypeScript que recebe uma imagem e integra o envio ao Google Cloud Storage.

A API complementa a [interface Image Uploader](https://github.com/Daniel-M30/image-uploader) e demonstra a conexão entre uma aplicação web e armazenamento de arquivos em nuvem.

## Funcionamento

1. A interface envia o arquivo como `multipart/form-data`, no campo `file`.
2. O middleware de upload encaminha o arquivo ao bucket configurado.
3. A rota retorna um objeto com a propriedade `publicUrl`.

A acessibilidade do endereço retornado depende das permissões do objeto e da configuração do Google Cloud; retornar a URL não comprova que ela esteja acessível publicamente.

## Tecnologias

Node.js, TypeScript, Express, Multer, multer-google-storage, dotenv e CORS.

## Executar localmente

### Pré-requisitos

- Node.js e npm compatíveis com as dependências. O projeto não fixa uma versão de Node.js.
- Projeto e bucket de teste no Google Cloud Storage.
- Credencial local com as permissões necessárias ao envio para esse bucket.

```sh
git clone https://github.com/Daniel-M30/image-uploader-api.git
cd image-uploader-api
npm ci
```

Copie [.env.example](.env.example) para `.env` e preencha localmente:

| Variável | Finalidade |
| --- | --- |
| `GS_BUCKET_NAME` | Nome do bucket de teste. |
| `GS_PROJECT_ID` | Identificador do projeto Google Cloud. |
| `GS_KEY_PATH` | Caminho local para o arquivo da credencial. |

Mantenha o arquivo da credencial fora do repositório. O `.env` está ignorado pelo Git; isso não protege automaticamente um arquivo JSON de credencial colocado dentro da pasta do projeto.

```sh
npm run dev
```

O servidor usa a porta `3333`, definida em [src/server.ts](src/server.ts).

## Endpoint

### POST /upload

- Corpo: `multipart/form-data`.
- Campo: `file`, com um arquivo.
- Tipos MIME aceitos pelo filtro atual: `image/jpeg`, `image/jpg` e `image/png`.

Exemplo para um terminal com cURL:

```sh
curl --request POST --form "file=@imagem.png" http://localhost:3333/upload
```

No Windows PowerShell, use `curl.exe` no lugar de `curl`.

Quando há um arquivo processado, a resposta contém `publicUrl`. Quando o middleware não fornece um arquivo à rota, ela responde com HTTP 400 e:

```json
{
  "message": "No image found!!"
}
```

O filtro MIME não substitui a validação do conteúdo do arquivo. Outros erros do armazenamento podem seguir o tratamento padrão do Express; o projeto não define um contrato próprio para eles.

## Estrutura principal

- `src/server.ts`: configuração HTTP, CORS e rota de upload.
- `src/configs/MulterStorage.ts`: integração com o bucket, nome do arquivo e filtro MIME.
- `.env.example`: nomes das variáveis necessárias, sem credenciais.

## Escopo e limitações

A documentação foi conferida contra o código, sem executar uploads nem acessar uma conta Google Cloud.

A implementação atual não define autenticação da rota, limite de tamanho de arquivo ou restrição de origem no CORS. Esses pontos, as dependências e a configuração de acesso aos arquivos precisam de revisão antes de uma implantação pública.

Não há script de testes ou de build em `package.json`; o comando disponível para iniciar a aplicação é `npm run dev`.

## Licença e contato

Consulte [LICENSE](LICENSE).

Desenvolvido por [Daniel Monteiro](https://github.com/Daniel-M30).
[Converse sobre um projeto](mailto:dvalerio.monteiro@gmail.com) · [LinkedIn](https://www.linkedin.com/in/dvalerio-monteiro).
