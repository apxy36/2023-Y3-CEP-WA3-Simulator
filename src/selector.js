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

function findEditableData(obj){
    if (obj.type == "reflector"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2]]; //position, rotation, width
    } else if (obj.constructor.name == "Refractor"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Thickness", obj.thickness], ["Refractive Coefficients", obj.rcoeffs]];
    } else if (obj.type == "CLens" || obj.type == "DLens"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Focal Length", obj.flength]];
    } else if (obj.constructor.name == "Prism"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Refractive Coefficients", obj.rcoeffs]];
    } else if (obj.type == "DGrating"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Maximum Order", obj.maxorder], ["Slit Separation Distance", obj.slitdist]];
    } else if (obj.type == "NormalLight"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Wavelength", obj.wavelength]];
    } else if (obj.type == "Laser"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Number of different wavelengths", obj.number]];
    } else if (obj.type == "Flashlight"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Wavelength", obj.wavelength], ["Ray Density", obj.raydensity]];
    } else if (obj.type == "Sun"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Wavelength", obj.wavelength], ["Ray Density", obj.raydensity]];
    }
}