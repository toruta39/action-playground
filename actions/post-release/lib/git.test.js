const {getChangelist} = require('./git')

test('changelist returns an array', async () => {
  const result = await getChangelist('master', 'develop')
  expect(typeof result === 'string').toBe(true)
})

