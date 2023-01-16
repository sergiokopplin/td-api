module.exports = {
  async up (db, client) {
    await db.collection('todos')
      .insertMany([{
        currentDate: new Date(),
        done: false,
        text: 'First Todo Text',
        workspacesId: '987123'
      },
      {
        currentDate: new Date(),
        done: false,
        text: 'Second Todo Text',
        workspacesId: '987123'
      },
      {
        currentDate: new Date(),
        done: true,
        text: 'Last Todo',
        workspacesId: '987123'
      },
      {
        currentDate: new Date(),
        done: false,
        text: 'First Todo Text',
        workspacesId: '123456'
      },
      {
        currentDate: new Date(),
        done: true,
        text: 'Last Todo',
        workspacesId: '123456'
      }])
  },
  async down (db, client) {
    await db.collection('todos').drop()
  }
}
