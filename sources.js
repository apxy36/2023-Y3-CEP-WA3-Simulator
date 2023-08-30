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
    let rayspacedist = 10 / this.raydensity;
    this.maxID = 0;
    this.rays = [];
    let idoffset = 1;
    for (let i = 0; i < 70; i += rayspacedist){
      
      //let offset = new Polar(i, this.coords.theta);
      this.maxID += 'r';
      this.rays.push(new Ray(this.pos, this.coords.theta - 90 + i, 250, this.componentID + (this.maxID ), this.wavelength, this.displayer));
      this.rays[this.rays.length - 1].generate(componentarr);
      //this.rays[this.rays.length - 1].display();
      
    }
    for (let i = 0; i < 70; i += rayspacedist){
      //let offset = new Polar(i, this.coords.theta);
      this.maxID += 'r';
      this.rays.push(new Ray(this.pos, this.coords.theta - 90 - i, 250, this.componentID + (this.maxID ), this.wavelength, this.displayer));
      this.rays[this.rays.length - 1].generate(componentarr);
      //this.rays[this.rays.length - 1].display();
      
     }
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
    this.update();
    //line(this.start.x, this.start.y, this.end.x, this.end.y)
  }
}

class Sun{
  constructor( w, raydensity, angle, ID, wavelength, display){
    this.pos = new Polar (width * 2 , angle-180); 
    this.pos = p5.Vector.add(this.pos.convertCartesian(), createVector(width/2, height/2)); //out of canvas, rotating ard point
    this.width = w; 
    this.coords = new Polar(w / 2, angle); //width of the ray 
    this.normallen = w / 5;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "Sun";
    this.componentID = ID;
    this.wavelength = wavelength;
    this.vertices = [this.start, this.end];
    this.raydensity = raydensity;
    this.rays = [];
    this.maxID = 0;
    this.displayer = display;
  }
    generateRays(componentarr){
      this.maxID = 0;
      this.updateCoords();
    let rayspacedist = 10 / this.raydensity;
    for (let i = 0; i < this.width; i += rayspacedist){
      let offset = new Polar(i, this.coords.theta + 90);
      this.rays.push(new Ray(p5.Vector.add(offset.convertCartesian(), this.start), this.coords.theta , 250, this.componentID + (this.maxID + 1), 450, this.displayer));
      this.rays[this.rays.length - 1].generate(componentarr);
      this.rays[this.rays.length - 1].display(this.displayer);
      this.maxID += 1;
    }
  }
  updateCoords(){
        this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
  }
}



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
    for (let i = 0; i < this.number; i ++){
      
      this.maxID += 'r';
      let newwavelength = 380 + (i / this.number) * (800-380);
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
  }
  display(canvas) {
    canvas.stroke(0);
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
    this.update();
  }
}

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
    this.thickness = w * 2;
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
    this.update();
  }
}