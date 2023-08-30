class Polar {
  constructor(r, theta) {
    this.magnitude = r;
    this.theta = theta;
  }
  convertCartesian(coeff = 1) {
    let x = this.magnitude * cos(this.theta) * coeff;
    let y = this.magnitude * sin(this.theta) * coeff;
    return createVector(x, y);
  }
}



let ray1;
let mirror1;
let mainray;
let componentarr = [];
let sourcearr = [];
let totalarr = [];
let selected = -1;
let sandbox;


function setting(){
  
}
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  sandbox = createGraphics(1500,1500);
  //frameRate(1)
  //ray1 = new RayComponent(createVector(50,100), 20, 250, 0);
  componentarr.push(
    new Refractor(createVector(400, 200), 100, 100, 0, 30, 1.8, [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]], sandbox)
  );
  componentarr.push(new Reflector(createVector(100, 300), 100, 90, 1, sandbox));
  //componentarr.push(new Refractor(createVector(300, 200), 200, 90, 2, 30, 1.5, [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]]));
  componentarr.push(new Prism(createVector(300,200),50,0, 3, [createVector(0,0), createVector(100,0), createVector(40, -50)], 2, [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]], sandbox));
  //componentarr.push(new DiffractionGrating(createVector(150,150),50 , 0, 3,2.2)); //micrometers (double slit)
  totalarr = componentarr;
  mainray = new Ray(createVector(150, 100), 55, 250, "a", 450, sandbox);
  totalarr.push(new Laser( createVector(100,100),30, 60,  'alpha', 10, sandbox));
  totalarr.push(new NormalLight(createVector(200,200), 40, 0, 'beta', 600, sandbox))
}

function draw() {
  sandbox.background(220);
  
  
  mainray.generate(componentarr);
  for (let i = 0; i < componentarr.length; i++) {
    //console.log(componentarr[i])
    componentarr[i].display(sandbox);
    componentarr[i].displayIntersects(sandbox);
  }
  mainray.display(sandbox);
  for (let i = 0; i < totalarr.length; i++){
    if(totalarr[i].type == "Laser" || totalarr[i].type == "Flashlight" || totalarr[i].type == "NormalLight"){
      totalarr[i].generateRays(componentarr);
      totalarr[i].display(sandbox);
    }
  }

  image(sandbox, 0,0);
}

function mousePressed(){
  
  if (selected == -1){ //nothing selected
    let index = selectindex(totalarr, createVector(mouseX, mouseY));
  
  //console.log(2)
  if(index != -1){
    console.log(totalarr[index])
    totalarr[index].select();
    //totalarr[index].clicked();
    
  } else {
    //index = selectindex([light1], createVector(mouseX, mouseY));
    
  } 
    selected = index;
  } else { //smth selected
    let output=-1;
    if (totalarr[selected].vertices.length == 3){
      output = totalarr[selected].selectVertex();
    }
    if (output != -1){
      totalarr[selected].clickedVertex();
      
      //shiftVertex(output.x, output.y);
    } else {
      let index = selectindex([totalarr[selected]], createVector(mouseX, mouseY))
    if(index == -1){
      totalarr[selected].deselect();
      selected = -1;
    } else {
      totalarr[selected].clicked();//drag
    }
    }
    
  }
  
  
}
function mouseReleased(){
  //console.log(selected)
  if (selected != -1){
    if (totalarr[selected].dragged){
    totalarr[selected].released();
  } else if (totalarr[selected].vertices.length == 3){
    totalarr[selected].pointadj[0] = false;
  }
  }
  
}


