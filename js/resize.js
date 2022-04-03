const MENUS = document.getElementById('Menus')
let Titlecolor = "red"
let canvas = document.createElement('canvas')
canvas.width = 1280
canvas.height = 720
canvas.style.borderColor = "grey"
canvas.style.border = "solid"
canvas.style.boxSizing = "borderBox"
let pauseBtn = document.createElement('button')
pauseBtn.style.position = "absolute"
pauseBtn.innerText = "pause dis game"
pauseBtn.style.zIndex = "1"
pauseBtn.style.font = "inherit"
let FpsDiv = document.createElement('div')
FpsDiv.style.position = "absolute"
FpsDiv.style.zIndex = "1"
FpsDiv.style.right = 0
let GameDiv = document.createElement('div')
GameDiv.style.width = "100vw"
GameDiv.style.height = "100vh"
GameDiv.appendChild(canvas)
GameDiv.appendChild(pauseBtn)
GameDiv.appendChild(FpsDiv)
let StatsDiv = []
for(let i=0;i<4;i++){
	StatsDiv.push(document.createElement('div'))
	StatsDiv[i].style.textAlign = "center"
	StatsDiv[i].style.position = "absolute"
	StatsDiv[i].innerText = "Loading..."
}
StatsDiv[0].style.width = "100vw"
StatsDiv[1].style.width = "5vw"
StatsDiv[2].style.width = "5vw"
StatsDiv[2].style.right = 0
StatsDiv[3].style.width = "100vw"
StatsDiv[3].style.bottom = 0
let TITLECOLOR = setInterval(()=>{
    if(document.getElementById('Title')){
        switch (Titlecolor) {
            case "red":
                Titlecolor = "blue" 
            break;
            case "blue":
                Titlecolor = "green" 
            break;
            case "green":
                Titlecolor = "red" 
            break;
            default:
                Titlecolor = "red" 
            break;
        }
        document.getElementById('Title').style.borderColor = Titlecolor
    }
},1000)
function Resize() {
    const InnerTitle = document.getElementById("InnerTitle")
	  const RATIO = 16/9
    let SCALE
	  if(window.innerWidth<window.innerHeight){
        SCALE = window.innerWidth
    }
    else{
      SCALE = window.innerHeight
    }
		for(let i=0;i<4;i++){
			StatsDiv[i].style.fontSize = `${3/100*SCALE}px`
		}
		FpsDiv.style.fontSize = `${3/100*SCALE}px`
		pauseBtn.style.fontSize = `${3/100*SCALE}px`
	  if(InnerTitle){
			MENUS.style.fontSize = `${5/100*SCALE}px`
			InnerTitle.style.fontSize = `${5/100*SCALE}px`
      InnerTitle.style.width = `${100/100*SCALE}px`
      InnerTitle.style.left = `${(window.innerWidth/2)-(SCALE/2)}px`
      InnerTitle.style.top = `${(10/100*window.innerHeight/2)-(5/100*SCALE/1.5)}px`
      document.getElementById('Title').style.borderWidth = `${1/100*SCALE}px`
		}
    let CanvasWidth = window.innerWidth
    let CanvasHeight = window.innerHeight
    if (CanvasHeight < CanvasWidth/RATIO) {
      CanvasWidth = CanvasHeight*RATIO
    }
    else {
      CanvasHeight = CanvasWidth/RATIO
    }
    canvas.style.width = `${CanvasWidth}px`
    canvas.style.height = `${CanvasHeight}px`
    canvas.style.left = `${(window.innerWidth/2)-(CanvasWidth/2)}px`
    canvas.style.top = `${(window.innerHeight/2)-(CanvasHeight/2)}px`
}
//1280
//720
//document.getElementById('Stats1').style.left = (window.innerWidth / 2) - (CanvasWidth / 2) + 'px'
Resize()
window.addEventListener('resize',Resize)