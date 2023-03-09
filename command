nest g controller  

--helper  (veja os comandos que você pode usar)
--dry-run (verifica como ficaria a estrutura)
--no-spec (ele não cria o arquivo de test)


app.useGlobalPipes(new ValidationPipe()) e adicionado no main do projeto, serve para validar os dados que estamos recebendo nas requisição
npm i class-validator class-transformer
npm i typeorm @nestjs/typeorm pg


migration
npx typeorm migration:create  ./src/migrations/CourseRefatoring
npx typeorm migration:revert
npx typeorm migration:run


testes
npm test -- courses.service.spec  


Execute
nest start --watch