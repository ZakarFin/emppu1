define(function() {
	var obs = ['tree', 'rock'];
    return function(game) {

		function getRandomObstacleName() {
			return obs[game.rnd.integerInRange(0,1)];
		}

    	this.player = undefined;
    	var speed = 5;
    	return {
			preload : function() {

				game.load.image('tausta', 'images/tausta.jpg');

				game.load.image('tree', 'images/puu.png');
				game.load.image('rock', 'images/kivi.png');
				game.load.image('dragon', 'images/dragon.png');

				game.load.image('coin', 'images/kolikko.png');

				game.load.image('castle', 'images/linna.png');
				//player
				game.load.image('player', 'images/prinssi.png');
				game.load.image('princess', 'images/prinsessa.png');

				// dragon breath
			    game.load.image('fire1', 'images/phaser/fire1.png');
			    game.load.image('fire2', 'images/phaser/fire2.png');
			    game.load.image('fire3', 'images/phaser/fire3.png');
			    game.load.image('smoke', 'images/phaser/smoke-puff.png');
			},
			create : function() {



   					game.physics.startSystem(Phaser.Physics.ARCADE);

				    //  Set the world (global) gravity
				    game.physics.arcade.gravity.y = 1000;

				    var startBufferX = 200;
				    var endBufferX = 1200;
				    var playableLength = game.width * 5;
				    var endBossX = startBufferX + playableLength;

				    //  Make the world larger than the actual canvas
				    game.world.setBounds(0, 0, startBufferX + playableLength + endBufferX, game.height);

					var bgtile = game.add.tileSprite(0, 0, 
							//game.cache.getImage('tausta').width, 
							//game.cache.getImage('tausta').height, 
							game.world.width, 
							game.world.height, 
							'tausta');
					//This sets it in the middle
					//bgtile.anchor.setTo(0.5,0.5);
					bgtile.tileScale.y = 0.7;
					bgtile.tileScale.x = 0.7;

					// Invert scale.x to flip left/right
					//bgtile.scale.x *= -1;

					var text = "Tähän tulee itse peli";
					var style = { font: "32px Arial", fill: "#ff0000", align: "center" };

					var t = game.add.text(game.width / 2, game.world.centerY, text, style);
					t.anchor.setTo(0.5, 0.5);

				    // place dragon as end boss starting at playableLength end
					var dragon = game.add.sprite(
						endBossX, game.world.centerY, "dragon");
					dragon.name = 'Dragon';
					this.dragon = dragon;

				    var emitter = game.add.emitter(dragon.x +5, dragon.y + 70, 400);
				    emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
				    emitter.setAlpha(1, 0, 3000);
				    emitter.setScale(0.8, 0, 0.8, 0, 3000);

				    // flame direction
				    emitter.minParticleSpeed.set(-200, 0);
				    emitter.maxParticleSpeed.set(-400, 0);
				    emitter.gravity = 200;

					emitter.start(false, 3000, 5);


					// place princess at the end (after dragon)
					var princess = game.add.sprite(
						game.world.width-250, game.world.height - 250, "princess");
					princess.name = 'Princess';
					this.princess = princess;

					// player at start
					var player = game.add.sprite(
						30, game.height/2, "player");
					player.name = 'Player';


				    var obstacles = game.add.group();
				    obstacles.enableBody = true;
				    obstacles.physicsBodyType = Phaser.Physics.ARCADE;
				    this.obstacles = obstacles;

				    var obstacleBuffer = 600;
				    var obstacleX = 0;
				    
				    for (var obstacleX = 0; obstacleX + (obstacleBuffer * 3) < playableLength; )
				    {
				    	obstacleX = game.rnd.integerInRange(obstacleX + obstacleBuffer, obstacleX + (obstacleBuffer * 2));
				        var c = obstacles.create(obstacleX, game.height - 150, getRandomObstacleName());
				        c.name = 'obs' + obstacleX;
				        c.body.immovable = true;
						c.body.allowGravity = false;
				    }

				    // Enable physics on those sprites
				    game.physics.enable( [ player, dragon ], Phaser.Physics.ARCADE);
					
					// body is available after physics enabling
				    player.body.collideWorldBounds = true;
				    player.body.maxVelocity.y = 1000;
					dragon.body.allowGravity = false;
					dragon.body.immovable = true;

				    //registration point
				    player.anchor.setTo(0.5, 0.5);

    				game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

					this.player = player;
			},
			update : function() {
				var player = this.player;
				var dragon = this.dragon;
				var isNearEnd = (player.x + 500 > dragon.x);

				if(player.x >= game.world.width-250) {
	            	game.state.start('endscreen', true, true);
				}
				else if(isNearEnd) {
        			player.body.velocity.x = 500;
				}
				else {
        			player.body.velocity.x = 200;
				}
			    /*if (this.player.inWorld === false) {
	            	game.state.start('endscreen', true, true);
			    }*/

				game.physics.arcade.collide(player, dragon);
				game.physics.arcade.collide(player, this.obstacles);

		        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||
		        	game.input.pointer1.isDown)
		        {
					//if ( player.body.onFloor() ) {
					if(player.body.velocity.y === 0) {

        				player.body.velocity.y = -750;
        				if(isNearEnd) {
        					// when close to dragon, jump higher
        					player.body.velocity.y = -1250;
        					player.body.velocity.x = 500;
        				}
					}
		        }
		        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		        {
					//player.body.moveLeft(speed);
	            	//player.x -= speed;
	            	/*
    				game.physics.arcade.collide(player, dragon, function(p, d) {
    					p.x = 0;
    				}, null, this);
*/
		        }
		        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		        {
					//player.body.moveRight(speed);
	            	//player.x += speed;
		        }
			}

    	}
    }
});