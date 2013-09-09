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

Env.prototype.update_surface = function() {
    this.surface = new gamejs.surfacearray.SurfaceArray(this.display);
}

Env.prototype.add_block_color = function(color) {
    var rgb_color = new Array(4);
    rgb_color[0] = parseInt(color[1], 16) * 16 + parseInt(color[2], 16);
    rgb_color[1] = parseInt(color[3], 16) * 16 + parseInt(color[4], 16);
    rgb_color[2] = parseInt(color[5], 16) * 16 + parseInt(color[6], 16);
    rgb_color[3] = 255;
    this.block_colors.push(rgb_color);
}


exports.Env = Env;

