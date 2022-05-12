const images = {
	bullet:new Image(),
	asteroids:[],
	background:new Image()
}
for(let i=0;i<3;i++){
	images.asteroids.push(new Image())
	images.asteroids[i].src = "img/asteroid"+(i+1)+".png"
}
let Game = {}
let Paused = false
images.bullet.src = "img/bullet.png"
images.background.src = "img/Background.png"
let pauseBtn = document.createElement('button')
	pauseBtn.style.position = "absolute"
	pauseBtn.innerText = "pause dis game"
	pauseBtn.style.zIndex = "1"
	pauseBtn.style.font = "inherit"
let PauseDiv = document.createElement('div')
	PauseDiv.style.position = "absolute" 
	PauseDiv.style.width = "95vw"
	PauseDiv.style.height = "95vh"
	PauseDiv.style.backgroundColor = "gray"
	PauseDiv.style.left = "2.5vw"
	PauseDiv.style.top = "2.5vh"
let PauseTitle = document.createElement('h1')
	PauseTitle.innerText = "Paused"
	PauseTitle.style.fontSize = "7vmin"
	PauseTitle.style.width = "100%"
	PauseTitle.style.textAlign = "center"
	PauseTitle.style.borderTop = "solid"
	PauseTitle.style.borderBottom = "solid"
	PauseTitle.style.borderColor = "lightGrey"
	PauseTitle.style.paddingTop = "1%"
	PauseTitle.style.paddingBottom = "1%"
let ResumeBtn = document.createElement('button')
	ResumeBtn.style.position = "absolute" 
	ResumeBtn.style.top = "30%"
	ResumeBtn.style.width = "100%"
	ResumeBtn.style.height = "10%"
	ResumeBtn.innerText = "Resume"
	ResumeBtn.style.font = "inherit"
	ResumeBtn.style.fontSize = "3vmim"
ResumeBtn.onclick = ()=>{
	Game.timebefore = performance.now()
	Game.timepassed = performance.now() - Game.timebefore
	Game.GameLoop = setInterval(Game.GameLoopFunction,0)
	Game.timebefore = performance.now()
	Game.timepassed = performance.now() - Game.timebefore
	Paused = false
	PauseDiv.remove()
}
window.onload = (()=>{
	console.log("Loaded")
	document.getElementById('SinglePlayer').onclick = ()=>{
		MENUS.remove()
		GameDiv.appendChild(StatsDiv[0])
		document.body.appendChild(GameDiv)
		CreateSinglePlayerGamee()	
		ctx = canvas.getContext('2d')
		clearInterval(TITLECOLOR)
	}
	document.getElementById("Settings").onclick = ()=>{
		MENUS.appendChild(SettingsDiv)
	}
	pauseBtn.onclick = ()=>{
		Paused=true
		if(Paused){
			clearInterval(Game.GameLoop)
			PauseDiv.appendChild(PauseTitle)
			PauseDiv.appendChild(ResumeBtn)
			GameDiv.appendChild(PauseDiv)
		}
	}
})