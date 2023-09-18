class ConvergingLens extends Reflector {
  constructor(pos, w, angle, ID, focallength, display) {
    super(pos, w, angle, ID);
    this.flength = focallength;
    this.width = w;
    this.coords = new Polar(w / 2, angle);
    this.normallen = w / 5;
    this.thickness = w / 10;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "CLens";
    this.side = 0;
    this.componentID = ID;
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
    this.displayer = display;
    this.vertices = [this.start, this.end];
    this.displayvertices = [];
    let offsetcoord = new Polar(10, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    let extrapt3 = p5.Vector.sub(this.start, offsetvector);
    let extrapt4 = p5.Vector.sub(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.displayvertices = [extrapt3, extrapt4, extrapt2, extrapt1];
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
    let extrapt3 = p5.Vector.sub(this.start, offsetvector);
    let extrapt4 = p5.Vector.sub(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.displayvertices = [extrapt3, extrapt4, extrapt2, extrapt1];
  }
  display(canvas) {
    canvas.stroke(0);
    this.updateCoords();
    canvas.strokeWeight(1);
    canvas.push();
    canvas.fill("blue");
    canvas.stroke("white");
    canvas.translate(this.pos.x, this.pos.y);
    canvas.rotate((this.coords.theta * Math.PI) / 180);

    canvas.ellipse(0, 0, this.coords.magnitude * 2, this.thickness);
    canvas.pop();
    this.displayFocal(this.side);
    this.update();
  }
  displayFocal(side) {
    //side = 0 for left, side = 1 for right
    let offset = new Polar(this.flength, this.coords.theta);
    if (side == 0) {
      offset.theta += 90;
    } else {
      offset.theta -= 90;
    }

    this.displayer.strokeWeight(5);
    this.displayer.stroke("white");
    let result = p5.Vector.add(this.pos, offset.convertCartesian());
    this.displayer.point(result.x, result.y);
  }
  setRotation(angle) {
    this.coords.theta = angle;
    this.updateCoords();
  }
}

class DivergingLens extends Reflector {
  constructor(pos, w, angle, ID, focallength, display) {
    super(pos, w, angle, ID);
    this.flength = focallength;
    this.width = w;
    this.coords = new Polar(w / 2, angle);
    this.normallen = w / 5;
    this.thickness = w / 10;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "DLens";
    this.componentID = ID;
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
    this.displayer = display;
    this.side = 0;

    //draggable functionality
    this.dragged = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.minimumWidth = 10;
    this.minimumHeight = 10;
    this.selected = false;

    this.vertices = [this.start, this.end];
    this.displayvertices = [];
    let offsetcoord = new Polar(10, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    let extrapt3 = p5.Vector.sub(this.start, offsetvector);
    let extrapt4 = p5.Vector.sub(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.displayvertices = [extrapt3, extrapt4, extrapt2, extrapt1];
  }
  updateCoords() {
    this.thickness = this.width / 10;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.vertices = [this.start, this.end];
    let offsetcoord = new Polar(10, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    let extrapt3 = p5.Vector.sub(this.start, offsetvector);
    let extrapt4 = p5.Vector.sub(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.displayvertices = [extrapt3, extrapt4, extrapt2, extrapt1];
  }
  display(canvas) {
    canvas.stroke(0);
    this.updateCoords();
    canvas.strokeWeight(1);
    canvas.push();

    canvas.fill("lightblue");
    canvas.translate(this.pos.x, this.pos.y);
    canvas.rotate((this.coords.theta * PI) / 180);
    canvas.ellipse(0, 0, this.coords.magnitude * 2, this.thickness);
    canvas.pop();
    this.displayFocal(this.side);
    this.update();
  }
  displayFocal(side) {
    let offset = new Polar(this.flength, this.coords.theta);
    if (side == 0) {
      offset.theta -= 90;
    } else {
      offset.theta += 90;
    }
    this.displayer.stroke("white");
    this.displayer.strokeWeight(5);
    let result = p5.Vector.add(this.pos, offset.convertCartesian());
    this.displayer.point(result.x, result.y);
  }
  setRotation(angle) {
    this.coords.theta = angle;
    this.updateCoords();
  }
}
