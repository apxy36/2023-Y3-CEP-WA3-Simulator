



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

function styleinput(input, x,y, main, label, w = "7"){
    let maininput = createDiv();
    //bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32
      maininput.class("mb-4 h-10 flex ");
      maininput.parent(main);
      maininput.position( x,y);
      let labelinput = createDiv(label);
      labelinput.parent(maininput);
      labelinput.class(" w-" +w+ " h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600");
      //let x = createInput(params[i+1][1].x);
      input.style("width", "4em");
      // x.style("margin-left", "1em");
      // x.style("margin-right", "1em");
      // x.style("margin-bottom", "0.5em");
      // x.style("border-radius", "0.5em");
      input.parent(maininput);
      input.class("h-10 rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");


    // input.style("width", "4em");
    // input.style("margin-left", "1em");
    // input.style("margin-right", "1em");
    // input.style("margin-bottom", "0.5em");
    // input.class("block w-full p-4 h-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
    // input.position(x,y);
    // input.parent(settings);
}
function styleinput2(input, x,y, main, label, w = "7"){
    let maininput = createDiv();
    //bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32
      maininput.class("mb-4 h-10 flex ");
      //maininput.parent(main);
      maininput.position( x,y);
      let labelinput = createDiv(label);
      labelinput.parent(maininput);
      labelinput.class(" w-" +w+ " h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600");
      //let x = createInput(params[i+1][1].x);
      input.style("width", "4em");
      // x.style("margin-left", "1em");
      // x.style("margin-right", "1em");
      // x.style("margin-bottom", "0.5em");
      // x.style("border-radius", "0.5em");
      input.parent(maininput);
      input.class("h-10 rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");


    // input.style("width", "4em");
    // input.style("margin-left", "1em");
    // input.style("margin-right", "1em");
    // input.style("margin-bottom", "0.5em");
    // input.class("block w-full p-4 h-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
    // input.position(x,y);
    // input.parent(settings);
}

