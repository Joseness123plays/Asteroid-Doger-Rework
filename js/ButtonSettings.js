document.getElementById('SinglePlayer').onclick = ()=>{
    MENUS.remove()
	 	document.body.appendChild(GameDiv)
    CreateSinglePlayerGame()
	  clearInterval(TITLECOLOR)
}