class NormalLight extends Reflector{
  constructor(pos, w, angle, ID, wavelength, display){
    super(pos,w,angle, ID);
    this.pos = pos;
    
    this.width = w; 
    this.coords = new Polar(w / 2, angle);
    this.normallen = w / 5;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "NormalLight";
    this.componentID = ID;
    this.wavelength = wavelength;
    this.thickness = w * 1.5;
    this.vertices = [this.start, this.end];
    this.rays = [];
    this.maxID = 'zz';
    this.displayer = display //where its gonna be displayed
    
    //draggable functionality
    this.dragged = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.minimumWidth = 10;
    this.minimumHeight = 10;
    this.selected = false;
    
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
  generateRays(componentarr){
    this.maxID = 0;
    this.rays = [];
    this.rays.push(new Ray(this.pos, this.coords.theta - 90 , 250, this.componentID + (this.maxID ), this.wavelength, this.displayer));
    this.rays[0].generate(componentarr);
    
    for (let i = 0; i < this.rays.length; i++){

      this.rays[i].display(this.display);
    }
    
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
  }
  display(canvas) {
    canvas.stroke(0);
    canvas.strokeWeight(1);
    canvas.push();
    canvas.stroke('white');
    canvas.fill('yellow');
    this.updateCoords();
    if (this.selected){
      canvas.fill(200,200,200);
    }
    canvas.beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
      let pointer = this.vertices[i];
      canvas.vertex(pointer.x, pointer.y);
    }
    canvas.endShape(CLOSE);
    canvas.pop();
    this.update();
  }
}