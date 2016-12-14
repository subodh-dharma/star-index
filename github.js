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
                star_summary.push({
                    'name': r.name,
                    'star_count': r.stargazers_count
                });
                //console.log("Repository: " + r.name, "\tStarred by " + r.stargazers_count + " developer(s)");
            }
            resolve(star_summary);
        });
    });

}


exports.getRepoStarCount = getRepoStarCount;
