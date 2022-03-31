// @ts-check
let PlayerColors = ["green","red","blue","purple"]
const ctx = canvas.getContext('2d')
let GameLoop
let Paused = false
let timebefore = performance.now()
let timepassed = performance.now() - timebefore
//I was searching on google on how to check collision from two lines
//and I got this
//thank you to the guy that made it
function checkLineCollision(a,b,c,d){
	let denominator = ((b.x - a.x) * (d.y - c.y)) - ((b.y - a.y) * (d.x - c.x));
	let numerator1 = ((a.y - c.y) * (d.x - c.x)) - ((a.x - c.x) * (d.y - c.y));
	let numerator2 = ((a.y - c.y) * (b.x - a.x)) - ((a.x - c.x) * (b.y - a.y));
	if (denominator == 0){
		return numerator1 == 0 && numerator2 == 0
	}
	
	let r = numerator1 / denominator;
	let s = numerator2 / denominator;

	return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
}
//check if point is in
function pointCollison(point, polygon){
	let count = 0
	let top_collision = false
	let bottom_collision = false
	let left_collision = false
	let right_collision = false
	let x=point.x
	let y=point.y
	let line1 = {
		p1:{
			x:point.x,
			y:point.y
		},
		p2:{
			x:point.x,
			y:0
		}
	}
	let line2 = {
		p1:{
			x:point.x,
			y:point.y
		},
		p2:{
			x:point.x,
			y:canvas.height
		}
	}
	let line3 = {
		p1:{
			x:point.x,
			y:point.y
		},
		p2:{
			x:0,
			y:point.y
		}
	}
	let line4 = {
		p1:{
			x:point.x,
			y:point.y
		},
		p2:{
			x:canvas.width,
			y:point.y
		}
	}
	for(let i=0;i<polygon.length;i++){
		if(polygon[i+1]==undefined){
			if(checkCollision(line1.p1,line1.p2,polygon[0],polygon[i])){
				top_collision=true
			}
			if(checkCollision(line2.p1,line2.p2,polygon[0],polygon[i])){
				bottom_collision=true
			}
			if(checkCollision(line3.p1,line3.p2,polygon[0],polygon[i])){
				left_collision=true
			}
			if(checkCollision(line4.p1,line4.p2,polygon[0],polygon[i])){
				right_collision=true
			}
		}
		else{
			if(checkCollision(line1.p1,line1.p2,polygon[i],polygon[i+1])){
				top_collision=true
			}
			if(checkCollision(line2.p1,line2.p2,polygon[i],polygon[i+1])){
				bottom_collision=true
			}
			if(checkCollision(line3.p1,line3.p2,polygon[i],polygon[i+1])){
				left_collision=true
			}
			if(checkCollision(line4.p1,line4.p2,polygon[i],polygon[i+1])){
				right_collision=true
			}
		}
	}
	return top_collision && bottom_collision && left_collision && right_collision
}
class asteroid{
		static offsetX = 0
		static offsetY = 0
		constructor(){
			this.height = Math.ceil(Math.random() * (150-50))+ 50;
    	this.width = this.height
			this.points = []
			this.points.push({
				x:canvas.width + asteroid.offsetX,
				y:Math.floor(Math.random()*(canvas.height-this.height))
			})
			this.points.push({
				x:this.points[0].x + this.width,
				y:this.points[0].y
			})
			this.points.push({
				x:this.points[0].x + this.width,
				y:this.points[0].y + this.height
			})
			this.points.push({
				x:this.points[0].x,
				y:this.points[0].y + this.height
			})
			asteroid.offsetX+=(this.width*2)
		}
		updatePos(deltatime){
			for (let i in this.points) {
				this.points[i].x-=0.3*deltatime
			}
			if(this.points[0].x<0-this.width){
				for (let i in this.points) {
					this.points[i].x-=0.3*deltatime
				}
				this.height = Math.ceil(Math.random() * (150-50))+ 50;
	    	this.width = this.height
				this.resetPos()
			}
			this.draw()
		}
		resetPos(){
			this.points = []
			this.points.push({
				x:canvas.width,
				y:Math.round(Math.random()*(canvas.height-this.height))
			})
			this.points.push({
				x:this.points[0].x + this.width,
				y:this.points[0].y
			})
			this.points.push({
				x:this.points[0].x + this.width,
				y:this.points[0].y - this.height
			})
			this.points.push({
				x:this.points[0].x,
				y:this.points[0].y - this.height
			})
		}
		draw(){
			ctx.beginPath()
			ctx.moveTo(this.points[0].x,this.points[0].y);
			ctx.lineTo(this.points[1].x,this.points[1].y);
			ctx.lineTo(this.points[2].x,this.points[2].y);
			ctx.lineTo(this.points[3].x,this.points[3].y);
			ctx.fillStyle = "gray"
			ctx.fill()
		}
	}
