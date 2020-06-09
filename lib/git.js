const { spawn } = require('child_process')

// const simpleGit = require('simple-git')
// const git = simpleGit()
//
// exports.getChangelist = async function (from, to) {
//   const output = await git.diff(['--name-only', from, to])
//   return output.split('\n').filter(i => i)
// }

exports.getChangelist = function (...args) {
  console.log(`cwd: ${process.env.GITHUB_WORKSPACE}`)

  const gitDiff = spawn('git', ['diff', '--name-only', ...args], { cwd: process.env.GITHUB_WORKSPACE })

  return new Promise((resolve, reject) => {
    const result = [] 
    gitDiff.stdout.on('data', (data) => {
      result.push(...(data.toString().split('\n')))
    })

    gitDiff.on('close', () => {
      console.log(result)
      resolve(result.filter(i => i))
    })
    gitDiff.on('error', reject)
  })
}
