



let ray1;
let mirror1;
let mainray;
let componentarr = [];
let sourcearr = [];
let totalarr = [];
let selected = -1;
let sandbox;
let editables = [];



let UIEvent = new UIEvents();


function isValid(charC, text) {
    if (charC == 46) {
        if (text.indexOf('.') === -1) {
            return true;
        } else {
            return false;
        }
    } else {
        if (charC > 31 && (charC < 48 || charC > 57))
            return false;
    }
    return true;
}
function findDifference(s, t) {

  if(s === '') return t;

  
  
  
  // (if the additional letter exists)
  // cache them, count values, different values of the same letter would give the answer.

  const obj_S = {};
  const obj_T = {};

  for(let i = 0; i < s.length; i++) {
    if(!obj_S[s[i]]) {
      obj_S[s[i]] = 1;
    }else {
      obj_S[s[i]]++;
    }
  }
  
  for(let i = 0; i < t.length; i++) {
    if(!obj_T[t[i]]) {
      obj_T[t[i]] = 1;
    }else {
      obj_T[t[i]]++;
    }
  }

  for(const key in obj_T) {
    if(obj_T[key] !== obj_S[key]) {
      console.log(key, s,t);
      return key
    }
  }

}

function isCharNumber(c) {
  return c >= '0' && c <= '9';
}
function setting(params){ //convert everything in terms of displayheight and displaywidth
  let settings = createDiv();
  settings.position(windowWidth * 0.8, 0);
  settings.style("height",  '100vh');
  settings.style("width", '20vw');
  settings.style("background: linear-gradient(to bottom, #183D54, #052F58);");
  if (params.length > 0 && selected != -1){
for (let i = 0; i < params.length - 1; i++){
    let label = createSpan(params[i+1][0]);
    label.style("color", "black");
    label.style("font-size", "1.5em");
    label.style("font-family", "monospace");
    label.style("display", "block");
    label.style("padding-top", "1em");
    label.style("padding-left", "1em");
    label.style("padding-bottom", "0.5em");
    label.style("padding-right", "0.5em");
    label.parent(settings);
    label.position( 10, 300 + 70 * (i));
    label.innerHTML = params[i+1][0];
    if (params[i+1][0] == "Position"){
      let x = createInput(params[i+1][1].x);
      x.style("width", "4em");
      x.style("margin-left", "1em");
      x.style("margin-right", "1em");
      x.style("margin-bottom", "0.5em");
      x.style("border-radius", "0.5em");
      x.style("border", "none");
      x.style("background", "white");
      x.style("padding-left", "0.5em");
      x.style("padding-right", "0.5em");
      x.style("padding-top", "0.5em");
      x.style("padding-bottom", "0.5em");
      x.position( displayWidth / 500, 300 + 70 * (i) + 50);
      //x.input(changeX);
      x.parent(settings);
      let y = createInput(params[i+1][1].y);
      y.style("width", "4em");
      y.style("margin-left", "1em");
      y.style("margin-right", "1em");
      y.style("margin-bottom", "0.5em");
      y.style("border-radius", "0.5em");
      y.style("border", "none");
      y.style("background", "white");
      y.style("padding-left", "0.5em");
      y.style("padding-right", "0.5em");
      y.style("padding-top", "0.5em");
      y.style("padding-bottom", "0.5em");
      y.position( displayWidth / 20 , 300 + 70 * (i) + 50);
      y.parent(settings);
      x.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1].x), x.value())) || isCharNumber(findDifference( x.value(), str(params[i+1][1].x)))){
          if (x.value() == ""){
          totalarr[selected].setPos(0, int(y.value()));
        } else {
          totalarr[selected].setPos(int(x.value()), int(y.value()));
        }
        updateComponents();
        } else {
          x.value(params[i+1][1].x);
        }
        
      });
      y.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1].y), y.value())) || isCharNumber(findDifference( y.value(), str(params[i+1][1].y)))){
        if (y.value() == ""){
          totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].setPos(int(x.value()), int(y.value()));
        }
        updateComponents();
      } else {
        y.value(params[i+1][1].y);
      }
      });
      x.attribute("data-bodyindex", selected);
      y.attribute("data-bodyindex", selected);
    } else if (params[i+1][0] == "angle"){
      let angle = createInput(params[i+1][1]);
      angle.style("width", "5em");

  }
  }
}
}
function xx(){
  console.log(333)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  sandbox = createGraphics(windowWidth * 0.8, windowHeight * 0.85);
  setting(editables);
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
function updateComponents(){
  for (let i = 0; i < componentarr.length; i++) {
      //console.log(componentarr[i])
      componentarr[i].display(sandbox);
      componentarr[i].displayIntersects(sandbox);
    }

    for (let i = 0; i < totalarr.length; i++){
      if(totalarr[i].type == "Laser" || totalarr[i].type == "Flashlight" || totalarr[i].type == "NormalLight"){
        totalarr[i].generateRays(componentarr);
        totalarr[i].display(sandbox);
      }
    }
}
function draw() {
  sandbox.background(20);
  //setting();
  mainray.generate(componentarr);
  mainray.display(sandbox);
  updateComponents();
  if (selected != -1){
    editables = findEditableData(totalarr[selected]);
    //console.log(editables)
    if (inputbool){
    setting(editables);
    inputbool = false;
    }
    
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
    class="relative m-0 block Width-[1px] min-Width-0 flex-auto rounded-r border border-solid border-neutral-300 bg-gray-600 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
    aria-label="Text input with checkbox" />
</div>

<div class="relative flex flex-wrap items-stretch">
  <div
    class="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
    
  </div>
  <input
    type="text"
    class="relative m-0 block Width-[1px] min-Width-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
    aria-label="Text input with radio button" />
</div>
    `;
    parametersPanel.classList.remove("hidden");
  }
  image(sandbox, 0,0);
}
var inputbool;
function mousePressed(){
  
  if (selected == -1){ //nothing selected
    let index = selectindex(totalarr, createVector(mouseX, mouseY));
    
  //console.log(2)
  if(index != -1){
    console.log(totalarr[index])
    totalarr[index].select();
    //totalarr[index].clicked();
    inputbool = true;
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
      setting(editables);
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
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2]]; //position, rotation, width
    } else if (obj.type == "refractor"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Refractive Coefficients", obj.rcoeffs]];
    } else if (obj.type == "CLens" || obj.type == "DLens"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Focal Length", obj.flength]];
    } else if (obj.type == "Prism"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Refractive Coefficients", obj.rcoeffs]];
    } else if (obj.type == "DiffractionGrating"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Maximum Order", obj.maxorder], ["Slit Separation Distance", obj.slitdist]];
    } else if (obj.type == "NormalLight"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Wavelength", obj.wavelength]];
    } else if (obj.type == "Laser"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Number of different wavelengths", obj.number]];
    } else if (obj.type == "Flashlight"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Wavelength", obj.wavelength], ["Ray Density", obj.raydensity]];
    } else if (obj.type == "Sun"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Wavelength", obj.wavelength], ["Ray Density", obj.raydensity]];
    }
}


