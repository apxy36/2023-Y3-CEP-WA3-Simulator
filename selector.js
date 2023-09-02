function selectindex(components, point){
  for (let i = 0; i < components.length; i++){
    //console.log(components[i])
    if (collidePointPoly(point.x, point.y, components[i].vertices)){
      return i;
    } else if (components[i].type == "CLens" || components[i].type == "DLens" || components[i].type == "DGrating" || components[i].type == "CGrating" || components[i].type == "Prism" || components[i].type == "Sun"){
      if (collidePointPoly(point.x, point.y, components[i].displayvertices)){
        console.log(components[i].type)
        return i;
      }
    }
  }
  return -1; //not in any shape
}