function styleTable(input, x,y, body, label, w = "7"){
  let maininput = createElement("td");
  maininput.class("whitespace-nowrap text-left  px-6 py-2 font-medium");
  maininput.parent(body);
  let subinput = createElement("div");
  subinput.class("mb-4 h-10 flex left-0 sticky w-35");
  subinput.parent(maininput);
  let labelinput = createDiv(label);
  labelinput.parent(subinput);
  labelinput.class(" w-" +w+ " h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600");
  input.parent(subinput);
  input.class("h-10 rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
}

function setting(params, parent){ //convert everything in terms of displayheight and displaywidth
  let settings = createDiv();
  //settings.parent(parent);
  //settings.position(0,0);
   settings.position(windowWidth * 0.8, 0);
  settings.style("height",  '80vh');
  settings.style("width", '20vw');
  settings.style("background: linear-gradient(to bottom, #183D54, #052F58);");
  //settings.class("border rounded-sm transform scale-0 absolute transition duration-150 ease-in-out origin-top min-w-32")
  if (params.length > 0 && selected != -1){
for (let i = 0; i < params.length - 1; i++){
    let label = createSpan(params[i+1][0]);
    // label.style("color", "black");
    // label.style("font-size", "1.5em");
    // label.style("font-family", "monospace");
    // label.style("display", "block");
    // label.style("padding-top", "1em");
    // label.style("padding-left", "1em");
    // label.style("padding-bottom", "0.5em");
    // label.style("padding-right", "0.5em");
    label.class("block mb-2 text-sm font-medium text-gray-900 dark:text-white");
    label.parent(settings);
    label.position( 10, 50 + 80 * (i));
    label.innerHTML = params[i+1][0];
    if (params[i+1][0] == "Position"){
      // let mainx = createDiv();
      // mainx.class("mb-4 h-10 flex ");
      // mainx.parent(settings);
      // mainx.position( displayWidth / 500, 300 + 80 * (i) + 50);
      // let labelx = createDiv('x:');
      // labelx.parent(mainx);
      // labelx.class(" w-7 h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600");
      let x = createInput(params[i+1][1].x);
      x.style("width", "4em");
      // x.style("margin-left", "1em");
      // x.style("margin-right", "1em");
      // x.style("margin-bottom", "0.5em");
      // x.style("border-radius", "0.5em");
      styleinput(x, displayWidth / 200, 30 + 80 * (i) + 50, settings, "x:");
      //x.class("h-10 rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
      //x.parent(mainx);
      // x.style("border", "none");
      // x.style("background", "white");
      // x.style("padding-left", "0.5em");
      // x.style("padding-right", "0.5em");
      // x.style("padding-top", "0.5em");
      // x.style("padding-bottom", "0.5em");
      //styleinput(x, 0,0, mainx);
      // x.position( displayWidth / 500, 300 + 80 * (i) + 50);
      // x.parent(settings);

      let y = createInput(params[i+1][1].y);
      y.style("width", "4em");
      // y.style("margin-left", "1em");
      // y.style("margin-right", "1em");
      // y.style("margin-bottom", "0.5em");
      // y.class("block w-full p-4 h-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500")
      // // y.style("border-radius", "0.5em");
      // // y.style("border", "none");
      // // y.style("background", "white");
      // // y.style("padding-left", "0.5em");
      // // y.style("padding-right", "0.5em");
      // // y.style("padding-top", "0.5em");
      // // y.style("padding-bottom", "0.5em");
      // y.position( displayWidth / 20 , 300 + 80 * (i) + 50);
      styleinput(y, displayWidth / 15 , 30 + 80 * (i) + 50, settings, "y:");
      //y.parent(settings);
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
    } else if (params[i+1][0] == "Angle"){
      let angle = createSlider(0,360,params[i+1][1],1);
      //styleinput(angle, windowWidth / 200, 300 + 70 * (i) + 50, settings);
      angle.position(windowWidth / 100, 30 + 80 * (i) + 65);
      //angle.class("block mb-2 text-sm font-medium text-gray-900 dark:text-white");
      angle.parent(settings);
      angle.class("w-4/5 h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500");
      //angle.class("range pr-6 accent-red-500");
      angle.input(function () {
        console.log(angle.value())
        totalarr[selected].setRotation(angle.value());
        totalarr[selected].coords.theta = angle.value();
        
        updateComponents();
      });
  } else if (params[i+1][0] == "Width"){
    let width = createInput(params[i+1][1]);
    width.style("width", "4em");
    styleinput(width, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Width:", "20");
    width.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), width.value())) || isCharNumber(findDifference( width.value(), str(params[i+1][1])))){
        if (width.value() == "" || int(width.value()) == 0){
          totalarr[selected].coords.magnitude = 5;
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].coords.magnitude = int(width.value()) / 2;
          //console.log(totalarr[selected].coords.magnitude)
        }
        updateComponents();
      } else {
        width.value(params[i+1][1]);
      }
      });
  } else if (params[i+1][0] == "Thickness"){
    //console.log(params[i+1][1])
    let thickness = createInput(params[i+1][1]);
    thickness.style("width", "4em");
    styleinput(thickness, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Thickness:", "20");
    thickness.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), thickness.value())) || isCharNumber(findDifference( thickness.value(), str(params[i+1][1])))){
        if (thickness.value() == "" || int(thickness.value()) == 0){
          totalarr[selected].thickness = 5;
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].thickness = int(thickness.value()) / 2;
          //console.log(totalarr[selected].coords.magnitude)
        }
        updateComponents();
      } else {
        thickness.value(params[i+1][1]);
      }
      });
  } else if (params[i+1][0] == "Refractive Coefficients"){
    let rcoeffs = createElement("table");
rcoeffs.class("table-fixed space-y-3");

rcoeffs.position(windowWidth / 200, 30 + 80 * (i) + 50);
rcoeffs.class("inline-block overflow-x-auto flex flex-col overflow-hidden bg-gray-500 h-1/3 w-full text-center text-sm font-light rounded-lg");

let thead = createElement("tr");
thead.parent(rcoeffs);
thead.class("font-medium min-w-full bg-gray-600 px-8 py-4 bg-gray-700 text-neutral-50 border-b font-bold text-sm");

let b = createElement("th");
b.parent(thead);
b.class("w-1/2 px-4 py-2"); // Set the width of the column and add padding

let bval = createSpan("B Coefficients");
bval.class("text-white"); // Add text color
b.child(bval);

let c = createElement("th");
c.parent(thead);
c.class("w-1/2 px-4 py-2"); // Set the width of the column and add padding

let cval = createSpan("C Coefficients");
cval.class("text-white"); // Add text color
c.child(cval);

    // let rcoeffs = createElement("table");
    // rcoeffs.class("table-fixed space-y-3");
    
    // rcoeffs.position(windowWidth / 200, 30 + 80 * (i) + 50);
    // rcoeffs.class("inline-block overflow-x-auto flex flex-col overflow-hidden bg-gray-500 h-1/3 w-full text-center text-sm font-light rounded-lg");

    // let thead = createElement("tr");
    // thead.parent(rcoeffs);
    // thead.class("font-medium min-w-full bg-gray-600 px-8 py-4 bg-gray-700 text-neutral-50 border-b font-bold text-sm ");
    
    // let b = createElement("th");
    // b.parent(thead);
    // //b.class("px-8 py-4 bg-gray-700 text-neutral-50 border-b border-gray-200 font-bold text-sm text-left");
    // //b.class(" w-1/2 text-sm");
    // b.attribute("scope", "col");
    // b.class("w-1/2")
    
    // let bval = createSpan("B Coefficients");
    // //bval.class()
    // b.child(bval);
    // b.value("B Coefficients");
    // // let b1input = createInput(params[i+1][1][0][0]); //b1 coefficient
    // // b1input.style("width", "4em");
    
    // // styleinput2(b1input, windowWidth / 200, 0,0, b1, "B1:", "20");

    // // b1.child(b1input);
    // //thead.child(b);


    // let c = createElement("th");
    // c.class("left-2/3 text-sm");
    // c.parent(thead);
    
    // //c.class("px-8 py-4 bg-gray-700 text-neutral-50 border-b border-gray-200 font-bold text-sm text-left");
    // c.attribute("scope", "col");
    
    // let cval = createSpan("C Coefficients");
    // cval.class("l-2/3 text-sm");
    // c.child(cval);
    // let b2input = createInput(params[i+1][1][0][0]); //c1 coefficient
    // b2input.style("width", "4em");
    // b2.child(b2input);
    // styleinput2(b2input, windowWidth / 200, 0,0, b2, "B2:", "20");
    //thead.child(c);
    let tbody = createElement("tbody");
    tbody.parent(rcoeffs);
    
    let tr1 = createElement("tr");
    tr1.parent(tbody);
    //tr.class("text-left")
    let b1input = createInput(params[i+1][1][0][0]); //b1 coefficient
    b1input.style("width", "4em");
    styleTable(b1input, windowWidth / 200, 0, tr1, "B1:", "7");
    // let mainb1 = createElement("td");
    // mainb1.class("whitespace-nowrap text-left  px-6 py-4 font-medium");
    // mainb1.parent(tr);
    // let subb1 = createElement("div");
    // subb1.class("mb-4 h-10 flex left-0 sticky w-35");
    // subb1.parent(mainb1);
    // let labelb1 = createDiv("B1:");
    // labelb1.parent(subb1);
    // labelb1.class(" w-7 h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600");
    // b1input.parent(subb1);
    // b1input.class("h-10 rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
    // //styleinput(b1input, windowWidth / 200, 0,0, b1, "B1:", "10");
    let c1input = createInput(params[i+1][1][1][0]); //c1 coefficient
    c1input.style("width", "6em");
    styleTable(c1input, windowWidth / 200, 0, tr1, "C1:", "7");

    let tr2 = createElement("tr");
    tr2.parent(tbody);
    tr2.class("whitespace-nowrap px-6 py-4")
    let b2input = createInput(params[i+1][1][0][1]); //b2 coefficient
    b2input.style("width", "6em");
    styleTable(b2input, windowWidth / 200, 0, tr2, "B2:", "7");

    let c2input = createInput(params[i+1][1][1][1]); //c2 coefficient
    c2input.style("width", "6em");
    styleTable(c2input, windowWidth / 200, 0, tr2, "C2:", "7");

    let tr3 = createElement("tr");
    tr3.parent(tbody);
    let b3input = createInput(params[i+1][1][0][2]); //b3 coefficient
    b3input.style("width", "6em");
    styleTable(b3input, windowWidth / 200, 0, tr3, "B3:", "7");
    let c3input = createInput(params[i+1][1][1][2]); //c3 coefficient
    c3input.style("width", "6em");
    styleTable(c3input, windowWidth / 200, 0, tr3, "C3:", "7");

    //styleTable(b1input, windowWidth / 200, 0, tbody, "B1:", "10");
    //console.log(params[i+1][1].length);
    console.log(params[i+1][1])
    // for (let j = 0; j < 3; j++){ //repeat 3 times
      
    //   let tr = createElement("tr");
    //   tr.parent(tbody);
    //   let b = createElement("td");
    //   tr.child(b);
    //   //console.log(params[i+1][1][j][0])
    //   let bval = createInput(params[i+1][1][0][j]);
    //   bval.style("width", "4em");
    //   console.log("B" + (j +1)+ ":");
    //   styleinput2(bval, windowWidth / 200, 0,0, b, "B" + (j +1)+ ":", "20");
    //   b.child(bval);
    //   let c = createElement("td");
    //   let cval = createInput(params[i+1][1][1][j]);
    //   cval.style("width", "4em");
    //   styleinput2(cval, windowWidth / 15, 0,0, c, "C" + (j+1) + ":", "20");
    //   c.child(cval);

      

    // }
    
    //rcoeffs.child(thead)
    rcoeffs.parent(settings);
  }
  }
}
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);


  sandbox = createGraphics(windowWidth * 0.8, windowHeight * 0.85);
  setting(editables, document.getElementById("parameters-panel"));
  // settings.position(windowWidth * 0.8, 0);
  // settings.style("height",  '100vh');
  // settings.style("width", '20vw');
  // settings.style("background: linear-gradient(to bottom, #183D54, #052F58);");
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
//     parametersPanel.innerHTML = `

