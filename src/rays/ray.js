function findObjectById(objects, id) {
  const objectMap = new Map();

  // Create a map of IDs to objects
  for (const obj of objects) {
    objectMap.set(obj.componentID, obj);
  }
  //console.log(objectMap)
  // Retrieve the object by its ID from the map
  return objectMap.get(id);
}

function convertToBasicAngle(degrees) {
  if (degrees > 0) {
    //console.log(degrees)
    if (degrees <= 90) {
      return degrees;
    } else if (degrees <= 180) {
      return 180 - degrees;
    } else if (degrees <= 270) {
      return degrees - 180;
    } else {
      return 360 - degrees;
    }
  } else {
    return convertToBasicAngle(degrees + 360);
  }
}

function vectorSideOfNormal(theta, phi) {
  //ray side of normal
  //L =0-> >0 R =1 -> <0
  // if(vectorSideOfLine(theta, phi) == 1){
  //   phi += 180;
  // }
  // Calculate the components of the normal vector based on theta
  const normalX = cos(theta);
  const normalY = sin(theta);

  // Calculate the components of the vector based on phi
  let vectorX = cos(phi);
  let vectorY = sin(phi);

  // Calculate the dot product of the vector and the normal

  const crossProduct = normalX * vectorY - normalY * vectorX;
  if (crossProduct < 0) {
    vectorX = -vectorX;
    vectorY = -vectorY;
    // phi += 180;
    // vectorX = cos(phi);
    // vectorY = sin(phi);
  }
  const dotProduct = vectorX * normalX + vectorY * normalY;
  // Determine whether the vector is on the left or right side of the normal
  if (dotProduct > 0) {
    return 0;
  } else if (dotProduct < 0) {
    return 1;
  } else {
    return 2;
  }
}

function vectorSideOfLine(lineAngle, vectorAngle) {
  // Calculate the components of the line vector
  const lineX = cos(lineAngle);
  const lineY = sin(lineAngle);

  // Calculate the components of the vector
  const vectorX = cos(vectorAngle);
  const vectorY = sin(vectorAngle);

  // Calculate the cross product of the line vector and the vector
  const crossProduct = lineX * vectorY - lineY * vectorX;

  // Compare the cross product to determine the side
  if (crossProduct > 0) {
    return 0; //L
  } else if (crossProduct < 0) {
    return 1; //R
  } else {
    return 2;
  }
}

function findIntersection(eqn1, eqn2) {
  //console.log(eqn1, eqn2)
  return createVector(
    (-1 * eqn2[1] - -1 * eqn1[1]) / (eqn1[0] * -1 - eqn2[0] * -1),
    (eqn2[0] * eqn1[1] - eqn1[0] * eqn2[1]) / (eqn1[0] * -1 - eqn2[0] * -1)
  );
}

function convertToEqn(vector, point) {
  //console.log(vector, point)
  let gradient = vector.y / vector.x;
  let yi = point.y - gradient * point.x;
  return [gradient, yi];
}

function extendLinetoEdge(pt1, pt2) {
  //console.log(createVector(pt1.x + (0 - pt1.y) * (p5.Vector.sub(pt2, pt1).x / p5.Vector.sub(pt2, pt1).y), 0), createVector(pt1.x + (height - pt1.y) * (p5.Vector.sub(pt2, pt1).x / p5.Vector.sub(pt2, pt1).y), height))
  return [
    createVector(
      pt1.x +
        (-1000 - pt1.y) *
          (p5.Vector.sub(pt2, pt1).x / p5.Vector.sub(pt2, pt1).y),
      -1000
    ),
    createVector(
      pt1.x +
        (height + 1000 - pt1.y) *
          (p5.Vector.sub(pt2, pt1).x / p5.Vector.sub(pt2, pt1).y),
      height + 1000
    ),
  ];
}

