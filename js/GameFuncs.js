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
function createTriangle(X,Y,width,height){
	return [
		{x:0+X,y:0+Y},
		{x:width+X,y:height/2+Y},
		{x:0+X,y:height+Y}
	]
}
function rectCollision(rect1,rect2){
	return !(
		rect1.y + rect1.height < rect2.y || 
		rect1.y > rect2.y + rect2.height || 
		rect1.x + rect1.width < rect2.x ||
		rect1.x > rect2.x + rect2.width
	)
}
function polygonCollision(polygon1,polygon2){
	let result = false
	for(let i=0;i<polygon1.points.length;i++){
		for(let o=0;o<polygon2.points.length;o++){
			if(i+1<polygon1.points.length){
				if(o+1<polygon2.points.length){
					if(LineCollision(polygon1.points[i],polygon1.points[i+1],polygon2.points[o],polygon2.points[o+1])){
					  result = true
					}
					else{
						if(LineCollision(polygon1.points[i],polygon1.points[i+1],polygon2.points[o],polygon2.points[0])){
						  result = true
						}
					}
				}
			}
			else{
				if(o+1<polygon2.points.length){
					if(LineCollision(polygon1.points[i],polygon1.points[0],polygon2.points[o],polygon2.points[o+1])){
					  result = true
					}
					else{
						if(LineCollision(polygon1.points[i],polygon1.points[0],polygon2.points[o],polygon2.points[0])){
						  result = true
						}
					}
				}
			}
		}
	}
	return result;
}