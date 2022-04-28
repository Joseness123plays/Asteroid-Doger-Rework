class asteroid{
	static offsetX = 0
	static offsetY = 0
	constructor(){
		this.height = Math.ceil(Math.random() * (150-50))+ 50;
		this.width = this.height
		this.x = canvas.width + asteroid.offsetX
		this.y = Math.floor(Math.random()*(canvas.height-this.height))
		this.collisionPoints = createRect(this.x,this.y,this.width,this.height)
		asteroid.offsetX+=(this.width*2)
	}
	updatePos(deltatime){
		this.x-=0.2*deltatime
		this.collisionPoints = createRect(this.x,this.y,this.width,this.height)
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
		ctx.moveTo(this.collisionPoints[0].x,this.collisionPoints[0].y);
		ctx.lineTo(this.collisionPoints[1].x,this.collisionPoints[1].y);
		ctx.lineTo(this.collisionPoints[2].x,this.collisionPoints[2].y);
		ctx.lineTo(this.collisionPoints[3].x,this.collisionPoints[3].y);
		ctx.fillStyle = "gray"
		ctx.fill()
		ctx.closePath()
	}
}
let offsetPowerUpX = 0
let offsetPowerUpY = 0
class PowerUp{
	constructor(id){
	  this.collisionPoints = []
		this.decorationPoints = []
		this.innerColor
		this.outerColor
		this.width = 80
		this.height = 80
		this.id = id
		this.orgin = {}
		this.width
		this.height
		this.x
		this.y
		this.spdX = 0.3
	}
	updatePos(deltatime){
		this.x-=this.spdX*deltatime
		this.decorationPoints = []
		this.collisionPoints = []
		this.collisionPoints.push({x:0+this.x,y:0+this.y})
		this.collisionPoints.push({x:17.5+this.x,y:10+this.y})
		this.collisionPoints.push({x:29.5+this.x,y:10+this.y})
		this.collisionPoints.push({x:35+this.x,y:0+this.y})
		this.collisionPoints.push({x:40+this.x,y:10+this.y})
		this.collisionPoints.push({x:55+this.x,y:10+this.y})
		this.collisionPoints.push({x:70+this.x,y:0+this.y})
		this.collisionPoints.push({x:70+this.x,y:40+this.y})
		this.collisionPoints.push({x:60+this.x,y:57.5+this.y})
		this.collisionPoints.push({x:35+this.x,y:70+this.y})
		this.collisionPoints.push({x:15+this.x,y:57.5+this.y})
		this.collisionPoints.push({x:0+this.x,y:40+this.y})
		this.collisionPoints = this.collisionPoints
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
		ctx.moveTo(this.collisionPoints[0].x,this.collisionPoints[0].y)
		for (let i=0;i<this.collisionPoints.length;i++) {
			ctx.lineTo(this.collisionPoints[i].x,this.collisionPoints[i].y)
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
		this.collisionPoints.push({x:0+this.x,y:0+this.y})
		this.collisionPoints.push({x:17.5+this.x,y:10+this.y})
		this.collisionPoints.push({x:29.5+this.x,y:10+this.y})
		this.collisionPoints.push({x:35+this.x,y:0+this.y})
		this.collisionPoints.push({x:40+this.x,y:10+this.y})
		this.collisionPoints.push({x:55+this.x,y:10+this.y})
		this.collisionPoints.push({x:70+this.x,y:0+this.y})
		this.collisionPoints.push({x:70+this.x,y:40+this.y})
		this.collisionPoints.push({x:60+this.x,y:57.5+this.y})
		this.collisionPoints.push({x:35+this.x,y:70+this.y})
		this.collisionPoints.push({x:15+this.x,y:57.5+this.y})
		this.collisionPoints.push({x:0+this.x,y:40+this.y})
		/*this.collisionPoints.push({x:0+this.x,y:0+this.y})
		this.collisionPoints.push({x:17.5+this.x,y:10+this.y})
		this.collisionPoints.push({x:29.5+this.x,y:10+this.y})
		this.collisionPoints.push({x:35+this.x,y:0+this.y})
		this.collisionPoints.push({x:40+this.x,y:10+this.y})
		this.collisionPoints.push({x:55+this.x,y:10+this.y})
		this.collisionPoints.push({x:70+this.x,y:0+this.y})
		this.collisionPoints.push({x:70+this.x,y:40+this.y})
		this.collisionPoints.push({x:60+this.x,y:57.5+this.y})
		this.collisionPoints.push({x:35+this.x,y:70+this.y})
		this.collisionPoints.push({x:15+this.x,y:57.5+this.y})
		this.collisionPoints.push({x:0+this.x,y:40+this.y})*/
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
/**
 * creates a new timer
 */
class Timer{
	/**
	 * @param {number} seconds - for how long a timer lasts
	 * @param {function()} action - function called when timer reaches 0 or less
	 * 
	 */
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
		this.x = StartX
		this.y = StartY
		this.width = 80
		this.height = 80
		this.animation = null
		this.offsetT = 0
		this.collisionPoints=createTriangle(this.x,this.y,this.width,this.height)
		this.points = createTriangle(this.x+this.offsetT/4,this.y+this.offsetT/2,this.width-this.offsetT,this.height-this.offsetT)
		this.sheildPoints={
			innerPoints:createTriangle(this.x-2.5,this.y-5,this.width+10,this.height+10),
			outerPoints:createTriangle(this.x-5,this.y-10,this.width+20,this.height+20)
		}
		this.color = color
		this.Xdir = 0
		this.Ydir = 0
		this.hp = 5
		this.sheildHp = 0
		this.sheilded = true
	}
	updatePos(deltatime){
		this.x+=this.Xdir*deltatime
		this.y+=this.Ydir*deltatime
		this.offsetT = (this.sheildHp*10)
		if(this.sheilded){
			this.collisionPoints = createTriangle(this.x-5,this.y-10,this.width+20,this.height+20)
		}
		else{
			this.collisionPoints = createTriangle(this.x,this.y,this.width,this.height)
		}
		this.points = createTriangle(this.x+this.offsetT/4,this.y+this.offsetT/2,this.width-this.offsetT,this.height-this.offsetT)
		this.sheildPoints={
			innerPoints:createTriangle(this.x-2.5,this.y-5,this.width+10,this.height+10),
			outerPoints:createTriangle(this.x-5,this.y-10,this.width+20,this.height+20)
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
					this.sheildHp++
					this.offsetT = (this.sheildHp*10)
					this.animation = new Timer()
					delete Game.PowerUps[i]
				}
			}
		}
	}
}