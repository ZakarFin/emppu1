define(function() {
    return function(game) {
    	return {
			preload : function() {
				game.load.image('startscreen', 'images/startscreen.png');
			},
			create : function() {
					var text = "Hypi esteiden yli välilyönnillä.\nAloita painamalla välilyöntiä";
					var style = { font: "32px Arial", fill: "#ff0000", align: "center" };

					var t = game.add.text(game.width / 2, game.height / 2, text, style);
					t.anchor.setTo(0.5, 0.5);
					var sprite = game.add.sprite(0, 0, "startscreen");
					sprite.name = 'Startscreen';
					//sprite.scale.setTo(scales.x * 0.90, scales.y * 0.90);
			},
			update : function() {
		        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		        {
	            	game.state.start('play', true, true);
		        }
			}

    	}
    }
});