//var github = require('./github.js');
var git = require('octonode').client();
var star_summary = [];
var username = '';
if (process.argv.slice(2)[0]) {
  username = process.argv.slice(2)[0];
} else {
  console.log('Missing Arguments! \n  Usage: node main.js <github-user-name>');
  process.exit(1);
}

var ghuser = git.user(username);

getRepoStarCount(ghuser).then(function(star_summary) {

  // sorting the array in decreasing order of star gazers.
  star_summary.sort(function(a, b) {
    return b.star_count - a.star_count;
  });

  console.log(JSON.stringify(star_summary, null, 4));

  var sindex = 0;
  for (star in star_summary) {
    if ((parseInt(star) + 1) <= star_summary[star].star_count) {
      sindex++;
    } else {
      break;
    }
  }
  console.log('Star Index :', sindex);

});

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
