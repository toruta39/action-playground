const core = require('@actions/core');
const github = require('@actions/github');
const { getChangelist } = require('./lib/git')
const { findPreviousRelease, findCurrentRelease } = require('./lib/releases')

;(async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput('time', time);


    // // get the reference to previous release
    // const previous = await findPreviousRelease()
    // // get the reference to current commit
    // const current = await findCurrentRelease()

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    // get changelist
    const changelist = await getChangelist(payload.before, payload.after)

    // get watchlist input
    const watchlist = core.getInput('watchlist')
    // set changelist output
    core.setOutput('changelist', changelist)
    // grep the changelist if any change occurred on watchlist
    // if so, set hit as true
    core.setOutput('hit', true)

  } catch (error) {
    core.setFailed(`${error.message}: ${error.stack}`);
  }
})()
