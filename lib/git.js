const { spawn } = require('child_process')

// const simpleGit = require('simple-git')
// const git = simpleGit()
//
// exports.getChangelist = async function (from, to) {
//   const output = await git.diff(['--name-only', from, to])
//   return output.split('\n').filter(i => i)
// }

exports.getChangelist = function (...args) {
  console.log(`dirname: ${__dirname}`)

  // const gitDiff = spawn('git', ['diff', '--name-only', ...args])
  const gitDiff = spawn('git', ['status'])

  return new Promise((resolve, reject) => {
    gitDiff.on('data', (data) => {
      console.log(data.toString())
    })

    gitDiff.on('close', () => {
      resolve([])
    })
    gitDiff.on('error', reject)
  })
}
