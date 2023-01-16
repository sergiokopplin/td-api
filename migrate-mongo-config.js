const config = {
  mongodb: {
    url: 'mongodb://localhost:27017',
    databaseName: 'todo-api',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs'
}

module.exports = config
