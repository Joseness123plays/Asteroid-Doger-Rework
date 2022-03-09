const MENUS = document.getElementById('Menus')
let Titlecolor = "red"
const CANVAS = document.createElement('canvas')
CANVAS.width = 1280
CANVAS.height = 720
CANVAS.style.borderColor = "grey"
CANVAS.style.border = "solid"
CANVAS.style.boxSizing = "borderBox"
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
    CANVAS.style.width = `${CanvasWidth}px`
    CANVAS.style.height = `${CanvasHeight}px`
    CANVAS.style.left = `${(window.innerWidth/2)-(CanvasWidth/2)}px`
    CANVAS.style.top = `${(window.innerHeight/2)-(CanvasHeight/2)}px`
}
//1280
//720
//document.getElementById('Stats1').style.left = (window.innerWidth / 2) - (CanvasWidth / 2) + 'px'
Resize()
window.addEventListener('resize',Resize)