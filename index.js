const core = require('@actions/core')
const github = require('@actions/github')
const { getChangelist } = require('./lib/git')

;(async () => {
  try {
    const changelist = await getChangelist(github.context.payload.before, github.context.payload.after)
    core.setOutput('changelist', changelist)

    const watchlist = core.getInput('watchlist')
    // grep the changelist if any change occurred on watchlist
    // if so, set hit as true
    core.setOutput('hit', true)

  } catch (error) {
    core.setFailed(`${error.message}`)
  }
})()
