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
function rectCollision(rect1,rect2){
	return !(
		rect1.x > rect2.x + rect2.width ||
    rect1.x + rect1.width < rect2.x ||
    rect1.y > rect2.y + rect2.height ||
    rect1.height + rect1.y < rect2.y
		)
}
/**
 * @param {int} x - x position of the rectangle
 * @param {int} y - y position of the rectangle
 * @param {int} width - width of the rectangle
 * @param {int} height - height of the rectangle
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
			if(i+1<polygon1.collisionPoints.length){
				if(o+1<polygon2.collisionPoints.length){
					if(LineCollision(polygon1.collisionPoints[i],polygon1.collisionPoints[i+1],polygon2.collisionPoints[o],polygon2.collisionPoints[o+1])){
					  result = true
					}
					else{
						if(LineCollision(polygon1.collisionPoints[i],polygon1.collisionPoints[i+1],polygon2.collisionPoints[o],polygon2.collisionPoints[0])){
						  result = true
						}
					}
				}
			}
			else{
				if(o+1<polygon2.collisionPoints.length){
					if(LineCollision(polygon1.collisionPoints[i],polygon1.collisionPoints[0],polygon2.collisionPoints[o],polygon2.collisionPoints[o+1])){
					  result = true
					}
					else{
						if(LineCollision(polygon1.collisionPoints[i],polygon1.collisionPoints[0],polygon2.collisionPoints[o],polygon2.collisionPoints[0])){
						  result = true
						}
					}
				}
			}
		}
	}
	return result;
}