class Prism extends Reflector {
  constructor(pos, w, angle, ID, pts, rindex, rcoeffs, display) {
    super(pos, w, angle, ID, display);
    this.coords = new Polar(w / 2, angle);
    
    this.vertices = pts; //point array, with vector objects
    this.normallen = w / 4;
    this.type = "refractor";
    this.componentID = ID;
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
    this.displayer = display;

    this.refractiveindex = rindex;
    this.rcoeffs = rcoeffs; // B:[] C:[] refractive coeffs for sellmeier eqn
    
    //shifting it to pos
    let vector_x = this.pos.x;
    let vector_y = this.pos.y

    for (let index = 0; index < this.vertices.length; index++) {
      let vertex = this.vertices[index];

      vertex.x += vector_x;
      vertex.y += vector_y;
    }
    //draggable functionality
    this.dragged = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.voffsetX = 0;
    this.voffsetY = 0;
    this.minimumWidth = 10;
    this.minimumHeight = 10;
    this.selected = false;
    this.pointadj = [false, -1];


  
  }
  
  display(canvas){
    canvas.stroke(0);
    canvas.strokeWeight(1);
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
  
  
  update(){
    //dragging functionality
    if (this.dragged){
      this.setPos(mouseX + this.offsetX, mouseY + this.offsetY);
    } else if (this.pointadj[0]){ //adjusting pts
      let vertexindex = this.pointadj[1];//index
      console.log(this.voffsetX)
      this.shiftVertex(mouseX - 64, mouseY, vertexindex);
    }
    
    //visuals
    if (this.selected){
      this.displaySelect();
    }
    
  }
  
  ricalc(wavelength){//three term approximation
    wavelength = wavelength / 1000; //convert to micrometers
    //this.rcoeffs = [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]];
    return ((1+(this.rcoeffs[0][0]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][0]) + (this.rcoeffs[0][1]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][1]) + (this.rcoeffs[0][2]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][2])) / wavelength
           )**0.5
  }
  
  setPosPlus(x,y){

    for (let index = 0; index < this.vertices.length; index++) {
      let vertex = this.vertices[index];

      vertex.x += x;
      vertex.y += y;
    }

    this.pos.x += x;
    this.pos.y += y;
  
  }
  shiftVertex(x,y, index){ //x,y initial vertex, offset as a vector
    
    let vector_x = x - this.vertices[this.pointadj[1]].x;
    let vector_y = y - this.vertices[this.pointadj[1]].y;


      let vertex = this.vertices[index];

      this.vertices[index].x += vector_x;
      this.vertices[index].y += vector_y;
    
  }
  
  selectVertex(){
    for (let i = 0; i < this.vertices.length; i++){
      let selectedvertex = this.vertices[i];
      if (collidePointCircle(mouseX - 64, mouseY, selectedvertex.x, selectedvertex.y, 20)){
        
        this.pointadj[1]=i;
        return i;
      }
    } 
    return -1;
  }
  
  clickedVertex(){
    this.pointadj[0] = true;
    this.voffsetX = this.vertices[this.pointadj[1]].x - mouseX;
    this.voffsetY = this.vertices[this.pointadj[1]].y - mouseY;
  }
  
  displaySelect(){
    this.displayer.fill(100,100,100,100);
    //avg -> middle of shape
    let centre = findCentre(this.vertices);
    this.displayer.stroke(100)
    this.displayer.circle(centre.x, centre.y, 10);
    for (let i = 0; i < this.vertices.length; i++){
      this.displayer.circle(this.vertices[i].x, this.vertices[i].y, 10);
    }
    this.displayer.stroke(0)
    this.displayer.fill('white');
  }
  
}