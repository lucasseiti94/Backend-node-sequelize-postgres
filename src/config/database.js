module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'sistema',
    define: {
        timestamps: true, //created_at e updated_at são gerados automaticamente
        underscored: true, //nomes das tabelas e colunas no formato SnakeCase
        underscoredAll: true, 
    }
}