// takes wavelength in nm and returns an rgba value
function wavelengthToColor(wavelength) {
  var r,
    g,
    b,
    alpha,
    colorSpace,
    wl = wavelength,
    gamma = 1;

  if (wl >= 380 && wl < 440) {
    R = (-1 * (wl - 440)) / (440 - 380);
    G = 0;
    B = 1;
  } else if (wl >= 440 && wl < 490) {
    R = 0;
    G = (wl - 440) / (490 - 440);
    B = 1;
  } else if (wl >= 490 && wl < 510) {
    R = 0;
    G = 1;
    B = (-1 * (wl - 510)) / (510 - 490);
  } else if (wl >= 510 && wl < 580) {
    R = (wl - 510) / (580 - 510);
    G = 1;
    B = 0;
  } else if (wl >= 580 && wl < 645) {
    R = 1;
    G = (-1 * (wl - 645)) / (645 - 580);
    B = 0.0;
  } else if (wl >= 645 && wl <= 780) {
    R = 1;
    G = 0;
    B = 0;
  } else {
    R = 0;
    G = 0;
    B = 0;
  }

  // intensty is lower at the edges of the visible spectrum.
  if (wl > 780 || wl < 380) {
    alpha = 0;
  } else if (wl > 700) {
    alpha = (780 - wl) / (780 - 700);
  } else if (wl < 420) {
    alpha = (wl - 380) / (420 - 380);
  } else {
    alpha = 1;
  }

  colorSpace = [
    "rgba(" + R * 100 + "%," + G * 100 + "%," + B * 100 + "%, " + alpha + ")",
    R,
    G,
    B,
    alpha,
  ];

  // colorSpace is an array with 5 elements.
  // The first element is the complete code as a string.
  // Use colorSpace[0] as is to display the desired color.
  // use the last four elements alone or together to access each of the individual r, g, b and a channels.

  return colorSpace;
}

