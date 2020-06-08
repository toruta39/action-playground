const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('repo-token')
const { graphql } = github.getOctokit(token)

exports.findReleases = async function() {
  const query = `
    query($owner: String!, $name: String!) { 
      repository(owner: $owner, name: $name) {
        nameWithOwner
        releases(last: 2, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          edges {
            node {
              tagName
            }
          }
        }
      }
    }
  `

  const result = graphql(query, {
    owner: 'rakuten-games',
    name: 'viber-play-sdk',
  })

  console.log(result)

  return result
}

exports.findPreviousRelease = async function() {
  exports.findReleases()
  return {}
}

exports.findCurrentRelease = async function() {
  exports.findReleases()
  return {}
}
