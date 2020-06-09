const { exec } = require('child_process')

exports.getChangelist = function (...args) {
  return new Promise((resolve, reject) => {
    exec(['git', 'diff', '--name-only', ...args].join(' '), { cwd: process.env.GITHUB_WORKSPACE }, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr)
        reject(err)
      }

      resolve(stdout)
    })
  })
}
