
## Ejecutar Localmente

- Clonar el repositorio

```bash
  git clone https://github.com/lordfomalhaut/prueba-tecnica-BRM.git
```

- Ir a la carpeta del proyecto

```bash
  cd my-project
```

- Instalar las dependencias

```bash
  npm install
```

### Configuración

- Modificar ```config/config.json```
```bash
    {
      "development": {
        "username": "db_user", // modificar aqui el usuario de mysql
        "password": "db_pass", // modificar aqui la clave
        "database": "db_name", // modificar aqui el nombre de la base de datos que se creara con las migraciones
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "test": {
        "username": "db_user",
        "password": "db_pass",
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "db_user",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }

```

- Crear la base de datos

```
  npx sequelize-cli db:create
```

- Ejecutar las migraciones para crear las tablas

```
  npx sequelize-cli db:migrate
```

- Ejecutar los seeders para generar usuarios, productos y roles de prueba

```
  npx sequelize-cli db:seed:all 
```

- Configurar el archivo ```.env```

```
  PORT=3000
  JWT_SECRET=cambiar_secret
  JWT_EXPIRES=1d
  NODE_ENV=development
```

- Iniciar el servidor

```bash
  npm run dev
```

### Documentación

- Generar la documentación

```
  npm run docs
```

- Enlace a la documentación

```
  http://localhost:3000/docs
```

