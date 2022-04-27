class asteroid{
	static offsetX = 0
	static offsetY = 0
	constructor(){
		this.height = Math.ceil(Math.random() * (150-50))+ 50;
		this.width = this.height
		this.x = canvas.width + asteroid.offsetX
		this.y = Math.floor(Math.random()*(canvas.height-this.height))
		this.points = createRect(this.x,this.y,this.width,this.height)
		asteroid.offsetX+=(this.width*2)
	}
	updatePos(deltatime){
		this.x-=0.2*deltatime
		this.points = createRect(this.x,this.y,this.width,this.height)
		if(this.x<0-this.width) this.resetPos()
		this.draw()
	}
	resetPos(){
		this.height = Math.ceil(Math.random() * (150-50))+ 50;
		this.width = this.height
		this.x = canvas.width + this.width;
		this.y = Math.floor(Math.random()*(canvas.height-this.height))
	}
	draw(){
		ctx.beginPath()
		ctx.moveTo(this.points[0].x,this.points[0].y);
		ctx.lineTo(this.points[1].x,this.points[1].y);
		ctx.lineTo(this.points[2].x,this.points[2].y);
		ctx.lineTo(this.points[3].x,this.points[3].y);
		ctx.fillStyle = "gray"
		ctx.fill()
		ctx.closePath()
	}
}
let offsetPowerUpX = 0
let offsetPowerUpY = 0
class PowerUp{
	constructor(id){
		this.points = []
		this.outerColor
		this.width = 80
		this.height = 80
		this.id = id
		this.decorationPoints = []
		this.orgin = {}
		this.width
		this.height
		this.x
		this.y
		this.innerColor
		this.spdX = 0.3
	}
	updatePos(deltatime){
		this.x-=this.spdX*deltatime
		this.points = []
		this.decorationPoints = []
		this.points.push({x:0+this.x,y:0+this.y})
		this.points.push({x:17.5+this.x,y:10+this.y})
		this.points.push({x:29.5+this.x,y:10+this.y})
		this.points.push({x:35+this.x,y:0+this.y})
		this.points.push({x:40+this.x,y:10+this.y})
		this.points.push({x:55+this.x,y:10+this.y})
		this.points.push({x:70+this.x,y:0+this.y})
		this.points.push({x:70+this.x,y:40+this.y})
		this.points.push({x:60+this.x,y:57.5+this.y})
		this.points.push({x:35+this.x,y:70+this.y})
		this.points.push({x:15+this.x,y:57.5+this.y})
		this.points.push({x:0+this.x,y:40+this.y})
		this.outerColor = "blue"
		/*
--------------------------------------------------------------------------
		*/
		this.decorationPoints.push({x:12+this.x,y:14+this.y})
		this.decorationPoints.push({x:24+this.x,y:21+this.y})
		this.decorationPoints.push({x:32+this.x,y:21+this.y})
		this.decorationPoints.push({x:35+this.x,y:14+this.y})
		this.decorationPoints.push({x:39+this.x,y:21+this.y})
		this.decorationPoints.push({x:49+this.x,y:21+this.y})
		this.decorationPoints.push({x:59+this.x,y:14+this.y})
		this.decorationPoints.push({x:59+this.x,y:41+this.y})
		this.decorationPoints.push({x:52+this.x,y:52+this.y})
		this.decorationPoints.push({x:35+this.x,y:61+this.y})
		this.decorationPoints.push({x:22+this.x,y:52+this.y})
		this.decorationPoints.push({x:12+this.x,y:41+this.y})
		this.draw()
		if(this.x+70<0){
			this.delete()
		}
	}
	delete(){
		delete Game.PowerUps[this.id]
	}
	draw(){
		ctx.strokeStyle = 'black';
		ctx.beginPath()
		ctx.moveTo(this.points[0].x,this.points[0].y)
		for (let i=0;i<this.points.length;i++) {
			ctx.lineTo(this.points[i].x,this.points[i].y)
		}
		ctx.closePath()
		ctx.fillStyle = this.outerColor
		ctx.stroke();
		ctx.fill()
		ctx.beginPath()
		ctx.moveTo(this.decorationPoints[0].x,this.decorationPoints[0].y)
		for (let i=0;i<this.decorationPoints.length;i++) {
			ctx.lineTo(this.decorationPoints[i].x,this.decorationPoints[i].y)
		}
		ctx.closePath()
		ctx.fillStyle = this.innerColor
		ctx.stroke();
		ctx.fill()
	}
}
class Sheild extends PowerUp{
	constructor(StartX,StartY,id){
		super(id)
		this.x = StartX
		this.y = StartY
		this.points.push({x:0+this.x,y:0+this.y})
		this.points.push({x:17.5+this.x,y:10+this.y})
		this.points.push({x:29.5+this.x,y:10+this.y})
		this.points.push({x:35+this.x,y:0+this.y})
		this.points.push({x:40+this.x,y:10+this.y})
		this.points.push({x:55+this.x,y:10+this.y})
		this.points.push({x:70+this.x,y:0+this.y})
		this.points.push({x:70+this.x,y:40+this.y})
		this.points.push({x:60+this.x,y:57.5+this.y})
		this.points.push({x:35+this.x,y:70+this.y})
		this.points.push({x:15+this.x,y:57.5+this.y})
		this.points.push({x:0+this.x,y:40+this.y})
		this.outerColor = "blue"
		/*
--------------------------------------------------------------------------
		*/
		this.decorationPoints.push({x:12+this.x,y:14+this.y})
		this.decorationPoints.push({x:24+this.x,y:21+this.y})
		this.decorationPoints.push({x:32+this.x,y:21+this.y})
		this.decorationPoints.push({x:35+this.x,y:14+this.y})
		this.decorationPoints.push({x:39+this.x,y:21+this.y})
		this.decorationPoints.push({x:49+this.x,y:21+this.y})
		this.decorationPoints.push({x:59+this.x,y:14+this.y})
		this.decorationPoints.push({x:59+this.x,y:41+this.y})
		this.decorationPoints.push({x:52+this.x,y:52+this.y})
		this.decorationPoints.push({x:35+this.x,y:61+this.y})
		this.decorationPoints.push({x:22+this.x,y:52+this.y})
		this.decorationPoints.push({x:12+this.x,y:41+this.y})
		this.innerColor = "cyan"
		this.width = 70
		this.height = 70
	}
}
class Timer{
  constructor(seconds,action){
    this.x=100
    this.interval = seconds
    this.action = action
		this.ToDelete = false
  }
  update(deltatime){
    this.x-=(0.1/this.interval)*deltatime
    if(this.x<=0){
      this.x=100
      this.action()
    }
  }
}
const PlayerWidth = 80
const PlayerHeight = 80
class Player{
	constructor(StartX,StartY,color){
		this.points=[
			{x:0+StartX,y:0+StartY},
			{x:80+StartX,y:40+StartY},
			{x:0+StartX,y:80+StartY}
		]
		this.x = StartX
		this.y = StartY
		this.width = 80
		this.height = 80
		this.sheildPoints={
			innerPoints:[
				{x:-5+this.x,y:-10+this.y},
				{x:90+this.x,y:40+this.y},
				{x:-5+this.x,y:90+this.y}
			],
			outerPoints:[
				{x:-10+this.x,y:-20+this.y},
				{x:100+this.x,y:40+this.y},
				{x:-10+this.x,y:95+this.y}
			]
		}
		this.color = color
		this.Xdir = 0
		this.Ydir = 0
		this.hp = 5
		this.sheildHp = 999
		this.sheilded = true//false
	}
	updatePos(deltatime){
		this.x+=this.Xdir*deltatime
		this.y+=this.Ydir*deltatime
		this.points=[]
		this.points=[
			{x:0+this.x,y:0+this.y},
			{x:80+this.x,y:40+this.y},
			{x:0+this.x,y:80+this.y}
		]
		this.sheildPoints={
			innerPoints:[
				{x:-5+this.x,y:-10+this.y},
				{x:90+this.x,y:40+this.y},
				{x:-5+this.x,y:90+this.y}
			],
			outerPoints:[
				{x:-10+this.x,y:-20+this.y},
				{x:100+this.x,y:40+this.y},
				{x:-10+this.x,y:95+this.y}
			]
		}
		this.CheckSheildCollision()
	  this.CheckAsteroidCollision()
		this.draw()
	}
	draw(){
		ctx.beginPath()
		if(this.sheilded){
			ctx.moveTo(this.sheildPoints.outerPoints[0].x,this.sheildPoints.outerPoints[0].y)
			for (let i=0;i<this.sheildPoints.outerPoints.length;i++) {
				ctx.lineTo(this.sheildPoints.outerPoints[i].x,this.sheildPoints.outerPoints[i].y)
			}
			ctx.fillStyle = "blue"
			ctx.fill()
			ctx.closePath()
	
			ctx.beginPath()
			ctx.moveTo(this.sheildPoints.innerPoints[0].x,this.sheildPoints.innerPoints[0].y)
			for (let i=0;i<this.sheildPoints.innerPoints.length;i++) {
				ctx.lineTo(this.sheildPoints.innerPoints[i].x,this.sheildPoints.innerPoints[i].y)
			}
			ctx.fillStyle = "cyan"
			ctx.fill()
			ctx.closePath()
		}
		ctx.beginPath()
		ctx.moveTo(this.points[0].x,this.points[0].y);
		ctx.lineTo(this.points[1].x,this.points[1].y);
		ctx.lineTo(this.points[2].x,this.points[2].y);
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.closePath()	
	}
	CheckAsteroidCollision(){
		for(let i=0;i<Game.Asteroids.length;i++){
			if(rectCollision(this,Game.Asteroids[i])){
				if(polygonCollision(this,Game.Asteroids[i])){
					console.log("colliding with asteroids")
				}
			}
		}
	}
	CheckSheildCollision(){
		for(let i in Game.PowerUps){
			if(rectCollision(this,Game.PowerUps[i])){
				if(polygonCollision(this,Game.PowerUps[i])){
					console.log("colliding with sheild")
					delete Game.PowerUps[i]
				}
			}
		}
	}
}