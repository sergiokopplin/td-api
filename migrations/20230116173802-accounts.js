module.exports = {
  async up (db, client) {
    await db.collection('accounts')
      .insertMany([{
        name: 'John',
        email: 'john@doe.com',
        password: '123asdqwe!@#',
        passwordConfirmation: '123asdqwe!@#',
        accessToken: 'f8e66fdb-44f3-4b90-a88e-79961fa1d3f0'
      },
      {
        name: 'Johnny',
        email: 'johnny@deo.com',
        password: '123asdqwe!@#',
        passwordConfirmation: '123asdqwe!@#'
      }])
  },
  async down (db, client) {
    await db.collection('accounts').drop()
  }
}
