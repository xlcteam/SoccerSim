var gamejs = require('gamejs');

var Env = function(teamA, teamB, field_size, display) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.block_colors = [];

    this.field_size = field_size;
    this.width = field_size[0];
    this.height = field_size[1];

    this.display = display;

    this.surface = new gamejs.surfacearray.SurfaceArray(this.display);

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
    var rgb_color = new Array(3);
    //rgb_color[0] = parseInt(color[1]) *
    this.block_colors.push(color);
}


exports.Env = Env;

