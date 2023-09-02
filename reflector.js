class Reflector {
  constructor(pos, w, angle, ID, display) {
    this.pos = pos;
    this.coords = new Polar(w / 2, angle);
    this.thickness = w / 10;
    this.normallen = w / 5;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "reflector";
    this.componentID = ID;
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
    this.displayer = display;
    
    //draggable functionality
    this.dragged = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.minimumWidth = 10;
    this.minimumHeight = 10;
    this.selected = false;
    
    //vertex creation
    this.vertices = [this.start, this.end];
    let offsetcoord = new Polar(this.thickness, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.vertices.push(extrapt2);
    this.vertices.push(extrapt1);
  }
  updateCoords() {
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.vertices = [this.start, this.end];
    let offsetcoord = new Polar(this.thickness, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.vertices.push(extrapt2);
    this.vertices.push(extrapt1);
    
    
    
    
    //scaling functoinality
    // if (mouseX - this.pos.x + this.offsetX > this.minimumWidth) {
    //       this.width = mouseX - this.x + this.offsetX;
    //     } else {
    //       this.width = this.minimumWidth;
    //     }
    //     if (mouseY - this.y + this.offsetY > this.minimumHeight) {
    //       this.height = mouseY - this.y + this.offsetY;
    //     } else {
    //       this.height = this.minimumHeight;
    //     }
  }
  display(canvas) {
    this.updateCoords();
    
    canvas.stroke(0);
    if (this.selected){
      canvas.fill(200,200,200);
    }
    canvas.beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
      let pointer = this.vertices[i];
      canvas.vertex(pointer.x, pointer.y);
    }
    canvas.endShape(CLOSE);
    
    this.update();
  }
  displayNormal(pt, edge) {
    let index = this.intersectpts.indexOf(pt);
    let theta = atan2(
      -(this.intersectedges[index][1].y - this.intersectedges[index][0].y),
      -(this.intersectedges[index][1].x - this.intersectedges[index][0].x)
    );
    let normalcoord1 = new Polar(this.normallen, theta + 90);
    let normalcoord2 = new Polar(this.normallen, theta - 90);
    let extendpt1 = p5.Vector.add(pt, normalcoord1.convertCartesian());
    let extendpt2 = p5.Vector.add(pt, normalcoord2.convertCartesian());
    this.displayer.push();
    this.displayer.strokeWeight(1);
    this.displayer.drawingContext.setLineDash([3, 3]);
    this.displayer.line(extendpt1.x, extendpt1.y, extendpt2.x, extendpt2.y);
    this.displayer.pop();
  }
  displayIntersects() {
    
    //console.log(this.intersectIDs);
    for (let i = 0; i < this.intersectpts.length; i++) {
      this.displayNormal(this.intersectpts[i]);
    }
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
  }
  clicked(){
    //if mouse over resize buttons
    //(...)
    this.dragged = true;
    this.offsetX = this.pos.x - mouseX;
    this.offsetY = this.pos.y - mouseY;
    console.log(this.offsetX, this.offsetY)
  }
  released(){
    this.dragged = false;
  }
  
  
  update(){
    //dragging functionality
    if (this.dragged){
      this.setPos(mouseX + this.offsetX, mouseY + this.offsetY);
    }
    
    //visuals
    if (this.selected){
      this.displaySelect(this.displayer);
    }
    
  }
  
  setPos(x,y){
    let vector_x = x - this.pos.x;
    let vector_y = y - this.pos.y;

    for (let index = 0; index < this.vertices.length; index++) {
      let vertex = this.vertices[index];

      this.vertices[index].x += vector_x;
      this.vertices[index].y += vector_y;
    }

    this.pos.x += vector_x;
    this.pos.y += vector_y;
  }
  
  
  
  select(){
    this.selected = true;
  }
  
  deselect(){
    this.selected = false;
  }
  
  displaySelect(canvas){
    this.displayer.fill(100,100,100,100);
    //avg -> middle of shape
    let centre = findCentre(this.vertices);
    this.displayer.stroke(100)
    this.displayer.circle(centre.x, centre.y, 10);
    this.displayer.stroke(0)
    this.displayer.fill('white');
  }
  setRotation(rotation) {
    /*  
    Rotating 2D Polygon in JS (PothOnProgramming)
        https://youtu.be/3kICmEJ-xyo?t=436      
    */
    let degrees = rotation - this.coords.theta;
    let unit_x = cos(degrees);
    let unit_y = sin(degrees);
    //console.log(unit_x, unit_y)
    for (let index = 0; index < this.vertices.length; index++) {
      let vertex = this.vertices[index];

      // Translate the vertex to the origin.
      let vector_x = vertex.x - this.pos.x;
      let vector_y = vertex.y - this.pos.y;

      vertex.x = vector_x * unit_x - vector_y * unit_y + this.pos.x;
      vertex.y = vector_x * unit_y + vector_y * unit_x + this.pos.y;
      //console.log(vertex)
    }
    //console.log(this.vertices)
    this.coords.theta = rotation;
  }

  
  
}
function findCentre(vertices) {
  let centreX = 0, centreY = 0;
  for (let i = 0; i < vertices.length; i++){
    centreX += vertices[i].x;
    centreY += vertices[i].y;
  }
  
  return createVector(centreX / vertices.length, centreY / vertices.length);
}


class Refractor extends Reflector {
  constructor(pos, w, angle, ID, t, rindex, rcoeffs, display) {
    super(pos, w, angle, ID);
    this.thickness = t;
    this.coords = new Polar(w / 2, angle);
    this.normallen = w / 5;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "refractor";
    this.componentID = ID;
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
    this.displayer = display;

    this.vertices = [this.start, this.end];
    this.displayvertices = [this.start, this.end];
    let offsetcoord = new Polar(this.thickness, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.displayvertices.push(extrapt2);
    this.displayvertices.push(extrapt1);

    this.refractiveindex = rindex;
    this.rcoeffs = rcoeffs; // B:[] C:[] refractive coeffs for sellmeier eqn
  }
  ricalc(wavelength){//three term approximation
    wavelength = wavelength / 1000; //convert to micrometers
    //this.rcoeffs = [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]];
    return ((1+(this.rcoeffs[0][0]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][0]) + (this.rcoeffs[0][1]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][1]) + (this.rcoeffs[0][2]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][2])) / wavelength
           )**0.5
  }
}



