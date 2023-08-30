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

     <tbody class="text-lg">
            <tr>
              <td>
                <input
                  class="input input-bordered input-primary px"
                  style="width: 5.5em"
                  oninput="UIEvents.bodyDataInputEditing(this)"
                  type="number"
                  step="1"
                  min="0"
                  data-bodyindex="-1"
                />
              </td>
              <td>
                <input
                  class="input input-bordered input-primary py"
                  style="width: 5.5em"
                  oninput="UIEvents.bodyDataInputEditing(this)"
                  type="number"
                  step="1"
                  min="0"
                  data-bodyindex="-1"
                />
              </td>
            </tr>
          </tbody>

<div class="relative mb-4 flex flex-wrap items-stretch bg-gray-600">
  <div
    class="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 pb-[0.27rem] pt-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
  </div>
  <input
    type="text"
    class="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-gray-600 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
    aria-label="Text input with checkbox" />
</div>

<div class="relative flex flex-wrap items-stretch">
  <div
    class="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
    
  </div>
  <input
    type="text"
    class="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
    aria-label="Text input with radio button" />
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
      if (mouseX > 0 && mouseX < windowWidth * 0.8 && mouseY > 0 && mouseY < windowHeight * 0.85){
        totalarr[selected].deselect();
      selected = -1;
      const parametersPanel = document.getElementById("parameters-panel");
    parametersPanel.innerHTML = "";
    parametersPanel.classList.add("hidden");
      }
      
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


