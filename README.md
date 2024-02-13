EL objetivo es crear una aplicacion para aprender arquitectura limpia , repository pattern y patrones en general con typescript

preferible utilizar docker para levantar las bases de datos mongodb y postgreSQL

se utiliza fileSystem, mongodb y postgreSQL como sistemas de persistencia para experimentar el poder del patron repositorio

# dev

1. clonar el archivo env.template a .env
2. configurar variables de entorno para nodejs postgreSQL, mongodb y el key de correo electronico
3. obtener el gmail key con su cuenta de google en app paswords
4. ejecutar el comando `npm install`
5. elevantar las bases de datos con el comando `docker compose up -d`
6. ejecutar el comando`npm run dev`
