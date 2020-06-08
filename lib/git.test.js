const {getChangelist} = require('./git')

;(async() => {
  await getChangelist('master', 'develop')
})()
