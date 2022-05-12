// @ts-check
class asteroid{
	static MinSpd = 0.05
	static Masspd = 0.5
	constructor(id){
		this.id = id
		this.img = images.asteroids[Math.floor(Math.random()*3)]
		this.Xspd = Math.random()*(1-0.05)+0.05;
		this.angle = Math.floor(Math.random()*360)
		this.height = Math.ceil(Math.random() * (150-50))+ 50;
		this.width = this.height
		this.x = canvas.width
		this.y = Math.floor(Math.random()*(canvas.height-this.height))
		this.collisionPoints = createRect(this.x,this.y,this.width,this.height)
		this.divide = 3
		this.hp = 3
		this.hpBar = createRect(this.x-((this.width*1.05)-this.width),this.y-40,this.width*1.1,20)
		this.hpBarchunk = (this.width*1.1)/this.divide
		this.hpBarWithRed = createRect(this.x-(0.1*this.width),this.y-40,(-(this.hp-3)*this.hpBarchunk),20)
	}
	updatePos(deltatime){
		this.x-=this.Xspd*deltatime
		this.collisionPoints = createRect(this.x,this.y,this.width,this.height)
		this.collisionPoints = RotatePolygon(this.collisionPoints,this.angle,{
			x:this.width/2+this.x,
			y:this.height/2+this.y
		})
		this.hpBar = createRect(this.x-((this.width*0.05)),this.y-40,this.width*1.1,20)
		this.hpBarchunk = (this.width*1.1)/this.divide
		this.hpBarWithRed = createRect(this.x-(0.1*this.width),this.y-40,(-(this.hp-3)*this.hpBarchunk),20)
		if(this.hp<0) this.delete()
		if(this.hp==0) this.delete()
		if(this.x<0){
			this.delete()
		}
		this.draw()
	}
	delete(){
		delete Game.Asteroids[this.id]
	}
	draw(){
		drawRotatedImg(this.img,this.x,this.y,this.width,this.height,this.angle)
		ctx.beginPath()
		ctx.moveTo(this.hpBar[0].x,this.hpBar[0].y)
		this.hpBar.forEach((i)=>{
			ctx.lineTo(i.x,i.y);
		})
		ctx.fillStyle = "rgb(0, 255, 0)"
		ctx.fill()
		if(this.hp>0){
		ctx.beginPath()
		ctx.moveTo(this.hpBarWithRed[0].x,this.hpBarWithRed[0].y)
		this.hpBarWithRed.forEach((i)=>{
			ctx.lineTo(i.x,i.y);
		})
		ctx.fillStyle = "red"
		ctx.fill()
		}
	}
}
class TargetingAsteroid extends asteroid{
	constructor(id,y){
		super(id)
		this.id = id
		this.Xspd = 1.75
		this.y = y
		this.x = canvas.width+300
		this.width = 50
		this.height = 50
		this.divide = 0
		this.hp = 1
	}
	draw(){
		drawRotatedImg(this.img,this.x,this.y,this.width,this.height,this.angle)
		ctx.beginPath()
		ctx.moveTo(this.hpBar[0].x,this.hpBar[0].y)
		this.hpBar.forEach((i)=>{
			ctx.lineTo(i.x,i.y);
		})
		if(this.x>canvas.width){
			ctx.drawImage(images.warning,canvas.width-70,this.y,70,70)
		}
		ctx.fillStyle = "rgb(0, 255, 0)"
		ctx.fill()
		if(this.hp>0){
		ctx.beginPath()
		ctx.moveTo(this.hpBarWithRed[0].x,this.hpBarWithRed[0].y)
		this.hpBarWithRed.forEach((i)=>{
			ctx.lineTo(i.x,i.y);
		})
		ctx.fillStyle = "red"
		ctx.fill()
		}
	}
}
class Star{
	constructor(x){
		this.x = x
		this.y = Math.random()*canvas.height
		this.width = Math.random()*30
		this.height = this.width
	}
	updatePos(deltatime){
		this.x-=0.1*deltatime
		ctx.beginPath()
		ctx.rect(this.x,this.y,this.width,this.height)
		ctx.fillStyle = "white"
		ctx.fill()
	}
}
let offsetPowerUpX = 0
let offsetPowerUpY = 0
class PowerUp{
	constructor(id,innerColor,outerColor,type){
		this.type = type
	  this.collisionPoints = []
		this.decorationPoints = []
		this.innerColor = innerColor
		this.outerColor = outerColor
		this.width = 70
		this.height = 70
		this.id = id
		this.x = canvas.width
		this.y = Math.ceil(Math.random()*(canvas.height-70))
		this.spdX = 0.2
	}
	createSprite(){
		
	}
	updatePos(deltatime){
		this.x-=this.spdX*deltatime
		this.createSprite()
		this.draw()
		if(this.x+this.width<0){
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
class Ammo extends PowerUp{
	constructor(id){
		super(id,"yellow","red","Ammo")
		this.height = 70
		this.width = 50
		this.angle = 0
		this.reload = Math.ceil(Math.random()*3)
		this.rotateTimer = null
		this.collisionRect = {}
	}
	updatePos(deltatime){
		this.x-=this.spdX*deltatime
		if(this.rotateTimer==null){
			this.angle+=0.5*deltatime
		}else{
			this.rotateTimer.update(deltatime)
		}
		if(this.angle>=360-90&&this.rotateTimer==null){
			this.angle = -90
			this.rotateTimer = new Timer(1,()=>{
				this.angle = -90
				this.rotateTimer = null
			})
		}
		drawText(this.x+this.width,this.y,"x"+this.reload,"white",25,"left")
		this.createSprite()
		this.draw()
		if(this.x-70<0) this.delete()
	}
	createSprite(){
		this.collisionPoints = createRect(this.x,this.y,this.width,this.height)
		this.decorationPoints = createRect(this.x,this.y,this.width,this.height/4)
		this.collisionPoints = RotatePolygon(this.collisionPoints,this.angle,{
			x:this.width/2+this.x,
			y:this.height/2+this.y
		})
		this.decorationPoints = RotatePolygon(this.decorationPoints,this.angle,{
			x:this.width/2+this.x,
			y:this.height/2+this.y
		})
	}
}
class Sheild extends PowerUp{
	constructor(id){
		super(id,"cyan","blue","Sheild")
		this.createSprite()
	}
	createSprite(){
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
	}
	
}
/**
 * creates a new timer
 */
class Timer{
	/**
	 * @param {number} seconds - for how long a timer lasts
	 * @param {function() =} action - function called when timer reaches 0 or less
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
class bullet{
	constructor(x,y,id){
		this.x = x
		this.y = y
		this.id = id
		this.width = 60
		this.height = 22
		this.collisionPoints = this.createSprite()
		this.img = images.bullet
	}
	updatePos(deltatime){
		this.x+=1*deltatime
		this.collisionPoints = this.createSprite()
		if(this.x-this.width>canvas.width){
			delete Game.bullets[this.id]
		}
		this.CheckAsteroidCollision()
		ctx.drawImage(this.img,0+this.x,0+this.y,60,22);
	}
	CheckAsteroidCollision(){
		for(let i in Game.Asteroids){
			if(CheckCollision(this,Game.Asteroids[i])){
				Game.Asteroids[i].hp--
				delete Game.bullets[this.id]
			}
		}
	}
	createSprite(){
		return [
			{x:60+this.x,y:0+this.y},
			{x:60+this.x,y:22+this.y},
			{x:35+this.x,y:22+this.y},
			{x:35+this.x,y:22+this.y},
			{x:35+this.x,y:20+this.y},
			{x:15+this.x,y:20+this.y},
			{x:15+this.x,y:18+this.y},
			{x:0+this.x,y:18+this.y}
		]
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
		this.invTimer = null
		this.visiblityTimer = null
		this.visible = true
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
		this.bullets = 5
	}
	updatePos(deltatime){
		if(this.x<0){
      this.x=this.x+(-this.x)
    }
    if(this.x+this.width>canvas.width){
      this.x=this.x-((this.x+this.width)-canvas.width)
    }
    if(this.y<0){
      this.y=this.y+(-this.y)
    }
    if(this.y+this.height>canvas.height){
      this.y=this.y-((this.y+this.height)-canvas.height)
    }
    if(!((this.x<=0&&this.Xdir<0)||(this.x>=canvas.width-this.width&&this.Xdir>0))){
      this.x += this.Xdir*deltatime
    }
    if(!((this.y<=0&&this.Ydir<0)||(this.y>=canvas.height-this.height&&this.Ydir>0))){
      this.y += this.Ydir*deltatime
    }
		//this.x+=this.Xdir*deltatime
		//this.y+=this.Ydir*deltatime
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
		if(this.sheildHp>0){
			this.sheilded = true;
			this.collisionPoints = createTriangle(this.x-5,this.y-10,this.width+20,this.height+20)
		}
		else{
			this.sheilded = false
		}
		this.CheckPowerUpCollision()
		if(this.sheildHp>2){
			this.sheildHp=2
		}
		if(this.invTimer==null){this.CheckAsteroidCollision()}else{this.invTimer.update(deltatime)}
		if(this.visiblityTimer!=null){this.visiblityTimer.update(deltatime)}
		if(this.visible){this.draw()}
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
		for(let i in Game.Asteroids){
			if(CheckCollision(this,Game.Asteroids[i])){
				Game.Asteroids[i].hp--
				if(this.sheilded){this.sheildHp--}else{this.hp--}
				this.visiblityTimer = new Timer(0.1,()=>{
					if(this.visible){ this.visible = false }else{ this.visible = true }
				})
				this.invTimer = new Timer(1,()=>{
					this.invTimer = null
					this.visiblityTimer = null
					this.visible = true
				})
			}
		}
	}
	CheckPowerUpCollision(){
		for(let i in Game.PowerUps){
			if(CheckCollision(this,Game.PowerUps[i])){
				switch(Game.PowerUps[i].type){
					case "Sheild":
						this.sheildHp++
						this.offsetT = (this.sheildHp*10)
						break;
					case "Ammo":
						this.bullets+=Game.PowerUps[i].reload
						break;
				}
				delete Game.PowerUps[Game.PowerUps[i].id]
			}
		}
	}
}