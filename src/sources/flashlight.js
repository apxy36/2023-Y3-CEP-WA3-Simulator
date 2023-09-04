class Flashlight extends Reflector{
  constructor(pos, w, raydensity, angle, ID, wavelength, display){
    super(pos,w,angle, ID);
    this.pos = pos;
    
    this.width = w; 
    this.coords = new Polar(w / 2, angle);
    this.normallen = w / 5;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "Flashlight";
    this.componentID = ID;
    this.wavelength = wavelength;
    this.thickness = w * 2;
    this.vertices = [this.start, this.end];
    this.raydensity = raydensity;
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
    this.raydensity = min(this.raydensity, 5);
    let rayspacedist = 10 / this.raydensity;
    this.maxID = 0;
    this.rays = [];
    let idoffset = 1;
    for (let i = 0; i < 30; i += rayspacedist){
      
      //let offset = new Polar(i, this.coords.theta);
      this.maxID += 'r';
      this.rays.push(new Ray(this.pos, this.coords.theta - 90 + i, 250, this.componentID + (this.maxID ), this.wavelength, this.displayer));
      this.rays[this.rays.length - 1].generate(componentarr);
      //this.rays[this.rays.length - 1].display();
      
    }
    for (let i = 0; i < 30; i += rayspacedist){
      //let offset = new Polar(i, this.coords.theta);
      this.maxID += 'r';
      this.rays.push(new Ray(this.pos, this.coords.theta - 90 - i, 250, this.componentID + (this.maxID ), this.wavelength, this.displayer));
      this.rays[this.rays.length - 1].generate(componentarr);
      //this.rays[this.rays.length - 1].display();
      
     }
    for (let i = 0; i < this.rays.length; i++){

      this.rays[i].display(this.displayer);
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
    //line(this.start.x, this.start.y, this.end.x, this.end.y)
  }
}