//      <tbody class="text-lg">
//             <tr>
//               <td>
//                 <input
//                   class="input input-bordered input-primary px"
//                   style="width: 5.5em"
//                   oninput="UIEvents.bodyDataInputEditing(this)"
//                   type="number"
//                   step="1"
//                   min="0"
//                   data-bodyindex="-1"
//                 />
//               </td>
//               <td>
//                 <input
//                   class="input input-bordered input-primary py"
//                   style="width: 5.5em"
//                   oninput="UIEvents.bodyDataInputEditing(this)"
//                   type="number"
//                   step="1"
//                   min="0"
//                   data-bodyindex="-1"
//                 />
//               </td>
//             </tr>
//           </tbody>

// <div class="relative mb-4 flex flex-wrap items-stretch bg-gray-600">
//   <div
//     class="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 pb-[0.27rem] pt-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
//   </div>
//   <input
//     type="text"
//     class="relative m-0 block Width-[1px] min-Width-0 flex-auto rounded-r border border-solid border-neutral-300 bg-gray-600 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//     aria-label="Text input with checkbox" />
// </div>

// <div class="relative flex flex-wrap items-stretch">
//   <div
//     class="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
    
//   </div>
//   <input
//     type="text"
//     class="relative m-0 block Width-[1px] min-Width-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//     aria-label="Text input with radio button" />
// </div>
//     `;
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
    //parametersPanel.innerHTML = "";
    //parametersPanel.classList.add("hidden");
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
    } else if (obj.constructor.name == "Refractor"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Thickness", obj.thickness], ["Refractive Coefficients", obj.rcoeffs]];
    } else if (obj.type == "CLens" || obj.type == "DLens"){
      return [obj, ["Position", obj.pos], ["Angle", obj.coords.theta], ["Width", obj.coords.magnitude * 2], ["Focal Length", obj.flength]];
    } else if (obj.constructor.name == "Prism"){
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


