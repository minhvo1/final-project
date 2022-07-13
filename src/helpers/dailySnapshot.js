

const schedule = require('node-schedule')




schedule.scheduleJob('*/5 * * * * *', () => {

  console.log('test')

})