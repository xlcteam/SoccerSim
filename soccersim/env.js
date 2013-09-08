
var Env = function(teamA, teamB) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.block_colors = [];

    var teamAscore = 0;
    var teamBscore = 0;

    this.teamA_add_goal = function() {
        teamAscore += 1;
    }

    this.teamB_add_goal = function() {
        teamBscore += 1;
    }

    this.score = function() {
        return [teamAscore, teamBscore];
    }

};


Env.prototype.add_block_color = function(color) {
    this.block_colors.append(color);
}


exports.Env = Env;

