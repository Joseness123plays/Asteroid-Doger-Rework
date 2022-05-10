// @ts-check
function CreateSinglePlayerGamee()
{
	Game = 
	{
		timebefore:performance.now(),
		timepassed:performance.now() - Game.timebefore,
		SpaceDown:false,
		Asteroids:{},
		AsteroidId:0,
		PowerUps:{},
	  PowerUpId:0,
		bullets:{},
		BulletId:0,
		timers:{},
		player:new Player(0,0,"green"),
		UpdateStats(){
			StatsDiv[0].innerText = ""
			StatsDiv[0].appendChild(document.createTextNode(`Hp: ${Game.player.hp}`))
			StatsDiv[0].appendChild(document.createElement('br'))
			StatsDiv[0].appendChild(document.createTextNode(`Sheild: ${Game.player.sheildHp}`))
			StatsDiv[0].appendChild(document.createElement('br'))
			StatsDiv[0].appendChild(document.createTextNode(`Bullets: ${Game.player.bullets}`))
			StatsDiv[0].appendChild(document.createElement('hr'))
		},
		UpdateFps(){
			FpsDiv.innerText = `Fps: ${Math.floor(1000/Game.timepassed)}`
		},
		GameOver(){
			clearInterval(Game.GameLoop)
			drawText(canvas.width/2,canvas.height/2,"!Game Over!","red",100,"center")
			clearInterval(Game.GameLoop)
		},
		GameLoopFunction(){
			try{
			/*
---------------------------------------------------
			*/
			Game.timepassed = performance.now() - Game.timebefore
			Game.timebefore = performance.now()
			ctx.clearRect(0,0,canvas.width,canvas.height)
				ctx.drawImage(images.background,0,0,canvas.width,canvas.height)
				Game.player.updatePos(Game.timepassed)
			for(let i in Game.timers){
				Game.timers[i].update(Game.timepassed)
			}
			for(let i in Game.Asteroids){
				Game.Asteroids[i].updatePos(Game.timepassed)
			}
			for(let i in Game.bullets){
				Game.bullets[i].updatePos(Game.timepassed)
				//
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
		},
		GameLoop:0
	}
	Game.GameLoop = setInterval(Game.GameLoopFunction,0)
	Game.timers["UpdateFps"] = new Timer(0.5,()=>{
		Game.UpdateFps()
	})
	Game.timers["SpawnPowerUp"] = new Timer(2,()=>{
		Game.PowerUps[Game.PowerUpId] = RandomPowerUp(Game.PowerUpId)
		Game.PowerUpId++
		if(Game.PowerUpId>2147483646){
			Game.PowerUpId = 0
		}
		RandomPowerUp()
	})
	Game.timers["SpawnAsteroid"] = new Timer(1,()=>{
		Game.AsteroidId++
		if(Game.AsteroidId>2147483646){
			Game.AsteroidId = 0
		}
		Game.Asteroids[Game.AsteroidId] = (new asteroid(Game.AsteroidId))
	})
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
			case ' ':
				if(!Game.SpaceDown&&Game.player.bullets>0){
					Game.player.bullets--
					Game.BulletId++
					Game.bullets[Game.BulletId] = new bullet(Game.player.x+Game.player.width,Game.player.y+(Game.player.height/2-11),Game.BulletId)
					if(Game.BulletId>2147483646){
					  Game.BulletId = 0
					}
					Game.SpaceDown = true
				}
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
			case ' ':
				Game.SpaceDown = false
				break;
	  }
	}

}