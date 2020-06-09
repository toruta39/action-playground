const core = require('@actions/core')
const github = require('@actions/github')
const { match } = require('minimatch')

const { getChangelist } = require('./lib/git')

;(async () => {
  try {
    const changelist = await getChangelist(github.context.payload.pull_request.base.ref, github.context.payload.pull_request.head.ref)
    core.setOutput('changelist', changelist)

    let hit = false
    const patterns = core.getInput('watchlist').split('\n')
    const filelist = changelist.split('\n')
    for (const pattern of patterns) {
      if (!pattern) { continue }

      if (match(filelist, pattern).length > 0) {
        hit = true
        break
      }
    }
    core.setOutput('hit', hit)

  } catch (error) {
    core.setFailed(`${error.message}: ${error.stack}`)
  }
})()
