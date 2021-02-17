module.exports = {
  "type": "mysql",
  "host": process.env.DB_HOST || "localhost",
  "port": 3306,
  "username": "root",
  "password": "RootPassword",
  "database": "Tasklist",
  "migrationsTableName": "custom_migration_table",
  "migrations": [
    "./dist/database/migration/*{.ts,.js}"
  ],        
  "migrationsRun": true,
  "entities": [
    "./dist/**/*.entity{.ts,.js}"
  ],
  "synchronize": true,
  "autoLoadEntities": true,
  "logging": true
};