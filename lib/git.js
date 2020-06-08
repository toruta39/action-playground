const simpleGit = require('simple-git')
const git = simpleGit()

exports.getChangelist = async function (from, to) {
  const output = await git.diff(['--name-only', from, to])
  return output.split('\n').filter(i => i)
}
