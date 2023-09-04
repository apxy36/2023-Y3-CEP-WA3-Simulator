class RayComponent {
  constructor(start, direction, length, ID, wavelength, rgb) {
    this.start = start;
    this.pos = new Polar(length, direction);
    this.origmag = length;
    this.endpt = p5.Vector.add(this.start, this.pos.convertCartesian());
    this.ID = ID;
    this.wavelength = wavelength;
    this.rgb = rgb;
  }
  display(canvas) {
    canvas.strokeWeight(1);
    canvas.stroke(this.rgb[0]);
    this.endpt = p5.Vector.add(this.start, this.pos.convertCartesian());
    let arrowpt1 = new Polar(this.pos.magnitude / 2.2, this.pos.theta - 5);
    let arrowpt2 = new Polar(this.pos.magnitude / 2.2, this.pos.theta + 5);
    let midpoint = new Polar(this.pos.magnitude / 2, this.pos.theta);
    //let endpt = this.pos.convertCartesian();
    //endpt = p5.Vector.add(this.start, endpt);
    canvas.line(this.start.x, this.start.y, this.endpt.x, this.endpt.y);
    let midpt = p5.Vector.add(this.start, midpoint.convertCartesian());
    //line(midpt.x, midpt.y, arrowpt1.convertCartesian().x, arrowpt1.convertCartesian().y);
    let a1 = p5.Vector.add(arrowpt1.convertCartesian(), this.start);
    let a2 = p5.Vector.add(arrowpt2.convertCartesian(), this.start);
    canvas.line(a1.x, a1.y, midpt.x, midpt.y);
    canvas.line(a2.x, a2.y, midpt.x, midpt.y);
  }
  terminate(pt) {
    let magnitude = p5.Vector.sub(pt, this.start);
    //console.log(magnitude.mag());
    //console.log(1)
    this.pos.magnitude = magnitude.mag() + 1;
    this.endpt = p5.Vector.add(this.start, this.pos.convertCartesian());
    //this.pos.mult(magnitude.mag());
  }
  checkCollision(component) {
    //for reflections, check line
    //if(component.type == "reflector"){
    let intersectarr = []; //array of all intercepts with component
    let magarr = []; //arr of all mags of line of intercept with component
    let pts = [];
    let intersect;
    let index = component.intersectIDs.indexOf(this.ID); //searches for intercept with this ray component
    //this.pos.magnitude = this.origmag;
    this.endpt = p5.Vector.add(this.start, this.pos.convertCartesian());
    component.vertices.push(component.vertices[0]);
    for (let i = 0; i < component.vertices.length - 1; i++) {
      //console.log(component.vertices);
      //console.log(component.vertices[i], component.vertices[i+1]);
      let inter = collideLineLine(
        this.start.x,
        this.start.y,
        this.endpt.x,
        this.endpt.y,
        component.vertices[i].x,
        component.vertices[i].y,
        component.vertices[i + 1].x,
        component.vertices[i + 1].y,
        true
      );
      if (inter.x != false) {
        //line passes thru shape

        inter = createVector(inter.x, inter.y);
        let mag1 = p5.Vector.sub(inter, this.start).mag();
        if (mag1 > 1) {
          //no intersect with origin edge
          intersectarr.push(inter);

          magarr.push(p5.Vector.sub(this.start, inter).mag());
          //console.log(inter);
          pts.push([component.vertices[i], component.vertices[i + 1]]);
          //angles.push()
        }
      }
    }
    component.vertices.pop();
    //console.log(component.vertices.length);
    //console.log(intersectarr, magarr);

    if (magarr.length > 0) {
      //if intersects are detected
      let minmag = min(magarr); //finds intercept closest to start pt of ray
      let minindex = magarr.indexOf(minmag);
      let intersect = intersectarr[minindex];
      let edge = pts[minindex];
      this.terminate(intersect);
      let theta = atan(-(edge[1].y - edge[0].y) / -(edge[1].x - edge[0].x));
      if (component.type == "reflector") {
        return [true, 0, intersect, edge, component.componentID]; //reflector = 0, refractive medium = 1,
      } else if (component.type == "refractor") {
        return [true, 1, intersect, edge, component.componentID, theta];
      } else if (component.type == "CLens") {
        return [
          true,
          2,
          intersect,
          edge,
          component.componentID,
          component.flength,
        ];
      } else if (component.type == "DLens") {
        return [
          true,
          3,
          intersect,
          edge,
          component.componentID,
          component.flength,
        ];
      } else if (component.type == "DGrating") {
        return [
          true,
          4,
          intersect,
          edge,
          component.componentID,
          component.slitdist,
        ];
      }

      return [false]; //reflector = 0, refractive medium = 1,
    } else {
      if (index != -1) {
        component.intersectIDs.splice(index, 1); //removes obj from array
        component.intersectpts.splice(index, 1);
        component.intersectedges.splice(index, 1);
      }
      return [false];
    }
  }

  updateCollision(intersect, edge, component) {
    //registers intercept with component

    this.terminate(intersect);
    let index = component.intersectIDs.indexOf(this.ID);

    if (index != -1) {
      //if the ID is already registered by the reflector
      //           if(component.intersectpts[index].x != intersect.x || component.intersectpts[index].y != intersect.y){ //if pos of intersection has changed

      component.intersectpts[index] = intersect; //updates intersect pt
      component.intersectedges[index] = edge;
    } else {
      //this.terminate(intersect);
      component.intersectpts.push(intersect);
      component.intersectIDs.push(this.ID);
      component.intersectedges.push(edge);
    }

    //return [true, 0, intersect, edge]; //reflector = 0, refractive medium = 1, clens = 2, dlens = 3

    if (index != -1) {
      component.intersectIDs.splice(index, 1); //removes obj from array if still in array but not touching anyomore
      component.intersectpts.splice(index, 1);
      component.intersectedges.splice(index, 1);
    }
    return [false];
  }
}
