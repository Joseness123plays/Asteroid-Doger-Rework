function CreateSinglePlayerGamee()
{
	asteroid.offestX=0
	asteroid.offsetY=0
	Game = 
	{
		timebefore:performance.now(),
		timepassed:performance.now() - Game.timebefore,
		Asteroids:[],
		PowerUps:{},
		PowerUpId:0,
		timers:{},
		player:new Player(0,0,"green"),
		UpdateStats(){
			StatsDiv[0].innerText = ""
			StatsDiv[0].appendChild(document.createTextNode(`Hp: ${Game.player.hp}`))
			StatsDiv[0].appendChild(document.createElement('hr'))
		},
		UpdateFps(){
			FpsDiv.innerText = `Fps: ${Math.floor(1000/Game.timepassed)}`
		},
		GameOver(){
			ctx.beginPath()
			ctx.font = '100px "Press Start 2P"'
			ctx.fillStyle = 'red'
			ctx.textAlign = "center";
			ctx.fillText("!GameOver!",canvas.width/2,canvas.height/2)
			ctx.closePath()
			clearInterval(Game.GameLoop)
		},
		GameLoop:setInterval(()=>{
			try{
			/*
---------------------------------------------------
			*/
			Game.timepassed = performance.now() - Game.timebefore
			Game.timebefore = performance.now()
			ctx.clearRect(0,0,canvas.width,canvas.height)
			Game.player.updatePos(Game.timepassed)
			for(let i in Game.timers){
				Game.timers[i].update(Game.timepassed)
			}
			for(let i in Game.Asteroids){
				Game.Asteroids[i].updatePos(Game.timepassed)
			}
			for(let i in Game.PowerUps){
				Game.PowerUps[i].updatePos(Game.timepassed)
			}
			Game.UpdateStats()
			if(Game.player.hp==0){
				Game.GameOver()
			}
			/*
---------------------------------------------------
			*/
			}catch(err){
				clearInterval(Game.GameLoop)
				console.log(err)
			}
		},0)
	}
	Game.timers["UpdateFps"] = new Timer(0.5,()=>{
		Game.UpdateFps()
	})
	Game.timers["SpawnPowerUp"] = new Timer(2,()=>{
		Game.PowerUps[Game.PowerUpId] = (new Sheild(canvas.width+(Math.random()*canvas.width), Math.ceil(Math.random()*(canvas.height-70)),Game.PowerUpId))
		Game.PowerUpId++
		if(Game.PowerUpId>90){
			Game.PowerUpId = 0
		}
	})
	for (let i = 0; i < 5; i++) {
		Game.Asteroids.push(new asteroid())
	}
	document.onkeydown = (e) => {
		switch (e.key) {
			case 'ArrowLeft':
				Game.player.Xdir = -0.2
				break;
			case 'ArrowUp':
				Game.player.Ydir = -0.2
				break;
			case 'ArrowRight':
				Game.player.Xdir = 0.2
				break;
			case 'ArrowDown':
				Game.player.Ydir = 0.2
				break;
		}
	}
	document.onkeyup = (e) => {
		switch (e.key) {
			case 'ArrowLeft':
				Game.player.Xdir = 0
				break;
			case 'ArrowUp':
				Game.player.Ydir = 0
				break;
			case 'ArrowRight':
				Game.player.Xdir = 0
				break;
			case 'ArrowDown':
				Game.player.Ydir = 0
				break;
	  }
	}

}