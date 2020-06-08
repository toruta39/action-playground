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

  const gitDiff = spawn('git', ['diff', '--name-only', ...args])

  return new Promise((resolve, reject) => {
    const result = [] 
    gitDiff.stdout.on('data', (data) => {
      result.push(...(data.toString().split('\n')))
    })

    gitDiff.on('close', () => {
      resolve(result.filter(i => i))
    })
    gitDiff.on('error', reject)
  })
}
