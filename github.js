var git = require('octonode');

var gitclient = git.client();

var ghuser = gitclient.user('subodh-dharma');


function getRepoStarCount(ghuser) {
    return new Promise(function(resolve, reject) {
        ghuser.repos(function(error, repos, headers) {
            for (repo in repos) {
                //console.log(JSON.stringify(repos[repo], null, 4));
                var r = repos[repo];
                console.log("Repository: " + r.name, "\tStarred by " + r.stargazers_count + " developer(s)");
            }
            resolve(repos);
        });
    });

}


exports.getRepoStarCount = getRepoStarCount;