function findVertexIndex(vertices, X, Y){
  for (let i = 0; i < vertices.length; i++){
    let vertex = vertices[i];
    if (vertex.x == x && vertex.y == y){
      return i;
    }
  }
  return -1;
}


class DiffractionGrating extends Reflector{
  constructor(pos, w, angle, ID, slitdist, maxorder, display){
    super(pos, w, angle, ID);
    this.slitdist = slitdist; //in micrometers
    this.width = w; 
    this.coords = new Polar(w / 2, angle);
    this.normallen = w / 5;
    this.thickness = w / 10;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "DGrating";
    this.componentID = ID;
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
    this.displayer = display;
    
    //draggable functionality
    this.dragged = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.minimumWidth = 10;
    this.minimumHeight = 10;
    this.selected = false;

    this.vertices = [this.start, this.end];
    this.displayvertices = [this.start, this.end];
    this.maxorder = maxorder;
    
    let offsetcoord = new Polar(10, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.displayvertices.push(extrapt2);
    this.displayvertices.push(extrapt1);
  }
  updateCoords(){
        this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.vertices = [this.start, this.end];
    this.displayvertices = [this.start, this.end];
    let offsetcoord = new Polar(10, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.displayvertices.push(extrapt2);
    this.displayvertices.push(extrapt1);
  }
  display(canvas){
    canvas.stroke(0);
    this.updateCoords();
    //this.update();
    canvas.push();
    canvas.translate(this.pos.x, this.pos.y);
    canvas.rotate(this.coords.theta * PI / 180);
    canvas.fill('blue')
    canvas.ellipse(0,0, this.coords.magnitude * 2, this.thickness);
    canvas.fill('grey')
    canvas.pop();
    this.update();
  }
  setRotation(rotation) {
    /*  
    Rotating 2D Polygon in JS (PothOnProgramming)
        https://youtu.be/3kICmEJ-xyo?t=436      
    */
    this.coords.theta = rotation;
    this.updateCoords();

}



}
