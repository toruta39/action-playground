const simpleGit = require('simple-git')
const git = simpleGit()

exports.getChangelist = async function (from, to) {
  const result = await git.diff(['--name-only', from, to])

  console.log(result)

  return ''
}
