class DiffractionGrating extends Reflector {
  constructor(pos, w, angle, ID, slitdist, maxorder, display) {
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
  updateCoords() {
    this.thickness = this.width / 10;
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
  display(canvas) {
    canvas.stroke(0);
    this.updateCoords();
    //this.update();
    canvas.push();
    canvas.translate(this.pos.x, this.pos.y);
    canvas.rotate((this.coords.theta * PI) / 180);
    canvas.fill("gray");
    canvas.strokeWeight(1);
    canvas.stroke("white");
    canvas.ellipse(0, 0, this.coords.magnitude * 2, this.thickness);
    canvas.fill("grey");
    canvas.pop();
    this.update();
  }
  setRotation(rotation) {
    this.coords.theta = rotation;
    this.updateCoords();
  }
}
