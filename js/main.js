const image = {
	bullet:new Image()
}
image.bullet.src = "/../bullet.png"
window.onload = (()=>{
	let evt = new Event("click", {"bubbles":true, "cancelable":false});
	console.log("Loaded")
	document.getElementById('SinglePlayer').onclick = ()=>{
		MENUS.remove()
		GameDiv.appendChild(StatsDiv[0])
		document.body.appendChild(GameDiv)
		//CreateSinglePlayerGame()
	try{
	 CreateSinglePlayerGamee()	
	}catch(err){
		console.log(err)
	}
		ctx = canvas.getContext('2d')
		clearInterval(TITLECOLOR)
	}
	document.getElementById('SinglePlayer').dispatchEvent(evt)
	pauseBtn.onclick = ()=>{
	clearInterval(Game.GameLoop)
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
			PauseDiv.remove()
		}
	PauseDiv.appendChild(PauseTitle)
	PauseDiv.appendChild(ResumeBtn)
	GameDiv.appendChild(PauseDiv)
	}
})