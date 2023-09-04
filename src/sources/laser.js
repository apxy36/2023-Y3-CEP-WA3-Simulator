class Laser extends Reflector{
  constructor(pos, w, angle, ID, number, display){ //numerical id
    super(pos, w, angle, ID);
    this.coords = new Polar(w / 2, angle);
    this.normallen = w / 5;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "Laser";
    this.componentID = ID;
    this.thickness = w * 2;
    this.vertices = [this.start, this.end];
    this.rays = [];
    this.maxID = 'j';
    this.number = number; //number of diff wavelengths
    this.displayer = display;
    
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
    this.rays = [];
    this.maxID = 0;
    this.number = min(this.number, 15);
    for (let i = 0; i < this.number; i ++){
      
      this.maxID += 'r';
      let newwavelength = 380 + (i / this.number) * (750-380);
      this.rays.push(new Ray(this.pos, this.coords.theta - 90, 250, this.componentID + (this.maxID ), newwavelength, this.displayer));
      this.rays[this.rays.length - 1].generate(componentarr);
      //this.rays[this.rays.length - 1].display();
      
    }
    //console.log(this.rays)
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
    //console.log(this.vertices);
  }
  display(canvas) {
    canvas.stroke(0);
    this.updateCoords();
    canvas.strokeWeight(1);
    canvas.push();
    canvas.fill('gray');
    canvas.stroke('white');
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