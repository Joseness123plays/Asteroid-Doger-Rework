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
		ctx.closePath()
	}
}
let offsetPowerUpX = 0
let offsetPowerUpY = 0
class PowerUp{
	constructor(id){
		this.CollisionPoints = []
		this.outerColor
		this.id = id
		this.decorationPoints = []
		//idk y 
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
		this.CollisionPoints = []
		this.decorationPoints = []
		this.CollisionPoints.push({x:0+this.x,y:0+this.y})
		this.CollisionPoints.push({x:17.5+this.x,y:10+this.y})
		this.CollisionPoints.push({x:29.5+this.x,y:10+this.y})
		this.CollisionPoints.push({x:35+this.x,y:0+this.y})
		this.CollisionPoints.push({x:40+this.x,y:10+this.y})
		this.CollisionPoints.push({x:55+this.x,y:10+this.y})
		this.CollisionPoints.push({x:70+this.x,y:0+this.y})
		this.CollisionPoints.push({x:70+this.x,y:40+this.y})
		this.CollisionPoints.push({x:60+this.x,y:57.5+this.y})
		this.CollisionPoints.push({x:35+this.x,y:70+this.y})
		this.CollisionPoints.push({x:15+this.x,y:57.5+this.y})
		this.CollisionPoints.push({x:0+this.x,y:40+this.y})
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
		ctx.moveTo(this.CollisionPoints[0].x,this.CollisionPoints[0].y)
		for (let i=0;i<this.CollisionPoints.length;i++) {
			ctx.lineTo(this.CollisionPoints[i].x,this.CollisionPoints[i].y)
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
		this.CollisionPoints.push({x:0+this.x,y:0+this.y})
		this.CollisionPoints.push({x:17.5+this.x,y:10+this.y})
		this.CollisionPoints.push({x:29.5+this.x,y:10+this.y})
		this.CollisionPoints.push({x:35+this.x,y:0+this.y})
		this.CollisionPoints.push({x:40+this.x,y:10+this.y})
		this.CollisionPoints.push({x:55+this.x,y:10+this.y})
		this.CollisionPoints.push({x:70+this.x,y:0+this.y})
		this.CollisionPoints.push({x:70+this.x,y:40+this.y})
		this.CollisionPoints.push({x:60+this.x,y:57.5+this.y})
		this.CollisionPoints.push({x:35+this.x,y:70+this.y})
		this.CollisionPoints.push({x:15+this.x,y:57.5+this.y})
		this.CollisionPoints.push({x:0+this.x,y:40+this.y})
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
class Player{
	constructor(StartX,StartY,color){
		this.points=[
			{x:0+StartX,y:0+StartY},
			{x:80+StartX,y:40+StartY},
			{x:0+StartX,y:80+StartY}
		]
		this.x = StartX
		this.y = StartY
		this.color = color
		this.Xdir = 0
		this.Ydir = 0
		this.hp = 5
		this.sheildHp = 0
		this.sheilded = false
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
		this.CheckAsteroidCollision()
		this.CheckSheildCollision()
		this.draw()
	}
	draw(){
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
			for(let j=0;j<Game.Asteroids[i].points.length;j++){
				for(let o=0;o<this.points.length-1;o++){
					if(Game.Asteroids[i].points[j+1]==undefined){
						if(LineCollision(Game.Asteroids[i].points[j],Game.Asteroids[i].points[0],this.points[o],this.points[0])){
							Game.Asteroids[i].resetPos()
							this.hp--
						}
					}
					else{
						if(LineCollision(Game.Asteroids[i].points[j],Game.Asteroids[i].points[j+1],this.points[o],this.points[o+1])){
							Game.Asteroids[i].resetPos()
							this.hp--
						}
					}
				}
			}
		}
	}
	CheckSheildCollision(){
		for(let i in Game.PowerUps){
			for(let j=0;j<Game.PowerUps[i].CollisionPoints.length;j++){
				for(let o=0;o<this.points.length-1;o++){
					if(Game.PowerUps[i].CollisionPoints[j+1]==undefined){
						if(LineCollision(Game.PowerUps[i].CollisionPoints[j],Game.PowerUps[i].CollisionPoints[0],this.points[o],this.points[0])){
							this.hp++
							delete Game.PowerUps[i]
							return
						}
					}
					else{
						if(LineCollision(Game.PowerUps[i].CollisionPoints[j],Game.PowerUps[i].CollisionPoints[j+1],this.points[o],this.points[o+1])){
							this.hp++
							delete Game.PowerUps[i]
							return
						}
					}
				}
			}
		}
	}
}