/*
Notes to self
use /../ to go back a directory
*/
const CreateSinglePlayerGame = ()=>{
	asteroid.offestX=0
	asteroid.offsetY=0
	document.onkeydown = (e) => {
	  switch (e.key) {
	    case 'ArrowLeft':
	      player.Xdir = -0.2
	      break;
	    case 'ArrowUp':
	      player.Ydir = -0.2
	      break;
	    case 'ArrowRight':
	      player.Xdir = 0.2
	      break;
	    case 'ArrowDown':
	      player.Ydir = 0.2
	      break;
	  }
	}
	document.onkeyup = (e) => {
	  switch (e.key) {
	    case 'ArrowLeft':
	      player.Xdir = 0
	      break;
	    case 'ArrowUp':
	      player.Ydir = 0
	      break;
	    case 'ArrowRight':
	      player.Xdir = 0
	      break;
	    case 'ArrowDown':
	      player.Ydir = 0
	      break;
	  }
	}
	timebefore = performance.now()
	timepassed = performance.now() - timebefore
	let Stats1 = document.createElement('div')
	let randomAsteroid = []
	for (let i = 0; i < 5; i++) {
		randomAsteroid.push(new asteroid())
	}
  let player = {
		points:[
			{x:0,y:0},
			{x:80,y:40},
			{x:0,y:80}
		],
		color:PlayerColors[0],
		Xdir:0,
		Ydir:0,
		updatePos(deltatime){
			for (let i in this.points) {
				this.points[i].x+=this.Xdir*deltatime
				this.points[i].y+=this.Ydir*deltatime
			}
			this.draw()
			this.color = PlayerColors[0]
		},
		draw(){
			ctx.beginPath()
			ctx.moveTo(this.points[0].x,this.points[0].y);
			ctx.lineTo(this.points[1].x,this.points[1].y);
			ctx.lineTo(this.points[2].x,this.points[2].y);
			ctx.fillStyle = this.color
			ctx.fill()
		}
	}
	function CheckLastPlayerLineCollsion(i,j,o){
		if(player.points[j+1]==undefined){
			if(checkLineCollision(randomAsteroid[i].points[j],randomAsteroid[i].points[0],player.points[o],player.points[0])){
				randomAsteroid[i].resetPos()
			}
		}
		else{
			if(checkLineCollision(randomAsteroid[i].points[j],randomAsteroid[i].points[j+1],player.points[o],player.points[o+1])){
				randomAsteroid[i].resetPos()
			}
		}
	}
	GameLoop = setInterval(()=>{
		if(!Paused){
		try{
			let isPlayerColliding = false
			timepassed = performance.now() - timebefore
			timebefore = performance.now()
			//PlayerColors[0] = "green"
			ctx.clearRect(0,0,canvas.width,canvas.height)
			player.updatePos(timepassed)
			for (let i=0;i<randomAsteroid.length;i++){
				randomAsteroid[i].updatePos(timepassed)
			}
			for(let i=0;i<randomAsteroid.length;i++){
				for(let j=0;j<randomAsteroid[i].points.length;j++){
					for(let o=0;o<player.points.length-1;o++){
						
						if(randomAsteroid[i].points[j+1]==undefined){
							if(checkLineCollision(randomAsteroid[i].points[j],randomAsteroid[i].points[0],player.points[o],player.points[0])){
								randomAsteroid[i].resetPos()
							}
							 CheckLastPlayerLineCollsion(i,j,o)
						}
						else{
							if(checkLineCollision(randomAsteroid[i].points[j],randomAsteroid[i].points[j+1],player.points[o],player.points[o+1])){
								randomAsteroid[i].resetPos()
							}
							CheckLastPlayerLineCollsion(i,j,o)
						}
					}
				}
			}
			player.draw()
		}catch(err){
			clearInterval(GameLoop)
			console.log(err.stack)
		}
		}
	},0)
}