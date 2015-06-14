define(['startscreen', 'game', 'endscreen'], function(Startscreen, Game, Endscreen) {

	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    width = (w.innerWidth || e.clientWidth || g.clientWidth) - 20,
	    height = (w.innerHeight|| e.clientHeight|| g.clientHeight) - 20;

	var game = new Phaser.Game(width, height, Phaser.AUTO, 'gamearea');

	// add states
    game.state.add('title', Startscreen(game), true);
    game.state.add('play', Game(game));
    game.state.add('endscreen', Endscreen(game));
    
});
