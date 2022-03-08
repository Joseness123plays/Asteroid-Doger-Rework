const MENUS = document.getElementById('Menus')
let Titlecolor = "red"
const TITLECOLOR = setInterval(()=>{
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
},1000)
function Resize() {
    const InnerTitle = document.getElementById("InnerTitle")
    let SCALE
    if(window.innerWidth<window.innerHeight){
        SCALE = window.innerWidth
    }
    else{
        SCALE = window.innerHeight
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