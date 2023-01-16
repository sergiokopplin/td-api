module.exports = {
  async up (db, client) {
    await db.collection('accounts')
      .insertMany([{
        name: 'John',
        email: 'john@doe.com',
        password: '123asdqwe!@#',
        passwordConfirmation: '123asdqwe!@#',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4IiwiaWF0IjoxNjczODkzODIzfQ.mvO706nhInka2EFdlKzs_UDdLpw83CWEMfVl_DipyV8'
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
