document.getElementById('SinglePlayer').onclick = ()=>{
    MENUS.remove()
	 	document.body.appendChild(GameDiv)
    CreateSinglePlayerGame()
	  clearInterval(TITLECOLOR)
}
pauseBtn.onclick = ()=>{
	Paused = !Paused
	timepassed = performance.now() - timebefore
	timebefore = performance.now()
}