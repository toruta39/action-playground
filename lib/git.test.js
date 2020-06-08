const {getChangelist} = require('./git')

test('changelist returns an array', async () => {
  const result = await getChangelist('master', 'develop')
  expect(Array.isArray(result)).toBe(true)
})

