var github = require('./github.js');
var git = require('octonode').client();

var username = '';
if (process.argv.slice(2)[0]) {
    username = process.argv.slice(2)[0];
} else {
    console.log('Missing Arguments! \n  Usage: node main.js <github-user-name>');
    process.exit(1);
}

var ghuser = git.user(username);

github.getRepoStarCount(ghuser).then(function(star_summary) {

    // sorting the array in decreasing order of star gazers.
    star_summary.sort(function(a, b) {

        return b.star_count - a.star_count;
    });

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
