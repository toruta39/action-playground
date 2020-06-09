const core = require('@actions/core')
const github = require('@actions/github')
const { getChangelist } = require('./lib/git')

;(async () => {
  try {
    console.log(JSON.stringify(github.context.payload))
    const changelist = await getChangelist(github.context.payload.pull_request.base.ref, github.context.payload.pull_request.head.ref)
    core.setOutput('changelist', changelist)

    const watchlist = core.getInput('watchlist')
    // grep the changelist if any change occurred on watchlist
    // if so, set hit as true
    core.setOutput('hit', true)

  } catch (error) {
    core.setFailed(`${error.message}`)
  }
})()
