nest g controller  

--helper  (veja os comandos que você pode usar)
--dry-run (verifica como ficaria a estrutura)
--no-spec (ele não cria o arquivo de test)


app.useGlobalPipes(new ValidationPipe()) e adicionado no main do projeto, serve para validar os dados que estamos recebendo nas requisição
npm i class-validator class-transformer