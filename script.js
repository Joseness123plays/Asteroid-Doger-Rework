const images = {
	bullet:new Image(),
	asteroids:[],
	warning:new Image()
}
for(let i=0;i<3;i++){
	images.asteroids.push(new Image())
	images.asteroids[i].src = "img/asteroid"+(i+1)+".png"
}
const RATIO = 16/9
const MultiplayerScreenRATIO = 16/18
let MultiplayerCanvas = document.createElement('canvas')
MultiplayerCanvas.width = 1280
MultiplayerCanvas.height = 720*2
MultiplayerCanvas.style.borderColor = "grey"
MultiplayerCanvas.style.border = "solid"
MultiplayerCanvas.style.boxSizing = "borderBox"
let MultiplayerGameDiv = document.createElement('div')
MultiplayerGameDiv.style.width = "100vw"
MultiplayerGameDiv.style.height = "100vh"
let ReturnToMenusBtn = document.createElement('button')
ReturnToMenusBtn.innerText = "Return to Main Menu"
ReturnToMenusBtn.style.width = "25vw"
ReturnToMenusBtn.style.height = "5vmin"
ReturnToMenusBtn.onclick = ()=>{
	MultiplayerGameDiv.remove()
	document.body.appendChild(MENUS)
}
let CreateNewGameBtn = document.createElement('button')
CreateNewGameBtn.innerText = "Create New Game"
CreateNewGameBtn.style.width = "50vw"
CreateNewGameBtn.style.height = "10vmin"
CreateNewGameBtn.style.position = "absolute"
CreateNewGameBtn.style.top = "20vh"
CreateNewGameBtn.style.left = "0px"
CreateNewGameBtn.className = "MultiplayerJoinBtn"
CreateNewGameBtn.style.left = "25vw"
let GameCode = document.createElement('input')
GameCode.maxLength = "10"
GameCode.style.width = "40vw"
GameCode.style.height = "5vmin"
GameCode.style.position = "absolute"
GameCode.style.top = "40vh"
GameCode.style.left = "30vw"
GameCode.placeholder = "This is useless return to the main menu"
let JoinGame = document.createElement('button')
JoinGame.innerText = "Join Game"
JoinGame.style.width = "40vw"
JoinGame.style.left = "30vw"
JoinGame.style.height = "10vmin"
JoinGame.style.position = "absolute"
JoinGame.style.top = "60vh"
JoinGame.className = "MultiplayerJoinBtn"
MultiplayerGameDiv.appendChild(ReturnToMenusBtn)
MultiplayerGameDiv.appendChild(CreateNewGameBtn)
MultiplayerGameDiv.appendChild(GameCode)
MultiplayerGameDiv.appendChild(JoinGame)
function resizeMultiplayer(){
	let CanvasWidth = window.innerWidth
	let CanvasHeight = window.innerHeight
	if (CanvasHeight < CanvasWidth/MultiplayerScreenRATIO) {
		CanvasWidth = CanvasHeight*MultiplayerScreenRATIO
	}
	else {
		CanvasHeight = CanvasWidth/MultiplayerScreenRATIO
	}
	MultiplayerCanvas.style.width = `${CanvasWidth}px`
	MultiplayerCanvas.style.height = `${CanvasHeight}px`
	MultiplayerCanvas.style.left = `${(window.innerWidth/2)-(CanvasWidth/2)}px`
	MultiplayerCanvas.style.top = `${(window.innerHeight/2)-(CanvasHeight/2)}px`
}
resizeMultiplayer()
window.addEventListener('resize',resizeMultiplayer)
let Game = {}
let Paused = false
images.bullet.src = "img/bullet.png"
images.warning.src = "img/warning.png"
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
		if(!Game.Gameover){
			Game.timepassed = performance.now() - Game.timebefore
			Game.timebefore = performance.now()
			Game.GameLoop = setInterval(Game.GameLoopFunction,0)
		}
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
	}
	document.getElementById("Settings").onclick = ()=>{
		MENUS.appendChild(SettingsDiv)
	}
	document.getElementById("Multiplayer").onclick = ()=>{
		MENUS.remove()
		document.body.appendChild(MultiplayerGameDiv)
	}
	pauseBtn.onclick = ()=>{
		Paused=true
		ReturnToMenusBtn.style.position = "absolute"
		ReturnToMenusBtn.style.width = "100%"
		ReturnToMenusBtn.style.height = "10%"
		ReturnToMenusBtn.style.top = "40%"
		ReturnToMenusBtn.onclick = ()=>{
			ReturnToMenusBtn.style.position = "relative"
			ReturnToMenusBtn.innerText = "Return to Main Menu"
			ReturnToMenusBtn.style.width = "25vw"
			ReturnToMenusBtn.style.height = "5vmin"
			ReturnToMenusBtn.style.top = "0px"
			ReturnToMenusBtn.onclick = ()=>{
				document.body.appendChild(MENUS)
				Game.remove()
			}
			
			ReturnToMenusBtn.remove()
			MultiplayerGameDiv.appendChild(ReturnToMenusBtn)
			StatsDiv[0].remove()
			GameDiv.remove()
			document.body.appendChild(MENUS)
			ReturnToMenusBtn.onclick = ()=>{
				MultiplayerGameDiv.remove()
				document.body.appendChild(MENUS)
			}
			Paused = false
			PauseDiv.remove()
		}
		if(Paused){
			clearInterval(Game.GameLoop)
			PauseDiv.appendChild(PauseTitle)
			PauseDiv.appendChild(ResumeBtn)
			PauseDiv.appendChild(ReturnToMenusBtn)
			GameDiv.appendChild(PauseDiv)
		}
	}
})