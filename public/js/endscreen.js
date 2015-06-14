define(function() {
    return function(game) {
    	return {
			preload : function() {
				game.load.image('endscreen', 'images/endscreen.png');
				game.load.image('tausta.loppu', 'images/tausta.loppu.jpg');
				game.load.image('coin', 'images/kolikko.png');
			},
			create : function() {
					var bg = game.add.sprite(0, 0, "tausta.loppu");
					bg.name = 'EndscreenBG';

					var sprite = game.add.sprite(100, 100, "endscreen");
					sprite.name = 'Endscreen';

			        var emitter = game.add.emitter(game.width / 2, game.world.centerY, 200);
			        emitter.makeParticles('coin');
			        emitter.gravity = 100;
			        emitter.minParticleScale = 0.3;
			        emitter.maxParticleScale = 0.3;
	        		emitter.start(true, 5000, null, 25);

					//sprite.scale.setTo(scales.x * 0.90, scales.y * 0.90);
			},
			update : function() {
		        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		        {
	            	game.state.start('title', true, true);
		        }
			}

    	}
    }
});