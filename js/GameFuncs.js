//@ts-check
function LineCollision(a,b,c,d){
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
function createTriangle(X,Y,width,height){
	return [
		{x:0+X,y:0+Y},
		{x:width+X,y:height/2+Y},
		{x:0+X,y:height+Y}
	]
}
function RandomPowerUp(id){
	let num = Math.ceil(Math.random()*2)
	switch(num){
		case 1:
			return new Sheild(id)
		case 2:
			return new Ammo(id)
		default:
			console.log("error at making power up"+"\nnum:"+num)
			document.writeln("error at making power up"+"\nnum"+num)
			return
	}
}
function pointCollison(point, polygon){
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
		if(polygon[i+1]!=undefined){
			if(LineCollision(line1.p1,line1.p2,polygon[i],polygon[i+1])){
				top_collision=true
			}
			if(LineCollision(line2.p1,line2.p2,polygon[i],polygon[i+1])){
				bottom_collision=true
			}
			if(LineCollision(line3.p1,line3.p2,polygon[i],polygon[i+1])){
				left_collision=true
			}
			if(LineCollision(line4.p1,line4.p2,polygon[i],polygon[i+1])){
				right_collision=true
			}
		}
		else{
			if(LineCollision(line1.p1,line1.p2,polygon[0],polygon[i])){
				top_collision=true
			}
			if(LineCollision(line2.p1,line2.p2,polygon[0],polygon[i])){
				bottom_collision=true
			}
			if(LineCollision(line3.p1,line3.p2,polygon[0],polygon[i])){
				left_collision=true
			}
			if(LineCollision(line4.p1,line4.p2,polygon[0],polygon[i])){
				right_collision=true
			}
		}
	}
	return top_collision && bottom_collision && left_collision && right_collision
}
/**
 * 
 * @param {object} rect1 - rectangle 1
 * @param {object} rect2 - rectangle 2
 * @returns {boolean} colliding?
 */
function rectCollision(rect1,rect2){
	let longestSide1 = Math.max(rect1.width,rect1.height)
	let longestSide2 = Math.max(rect2.width,rect2.height)
	return !(
		rect1.x > rect2.x + longestSide2 ||
    rect1.x + longestSide1 < rect2.x ||
    rect1.y > rect2.y + longestSide2 ||
    longestSide1 + rect1.y < rect2.y
		)
}
function rotatePoint(point,angle,center){
	let dx = center.x - point.x
	let dy = center.y - point.y
	let dist = Math.sqrt(dx*dx+dy*dy)
	let rad = -Math.atan2(dx,dy)
	let radi = angle * Math.PI / 180
	let rotatedPoint = {
		x:Math.cos(rad+radi)*dist+center.x,
		y:Math.sin(rad+radi)*dist+center.y
	}
	return rotatedPoint
}
function RotatePolygon(points,angle,center){
	let rotatedPoints = []
	points.forEach((i,o)=>{
		rotatedPoints.push(rotatePoint(points[o],angle,center))
	})
	return rotatedPoints
}
/**
 * @param {number} x - x position of the rectangle
 * @param {number} y - y position of the rectangle
 * @param {number} width - width of the rectangle
 * @param {number} height - height of the rectangle
 * @returns {Array} array with all the collisionPoints making the rectangle
 */
function createRect(x,y,width,height){
	return [
		{x:0+x,y:0+y},
		{x:width+x,y:0+y},
		{x:width+x,y:height+y},
		{x:0+x,y:height+y}
	]
}
function polygonCollision(polygon1,polygon2){
	let result = false
	for(let i=0;i<polygon1.collisionPoints.length;i++){
		for(let o=0;o<polygon2.collisionPoints.length;o++){
			if(polygon1.collisionPoints[i+1]!=null){
				if(polygon2.collisionPoints[o+1]!=null){
					if(LineCollision(polygon1.collisionPoints[i],polygon1.collisionPoints[i+1],polygon2.collisionPoints[o],polygon2.collisionPoints[o+1])){
						result = true
					}	
				}
				else{
					if(LineCollision(polygon1.collisionPoints[i],polygon1.collisionPoints[i+1],polygon2.collisionPoints[o],polygon2.collisionPoints[0])){
						result = true
					}
				}
			}
			else{
				if(polygon2.collisionPoints[o+1]!=null){
					if(LineCollision(polygon1.collisionPoints[i],polygon1.collisionPoints[0],polygon2.collisionPoints[o],polygon2.collisionPoints[o+1])){
						result = true
					}	
				}
				else{
					if(LineCollision(polygon1.collisionPoints[i],polygon1.collisionPoints[0],polygon2.collisionPoints[o],polygon2.collisionPoints[0])){
						result = true
					}
				}
			}
		}
	}
	return result;
}