class Ray {
  constructor(origin, angle, intensity, ID, wavelength, display) {
    this.origin = origin;
    this.intensity = intensity;
    this.raysegments = [new RayComponent(origin, angle, width * 3, ID * 10)];
    this.angle = angle;
    this.mainid = ID;

    this.maxid = 0;
    this.lastraycount = 0;
    this.wavelength = wavelength;
    this.rgb = wavelengthToColor(this.wavelength);
    this.displayer = display;
    //this.components = [];
  }
  generate(components) {
    //this.rgb = wavelengthToColor(this.wavelength);

    //this.raysegments[0].pos.theta = this.angle;
    this.raysegments = [
      new RayComponent(
        this.origin,
        this.angle,
        width * 2,
        this.mainid,
        this.wavelength,
        this.rgb
      ),
    ];
    this.maxid = 0;
    //this.raysegments = this.raysegments.slice(0,1);
    //console.log(this.raysegments);
    //this.raysegments = [new RayComponent(this.origin, this.angle, 500, this.ID * 10)];
    let len = this.raysegments.length;
    for (let i = 0; i < this.raysegments.length; i++) {
      //runs through all components and calculates if new rays must be generated
      //let result;
      let finalresult = [false];
      let angle;
      for (let j = 0; j < components.length; j++) {
        let result = this.raysegments[i].checkCollision(components[j]); //intersects?
        if (result[0] != false) {
          //console.log("result ID: " + components[j].componentID);
          finalresult = result;
          //this.raysegments[i].terminate(result[2]);
        }
      }

      if (finalresult[0] == true) {
        //collision detected
        let component = findObjectById(components, finalresult[4]);
        this.raysegments[i].updateCollision(
          finalresult[2],
          finalresult[3],
          component,
          finalresult[0]
        );
        //console.log(component.refractiveindex)

        let theta = atan(
          -(finalresult[3][1].y - finalresult[3][0].y) /
            -(finalresult[3][1].x - finalresult[3][0].x)
        );
        //let theta = finalresult[5];
        //console.log(theta)

        //let incidence =  90 - (components[j].coords.theta - this.raysegments[i].pos.theta);
        let incidence = 90 - (theta - this.raysegments[i].pos.theta);
        if (finalresult[1] == 0) {
          //specific logic for each type of component
          //collision with reflector
          angle = 180 + this.raysegments[i].pos.theta - 2 * incidence;
          this.raysegments.push(
            new RayComponent(
              finalresult[2],
              angle,
              width * 2,
              this.mainid + (this.maxid + 1),
              this.wavelength,
              this.rgb
            )
          );
          this.maxid += 1;
        } else if (finalresult[1] == 1) {
          // //extend raysegment endpt by +2 -> see if any refractive component. if so, refractive index = component.index else RI = 1.
          let rindex1;
          let rindex2;
          theta = finalresult[5];
          incidence = 90 - (theta - this.raysegments[i].pos.theta);
          // if (theta < 0){incidence =  90 - (theta - this.raysegments[i].pos.theta);
          //   theta += 360;
          // }
          let newpos = new Polar(
            this.raysegments[i].pos.magnitude + 2,
            this.raysegments[i].pos.theta
          );
          let endpt = p5.Vector.add(
            this.raysegments[i].start,
            newpos.convertCartesian()
          );
          for (let j = 0; j < components.length; j++) {
            if (components[j].type == "refractor") {
              if (collidePointPoly(endpt.x, endpt.y, components[j].vertices)) {
                //if entering a medium
                if (components[j].componentID != finalresult[4]) {
                  //exiting first medium and entering second medium
                  rindex1 = component.ricalc(this.wavelength);
                  rindex2 = components[j].ricalc(this.wavelength);
                } else {
                  //entering first medium
                  rindex1 = 1;
                  rindex2 = component.ricalc(this.wavelength);
                  //console.log(1)
                }
                break;
              }
              //calc for angle of refraction
            }
          }
          if (!rindex1) {
            //exiting first medium into space
            rindex1 = component.ricalc(this.wavelength);
            rindex2 = 1; //air
          }
          //console.log(rindex1, rindex2)
          incidence = 90 - (theta - this.raysegments[i].pos.theta);
          let baseincidence = convertToBasicAngle(incidence);
          //let baseincidence = incidence;
          let refractionangle = asin((rindex1 * sin(baseincidence)) / rindex2);
          //console.log(baseincidence, rindex1)
          if (this.raysegments[i].pos.theta < 0) {
            this.raysegments[i].pos.theta += 360;
          }
          let exitangle;
          if (
            rindex2 < rindex1 &&
            Math.abs(baseincidence) > asin(rindex2 / rindex1)
          ) {
            //TOTAL internal reflection
            //console.log(incidence)
            exitangle =
              180 +
              this.raysegments[i].pos.theta -
              2 * (90 - (theta - this.raysegments[i].pos.theta));
          } else {
            let side = vectorSideOfNormal(this.raysegments[i].pos.theta, theta);
            if (side == 1) {
              exitangle =
                this.raysegments[i].pos.theta +
                (baseincidence - refractionangle); // 0< angle < 90 and negative -> error\
              //console.log(1)
            } else if (side == 0) {
              exitangle =
                this.raysegments[i].pos.theta -
                (baseincidence - refractionangle);
            } else {
              //parallel thru normal
              exitangle = this.raysegments[i].pos.theta;
            }
            //this.raysegments[i].pos.theta < 90 || this.raysegments[i].pos.theta > 270
          }
          this.raysegments.push(
            new RayComponent(
              finalresult[2],
              exitangle,
              width * 2,
              this.mainid + (this.maxid + 1),
              this.wavelength,
              this.rgb
            )
          );
          this.maxid += 1;
        } else if (finalresult[1] == 2) {
          //Converging lens
          //First, calculate the eqn of a ray going thru the centre of the lens from the origin of the ray component
          let middleray = p5.Vector.sub(
            component.pos,
            this.raysegments[i].start
          );
          //temp changing width of lens to the entire length of canvas
          component.coords.magnitude = width;
          let paralleltheta; //determines which side the focal point will be on
          let focalpttheta;
          if (
            vectorSideOfLine(
              component.coords.theta,
              this.raysegments[i].pos.theta
            ) == 0
          ) {
            paralleltheta = component.coords.theta + 90;
            focalpttheta = component.coords.theta + 90;
            component.side = 0;
          } else {
            paralleltheta = component.coords.theta - 90;
            focalpttheta = component.coords.theta - 90;
            component.side = 1;
          }
          let tempray = new RayComponent(
            this.raysegments[i].start,
            paralleltheta,
            width,
            "TEMP"
          );
          component.start = p5.Vector.sub(
            component.pos,
            component.coords.convertCartesian()
          );
          component.end = p5.Vector.add(
            component.coords.convertCartesian(),
            component.pos
          );
          //console.log(tempray.start, tempray.endpt)
          let tempintercept = collideLineLine(
            tempray.start.x,
            tempray.start.y,
            tempray.endpt.x,
            tempray.endpt.y,
            component.start.x,
            component.start.y,
            component.end.x,
            component.end.y,
            true
          );
          tempintercept = createVector(tempintercept.x, tempintercept.y);
          let focaloffset = new Polar(component.flength, focalpttheta);

          let focalpt = p5.Vector.add(
            component.pos,
            focaloffset.convertCartesian()
          );
          point(focalpt.x, focalpt.y);
          //two lines: focalpt to tempintercept and this.start to component.pos

          strokeWeight(1);
          let extendedparallelline = extendLinetoEdge(focalpt, tempintercept);
          let extendedmiddleline = extendLinetoEdge(
            component.pos,
            this.raysegments[i].start
          );
          let intersection = collideLineLine(
            extendedparallelline[0].x,
            extendedparallelline[0].y,
            extendedparallelline[1].x,
            extendedparallelline[1].y,
            extendedmiddleline[0].x,
            extendedmiddleline[0].y,
            extendedmiddleline[1].x,
            extendedmiddleline[1].y,
            true
          );
          intersection = createVector(intersection.x, intersection.y);
          //point(intersection.x, intersection.y)
          component.coords.magnitude = component.width / 2;
          component.start = p5.Vector.sub(
            component.pos,
            component.coords.convertCartesian()
          );
          component.end = p5.Vector.add(
            component.coords.convertCartesian(),
            component.pos
          );
          let newangle = atan2(
            p5.Vector.sub(intersection, finalresult[2]).y,
            p5.Vector.sub(intersection, finalresult[2]).x
          );
          if (
            vectorSideOfLine(
              component.coords.theta,
              this.raysegments[i].pos.theta
            ) != vectorSideOfLine(component.coords.theta, newangle)
          ) {
            newangle += 180;
          }
          this.raysegments.push(
            new RayComponent(
              finalresult[2],
              newangle,
              width * 2,
              this.mainid + (this.maxid + 1),
              this.wavelength,
              this.rgb
            )
          );
        } else if (finalresult[1] == 3) {
          //First, calculate the eqn of a ray going thru the centre of the lens from the origin of the ray component
          let middleray = p5.Vector.sub(
            component.pos,
            this.raysegments[i].start
          );
          //temp changing width of lens to the entire length of canvas
          component.coords.magnitude = width;
          let paralleltheta; //determines which side the focal point will be on
          let focalpttheta;
          if (
            vectorSideOfLine(
              component.coords.theta,
              this.raysegments[i].pos.theta
            ) == 0
          ) {
            //double check //theta works
            paralleltheta = component.coords.theta + 90;
            focalpttheta = component.coords.theta - 90;
            component.side = 0;
          } else {
            paralleltheta = component.coords.theta - 90;
            focalpttheta = component.coords.theta + 90;
            component.side = 1;
          }
          let tempray = new RayComponent(
            this.raysegments[i].start,
            paralleltheta,
            width,
            "TEMP"
          );
          component.start = p5.Vector.sub(
            component.pos,
            component.coords.convertCartesian()
          );
          component.end = p5.Vector.add(
            component.coords.convertCartesian(),
            component.pos
          );
          let tempintercept = collideLineLine(
            tempray.start.x,
            tempray.start.y,
            tempray.endpt.x,
            tempray.endpt.y,
            component.start.x,
            component.start.y,
            component.end.x,
            component.end.y,
            true
          );
          tempintercept = createVector(tempintercept.x, tempintercept.y);
          let focaloffset = new Polar(component.flength, focalpttheta);

          let focalpt = p5.Vector.add(
            component.pos,
            focaloffset.convertCartesian()
          );
          point(focalpt.x, focalpt.y);
          strokeWeight(1);
          let extendedparallelline = extendLinetoEdge(focalpt, tempintercept);
          let extendedmiddleline = extendLinetoEdge(
            component.pos,
            this.raysegments[i].start
          );
          let intersection = collideLineLine(
            extendedparallelline[0].x,
            extendedparallelline[0].y,
            extendedparallelline[1].x,
            extendedparallelline[1].y,
            extendedmiddleline[0].x,
            extendedmiddleline[0].y,
            extendedmiddleline[1].x,
            extendedmiddleline[1].y,
            true
          );
          intersection = createVector(intersection.x, intersection.y);
          //point(intersection.x, intersection.y);
          let newangle = atan2(
            p5.Vector.sub(intersection, finalresult[2]).y,
            p5.Vector.sub(intersection, finalresult[2]).x
          );
          if (
            vectorSideOfLine(
              component.coords.theta,
              this.raysegments[i].pos.theta
            ) != vectorSideOfLine(component.coords.theta, newangle)
          ) {
            newangle += 180;
          }
          this.raysegments.push(
            new RayComponent(
              finalresult[2],
              newangle,
              width * 2,
              this.mainid + (this.maxid + 1),
              this.wavelength,
              this.rgb
            )
          );

          component.coords.magnitude = component.width / 2;
          component.start = p5.Vector.sub(
            component.pos,
            component.coords.convertCartesian()
          );
          component.end = p5.Vector.add(
            component.coords.convertCartesian(),
            component.pos
          );
        } else if (finalresult[1] == 4) {
          //Dgrating
          let angles = []; //stores the entire set of angles of order
          let wavelength = this.wavelength; //nanometers
          //Firstly, calculate all possible order angles from the wavelength and the slitdist
          for (let i = 0; i < component.maxorder; i++) {
            //limits max to 10
            if (component.slitdist * 1000 > wavelength) {
              angles.push(asin(wavelength / (component.slitdist * 1000))); //unit change to nm
              wavelength += this.wavelength;
            } else break;
          }
          let normaltheta;
          //Now, generate first set of rays
          if (
            vectorSideOfLine(
              component.coords.theta,
              this.raysegments[i].pos.theta
            ) == 0
          ) {
            //double check //theta works
            normaltheta = component.coords.theta + 90;
          } else {
            normaltheta = component.coords.theta - 90;
          }
          this.maxid += 1;
          this.raysegments.push(
            new RayComponent(
              finalresult[2],
              normaltheta,
              width * 2,
              this.mainid + this.maxid,
              this.wavelength,
              this.rgb
            )
          );
          for (let i = 0; i < angles.length; i++) {
            let newtheta = normaltheta + angles[i];
            this.maxid += 1;
            this.raysegments.push(
              new RayComponent(
                finalresult[2],
                newtheta, //the problem here is htat the angles are not being reated properly
                width * 2,
                this.mainid + this.maxid,
                this.wavelength,
                this.rgb
              )
            );
          }
          //Generate second set of rays
          for (let i = 0; i < angles.length; i++) {
            this.maxid += 1;
            let newtheta = normaltheta - angles[i];
            this.raysegments.push(
              new RayComponent(
                finalresult[2],
                newtheta,
                width * 2,
                this.mainid + this.maxid,
                this.wavelength,
                this.rgb
              )
            );
          }
        }
      }
    }
    if (this.raysegments.length < this.lastraycount) {
      //rays deleted
      for (let i = 1; i <= this.lastraycount - this.raysegments.length; i++) {
        let targetID = this.mainid + (this.lastraycount - i);
        for (let j = 0; j < components.length; j++) {
          let index = components[j].intersectIDs.indexOf(targetID);
          if (index != -1) {
            components[j].intersectIDs.splice(index, 1); //removes obj from array
            components[j].intersectpts.splice(index, 1);
            components[j].intersectedges.splice(index, 1);
            break;
          }
        }
      }
    }

    this.lastraycount = this.raysegments.length;
  }

  display() {
    for (let i = 0; i < this.raysegments.length; i++) {
      this.raysegments[i].display(this.displayer);
    }
  }
}
