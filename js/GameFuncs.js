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
function circleCollision(circle1,circle2){	//return distance (number)
	var dx = circle2.x - circle1.x
	var dy = circle2.y - circle1.y
	return Math.hypot(dx,dy)//Math.sqrt();
}