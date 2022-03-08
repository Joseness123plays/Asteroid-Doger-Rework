const MENUS = document.getElementById('Menus')
let Titlecolor = "red"
const CANVAS = document.createElement('canvas')
CANVAS.width = 1280
CANVAS.height = 720
CANVAS.style.borderColor = "grey"
CANVAS.style.border = "solid"
CANVAS.style.boxSizing = "borderBox"
const TITLECOLOR = setInterval(()=>{
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
    CANVAS.style.width = `${window.innerWidth}px`
    CANVAS.style.height = `${window.innerHeight}px`
    if (window.innerHeight < window.innerWidth/RATIO) {
        CANVAS.style.width = `${window.innerHeight*RATIO}px`
        CANVAS.style.left = `${(window.innerWidth/2)-(window.innerWidth/2)}px`
        CANVAS.style.top = `${(window.innerHeight/2)-((window.innerHeight*RATIO)/2)}px`
    }
    else {
        CANVAS.style.height = `${window.innerWidth/RATIO}px`
        CANVAS.style.left = `${(window.innerWidth/2)-((window.innerWidth/RATIO)/2)}px`
        CANVAS.style.top = `${(window.innerHeight/2)-(window.innerHeight/2)}px`
    }
    InnerTitle.style.fontSize = `${5/100*SCALE}px`
    InnerTitle.style.width = `${50/100*SCALE}px`
    InnerTitle.style.left = `${(window.innerWidth/2)-(50/100*SCALE/2)}px`
    InnerTitle.style.top = `${(10/100*window.innerHeight/2)-(5/100*SCALE/1.5)}px`
    document.getElementById('Title').style.borderWidth = `${1/100*SCALE}px`
}
//1280
//720
//document.getElementById('Stats1').style.left = (window.innerWidth / 2) - (CanvasWidth / 2) + 'px'
Resize()
window.addEventListener('resize',Resize)