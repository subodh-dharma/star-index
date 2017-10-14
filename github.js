var git = require('octonode');

var gitclient = git.client();

var ghuser = gitclient.user('subodh-dharma');
var star_summary = [];

function getRepoStarCount(ghuser) {
  return new Promise(function(resolve, reject) {
    ghuser.repos(function(error, repos, headers) {
      for (repo in repos) {
        //console.log(JSON.stringify(repos[repo], null, 4));
        var r = repos[repo];
        if (r.stargazers_count != 0) {
          star_summary.push({
            'name': r.name,
            'star_count': r.stargazers_count
          });
        }
        //console.log(JSON.stringify(star_summary, null, 4));
        //console.log("Repository: " + r.name, "\tStarred by " + r.stargazers_count + " developer(s)");
      }
      resolve(star_summary);
    });
  });

}


exports.getRepoStarCount = getRepoStarCount;
