function selectindex(components, point){
  for (let i = 0; i < components.length; i++){
    //console.log(components[i])
    if (collidePointPoly(point.x, point.y, components[i].vertices)){
      return i;
    }
  }
  return -1; //not in any shape
}