

var Env = function(teamA, teamB) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.block_colors = [];
};


Env.prototype.add_block_color = function(color) {
    this.block_colors.append(color);
}


exports.Env = Env;

