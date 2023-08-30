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
let editables;
// Initialization for ES Users
// Initialization for ES Users


function setting(){
  let settings = createDiv();
  settings.position(windowWidth * 0.8, 0);
  settings.style("height",  '100vh');
  settings.style("width", '20vw');
  settings.style("background: linear-gradient(to bottom, #183D54, #052F58);");

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  

  sandbox = createGraphics(windowWidth * 0.8, windowHeight * 0.85);
  //setting();
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
  sandbox.background(20);
  
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
  if (selected != -1){
    editables = findEditableData(totalarr[selected]);
    //console.log(editables)
    const parametersPanel = document.getElementById("parameters-panel");
    parametersPanel.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-lg font-semibold mb-4">Edit Parameters</h2>
        <!-- Example parameter input using Tailwind styling -->
        <label class="block mb-2">
          Parameter 1:
          <input
    type="text"
    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="${totalarr[selected].type}]}"
    placeholder="Example label" 
    value="${editables[1][1]}"
    />
  <label
    for="exampleFormControlInputText"
    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >Text input
  </label>
        </label>
        <!-- Another example parameter input -->
        <label class="block mb-2">
          Parameter 2:
          <input class="border rounded px-2 py-1 w-full" type="text" value="${'yes'}">
        </label>
        <!-- Add more parameter inputs as needed -->
        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">Apply Changes</button>
      </div>
    `;
    parametersPanel.classList.remove("hidden");
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
      const parametersPanel = document.getElementById("parameters-panel");
    parametersPanel.innerHTML = "";
    parametersPanel.classList.add("hidden");
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

function findEditableData(obj){
    if (obj.type == "reflector"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["w", obj.coords.magnitude * 2]]; //position, rotation, width
    } else if (obj.type == "refractor"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["w", obj.coords.magnitude * 2], ["rcoeffs", obj.rcoeffs]];
    } else if (obj.type == "CLens" || obj.type == "DLens"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["w", obj.coords.magnitude * 2], ["focallength", obj.flength]];
    } else if (obj.type == "Prism"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["rcoeffs", obj.rcoeffs]];
    } else if (obj.type == "DiffractionGrating"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["w", obj.coords.magnitude * 2], ["maxorder", obj.maxorder], ["slitdist", obj.slitdist]];
    } else if (obj.type == "NormalLight"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["w", obj.coords.magnitude * 2], ["wavelength", obj.wavelength]];
    } else if (obj.type == "Laser"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["w", obj.coords.magnitude * 2], ["number", obj.number]];
    } else if (obj.type == "Flashlight"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["w", obj.coords.magnitude * 2], ["wavelength", obj.wavelength], ["raydensity", obj.raydensity]];
    } else if (obj.type == "Sun"){
      return [obj, ["pos", obj.pos], ["angle", obj.coords.theta], ["w", obj.coords.magnitude * 2], ["wavelength", obj.wavelength], ["raydensity", obj.raydensity]];
    }
}


