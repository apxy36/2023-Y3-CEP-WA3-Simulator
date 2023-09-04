



let ray1;
let mirror1;
let mainray;
let componentarr = [];
let sourcearr = [];
let totalarr = [];
let selected = -1;
let sandbox;
let editables = [];



//let UIEvent = new UIEvents();


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
      return key
    }
  }

}

function isCharNumber(c) {
  if (c != null){
  return c >= '0' && c <= '9' || c == '.';
  } else {
    return false;
  }
}

function styleinput(input, x,y, main, label, w = "7"){
    let maininput = createDiv();
    //bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32
      maininput.class("mb-4 h-10 flex ");
      maininput.parent(main);
      maininput.position( x,y);
      let labelinput = createDiv(label);
      labelinput.parent(maininput);
      labelinput.class(" w-" +w+ " h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md p-2.5 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600");
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

function styleTable(input, minval,maxval, body, label, w = "45"){
  let maininput = createElement("td");
  maininput.class("whitespace-nowrap text-left w-45 px-6 py-2 font-medium text-neutral-50");
  maininput.parent(body);
  let subinput = createElement("div");
  subinput.class("mb-4 h-10 flex left-0 sticky w-full flex-col space-y-2 p-2");
  subinput.parent(maininput);
  let labelinput = createDiv(label);
  labelinput.parent(subinput);
  labelinput.class(" w-" +w+ " h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600");
  input.parent(subinput);
  input.class("rounded-lg dark:bg-gray-700 accent-blue-500 transparent h-[4px] w-full cursor-pointer appearance-none border-transparent");
  // input.elt.min = str(minval);
  // input.elt.max = str(maxval);
  let sliderlabel = createElement("ul");
  sliderlabel.parent(subinput);
  sliderlabel.class("flex justify-between w-full px-[10px] dark:text-neutral-50 block mb-2 text-sm font-medium text-gray-900");

  let min = createElement("li");
  min.parent(sliderlabel);
  min.class("flex justify-center relative text-sm");
  let minlabel = createSpan(minval);
  minlabel.parent(min);
  minlabel.class("absolute");

  let max = createElement("li");
  max.parent(sliderlabel);
  max.class("flex justify-center relative text-sm");
  let maxlabel = createSpan(maxval);
  maxlabel.parent(max);
  maxlabel.class("absolute");

  
}

function updateRcoeffs(lowerbounds, upperbounds, coeffinputs, params, paramindex){ //lower and upper boudns are nested arrays
  //convert to int, bound, then convert to string
  for (let i = 0; i < 2; i++){ //b and c coefficients
    for(let j = 0; j < 3; j++){ //3 coeffs
      // if (isCharNumber(findDifference( str(params[paramindex][1][i][j]), coeffinputs[3 * i + j].value())) || isCharNumber(findDifference( coeffinputs[3*i + j].value(), str(params[paramindex][1][i][j])))){
        
      //   if (coeffinputs[3 * i + j].value() == ""){
      //     //totalarr[selected].setPos(0, int(y.value()));
      //     //console.log(lowerbounds[i][j])
      //     totalarr[selected].rcoeffs[i][j] = lowerbounds[i][j];
      //     coeffinputs[3 * i + j].value(lowerbounds[i][j]);
      //   } else {
          let val = coeffinputs[3 * i + j].value();
          val = float(coeffinputs[3 * i + j].value());
          //if (val.charAt(val.length - 1) != "."){
            
            if (val > upperbounds[i][j]){
              val = upperbounds[i][j];
            } else if (val < lowerbounds[i][j]){
              val = lowerbounds[i][j];
            }
            totalarr[selected].rcoeffs[i][j] = val;
            //console.log(totalarr[selected].rcoeffs[i][j], totalarr[selected].rcoeffs);
          //}

        //console.log(val, coeffinputs[3 * i + j].value())
        coeffinputs[3 * i + j].value(val);
          

          //totalarr[selected].setPos(int(x.value()), int(y.value()));
          
        }
        //updateComponents();
        // } else {
        //   coeffinputs[3 * i + j].value(params[paramindex][1][i][j]);
        // }
    }
    //let val = (coeffinputs[i].value());
    
  
  
}

function setting(params, selector, parent){ //convert everything in terms of displayheight and displaywidth
  let remover = select("#mainsettings");
  if (remover != null){
    remover.remove();
  }
  let mainsettings = createDiv();
  mainsettings.id("mainsettings");
  let settings = createElement('ul');
  //settings.parent(parent);
  //settings.position(0,0);
  mainsettings.position(windowWidth * 0.8, 0);
  mainsettings.style("height",  '100vh');
  mainsettings.style("width", '18vw');
  settings.parent(mainsettings);
  settings.id("settings");
  //settings.style("background: linear-gradient(to bottom, #183D54, #052F58);");
  mainsettings.class("flex h-auto bg-primary border-2 border-primary");
  
  //settings.class("h-5/6 bg-gray-500 rounded-md left-0 origin-top ease-in-out shadow-xl transform transition-all duration-300 scale-0 m-2 min-w-full max-w-full");
  //settings.class("border rounded-sm transform scale-0 absolute transition duration-150 ease-in-out origin-top min-w-32")
  if (selector){
    settings.class("h-5/6 bg-indigo-600 rounded-md left-0 origin-top ease-in-out shadow-xl transform transition-all duration-300 scale-0 m-1 min-w-full max-w-full");
  } else {
    settings.class("h-5/6 bg-indigo-600 rounded-md left-0 origin-top ease-in-out shadow-xl transform transition-all duration-300 scale-100 m-1 min-w-full max-w-full");
  }
  if (params.length > 0){
    let settingsheader = createSpan(params[0].constructor.name);
  settingsheader.class(" h-5 rounded-md py-3 text-lg top-0 left-0 font-medium text-white text-left");
  settingsheader.parent(settings);
  settingsheader.position(10, windowHeight/150);
    //settings.removeClass("hidden");
    // settings.elt.classList.remove("scale-0");
    // settings.elt.classList.add("scale-100");
for (let i = 0; i < params.length - 1; i++){

    let label = createSpan(params[i+1][0]);
    label.class("block mb-2 text-sm font-medium text-gray-900 dark:text-white");
    label.parent(settings);
    label.position( 10, 50 + 80 * (i));
    label.innerHTML = params[i+1][0];
    if (params[i+1][0] == "Position"){
      let x = createInput(params[i+1][1].x);
      x.style("width", "4em");
      styleinput(x, displayWidth / 200, 30 + 80 * (i) + 50, settings, "x:");
      let y = createInput(params[i+1][1].y);
      y.style("width", "4em");
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
    } else if (params[i+1][0] == "Angle"){
      let mainangle = createElement("div");
      mainangle.class("mb-2 h-10 flex left-0 sticky w-4/5 flex-col space-y-2 p-2");
      
      mainangle.parent(settings);
      let angle = createSlider(0,360,params[i+1][1],1);
      //styleinput(angle, windowWidth / 200, 300 + 70 * (i) + 50, settings);
      mainangle.position(windowWidth / 100,  30 + 80 * (i) + 50);
      //angle.class("block mb-2 text-sm font-medium text-gray-900 dark:text-white");
      angle.parent(mainangle);
      angle.class("w-full h-2  bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500");
      //angle.class("range pr-6 accent-red-500");
      angle.input(function () {
        console.log(angle.value())
        totalarr[selected].setRotation(angle.value());
        totalarr[selected].coords.theta = angle.value();
        
        updateComponents();
      });
      let sliderlabel = createElement("ul");
      sliderlabel.parent(mainangle);
      sliderlabel.class("flex justify-between w-full px-[10px] block mb-2 text-sm font-medium text-gray-900 dark:text-white");

      let min = createElement("li");
      min.parent(sliderlabel);
      min.class("flex justify-center relative");
      let minlabel = createSpan("0");
      minlabel.parent(min);
      minlabel.class("absolute");

      let max = createElement("li");
      max.parent(sliderlabel);
      max.class("flex justify-center relative");
      let maxlabel = createSpan("360");
      maxlabel.parent(max);
      maxlabel.class("absolute");


  } else if (params[i+1][0] == "Width"){
    let width = createInput(params[i+1][1]);
    width.style("width", "4em");
    styleinput(width, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Width:", "20");
    width.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), width.value())) || isCharNumber(findDifference( width.value(), str(params[i+1][1])))){
        if (width.value() == "" || int(width.value()) == 0){
          totalarr[selected].coords.magnitude = 5;
          if (totalarr[selected].constructor.name == "ConvergingLens" || totalarr[selected].constructor.name == "DivergingLens"){
            totalarr[selected].width= 5;
          }
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].coords.magnitude = int(width.value()) / 2;
          //console.log(totalarr[selected].coords.magnitude)
          if (totalarr[selected].constructor.name == "ConvergingLens" || totalarr[selected].constructor.name == "DivergingLens"){
            totalarr[selected].width= int(width.value());
          }
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
    let mainrcoeffs = createElement("div");
    mainrcoeffs.class('flex-col flex w-full');
    mainrcoeffs.position (windowWidth / 200, 30 + 80 * (i) + 50);
    mainrcoeffs.parent(settings);
    let rcoeffs = createElement("table");
    rcoeffs.class("table-fixed space-y-3");

    //rcoeffs.position(windowWidth / 200, 30 + 80 * (i) + 50);
    rcoeffs.class("inline-block overflow-x-auto flex flex-col overflow-hidden bg-indigo-500 h-1/3 w-5/6 text-center font-light rounded-lg");

    let thead = createElement("tr");
    thead.parent(rcoeffs);
    thead.class("flex font-medium min-w-full bg-gray-600 px-2 py-2 h-12 bg-indigo-700 text-neutral-50 border-b font-bold text-sm");

    let b = createElement("th");
    b.parent(thead);
    b.class("w-1/2 px-2 py-1 top-0 text-center left-0"); // Set the width of the column and add padding

    let bval = createSpan("B Coefficients");
    bval.class("text-white"); // Add text color
    b.child(bval);

    let c = createElement("th");
    c.parent(thead);
    c.class("w-1/2 px-2 py-1 left-1/2 top-0 text-center"); // Set the width of the column and add padding

    let cval = createSpan("C Coefficients");
    cval.class("text-white"); // Add text color
    c.child(cval);
    let tbody = createElement("tbody");
    tbody.parent(rcoeffs);
    let lowerbounds = [[0.73961212, 0.151792344, 	0.90046945], [3.00069867 / 1000, 1.00179144 / 100, 	0.63560653 / 100]];
    let upperbounds = [[2.03386592, 0.39875031, 	2.00179144], [12.3980732 / 1000, 8.97479468 / 100, 	13.2765991 / 100]];
    let inputs = [];
    for (let j = 0; j < 3; j++){
      let tr = createElement("tr");
      tr.parent(tbody);
      for (let k = 0; k < 2; k++){
        let input = createSlider(lowerbounds[k][j], upperbounds[k][j], params[i+1][1][k][j], lowerbounds[k][j] / 100);
        if (k == 0){
          styleTable(input, lowerbounds[k][j].toFixed(5), upperbounds[k][j].toFixed(5), tr, "B" + str(j + 1) + ":", "10");
        } else if (k == 1) {
          styleTable(input, lowerbounds[k][j].toFixed(5), upperbounds[k][j].toFixed(5), tr, "C" + str(j + 1) + ":", "10");
        }
        inputs.push(input);
      }

    }
    let ray;
    //finds first ray wavelenngth
    for (let j = 0; j < totalarr.length; j++){
      if (totalarr[j].type == "Laser" || totalarr[j].type == "Flashlight" || totalarr[j].type == "NormalLight" || totalarr[j].type == "Sun"){
        for (let k = 0; k < totalarr[j].rays.length; k++){
        ray = findRayById(totalarr[j].rays[k].raysegments, params[0].intersectIDs[0]);
        //console.log(ray, totalarr[j].rays[k].raysegments, params[0].intersectIDs[0])
        if (ray != null){
          break;
        }
      }
    }
    }
    //let component = findObjectById(params[0].id, componentarr);
    inputs = [inputs[0], inputs[2], inputs[4], inputs[1], inputs[3], inputs[5]]; //b0, b1
    let labelinput;
    if (ray != null){
      labelinput = createDiv('Refractive Index: ' + params[0].ricalc(ray.wavelength).toFixed(3) + ' Wavelength: ' + ray.wavelength);
    } else {
      labelinput = createDiv('Refractive Index: ' + params[0].ricalc(600).toFixed(3) + ' Wavelength: 600'); 
    }
    labelinput.class("dark:font-bold w-5/6 h-16 py-2 text-neutral-50  dark:text-neutral-50 inline-flex text-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600");
      

    for (let j = 0; j < 6; j++){
      inputs[j].input(function () {
        updateRcoeffs(lowerbounds, upperbounds, inputs, params, i+1);
        //labelinput.html('Refractive Index: ' + params[0].ricalc(600).toFixed(3));
        if (ray != null){
          labelinput.html('Refractive Index: ' + params[0].ricalc(ray.wavelength).toFixed(3) + ' Wavelength: ' + ray.wavelength);
        } else {
          labelinput.html('Refractive Index: ' + params[0].ricalc(600).toFixed(3) + ' Wavelength: 600'); 
        }
      });
    }
    
    
    rcoeffs.parent(mainrcoeffs);
    labelinput.parent(mainrcoeffs);
  } else if (params[i+1][0] == "Wavelength"){
    let wavelength = createInput(params[i+1][1]);
    wavelength.style("width", "4em");
    styleinput(wavelength, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Wavelength(nm):", "30");
    wavelength.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), wavelength.value())) || isCharNumber(findDifference( wavelength.value(), str(params[i+1][1])))){
        if (wavelength.value() == "" || int(wavelength.value()) == 0){
          totalarr[selected].wavelength = 400;
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].wavelength = int(wavelength.value());
          //console.log(totalarr[selected].coords.magnitude)
        }
      } else {
        wavelength.value(params[i+1][1]);
      }
      });
  } else if (params[i+1][0] == "Number of different wavelengths"){
    let wavelengthno = createInput(params[i+1][1]);
    styleinput(wavelengthno, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Wavelength Number: (Max 15)", "30");
    wavelengthno.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), wavelengthno.value())) || isCharNumber(findDifference( wavelengthno.value(), str(params[i+1][1])))){
        if (wavelengthno.value() == "" || int(wavelengthno.value()) == 0){
          totalarr[selected].number = 1;
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].number = min(int(wavelengthno.value()),15);
          //console.log(totalarr[selected].coords.magnitude)
        }
      } else {
        wavelengthno.value(min(params[i+1][1], 15));
      }
      });
  } else if (params[i+1][0] == "Maximum Order"){
    let maxorder = createInput(params[i+1][1]);
    styleinput(maxorder, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Maximum Order: (Max 6)", "30");
    maxorder.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), maxorder.value())) || isCharNumber(findDifference( maxorder.value(), str(params[i+1][1])))){
        if (maxorder.value() == "" || int(maxorder.value()) == 0){
          totalarr[selected].maxorder = 1;
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].maxorder = min(int(maxorder.value()),6);
          //console.log(totalarr[selected].coords.magnitude)
        }
      } else {
        maxorder.value(min(params[i+1][1], 6));
      }
      });
  } else if (params[i+1][0] == "Slit Separation Distance"){
    let slitdist = createInput(params[i+1][1]);
    styleinput(slitdist, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Slit separation (Micrometers):", "30");
    slitdist.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), slitdist.value())) || isCharNumber(findDifference(slitdist.value(), str(params[i+1][1])))){
        if (slitdist.value() == "" || int(slitdist.value()) == 0){
          totalarr[selected].slitdist = 1;
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].slitdist = min(int(slitdist.value()),10);
          //console.log(totalarr[selected].coords.magnitude)
        }
      } else {
        slitdist.value(min(params[i+1][1], 6));
      }
      });
  } else if (params[i+1][0] == "Focal Length"){
    let flength = createInput(params[i+1][1]);
    styleinput(flength, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Focal Length: (Max 1000)", "30");
    flength.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), flength.value())) || isCharNumber(findDifference(flength.value(), str(params[i+1][1])))){
        if (flength.value() == "" || int(flength.value()) == 0){
          totalarr[selected].flength = 1;
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].flength = min(int(flength.value()),1000);
          //console.log(totalarr[selected].coords.magnitude)
        }
      } else {
        flength.value(min(params[i+1][1], 1000));
      }
      });
  } else if (params[i+1][0] == "Ray Density"){
    let rdensity = createInput(params[i+1][1]);
    styleinput(rdensity, windowWidth / 200, 30 + 80 * (i) + 50, settings, "Ray Density (Max 3):", "30");
    rdensity.input(function () {
        if (isCharNumber(findDifference( str(params[i+1][1]), rdensity.value())) || isCharNumber(findDifference(rdensity.value(), str(params[i+1][1])))){
        if (rdensity.value() == "" || float(rdensity.value()) == 0){
          totalarr[selected].raydensity = 1;
          //totalarr[selected].setPos(int(x.value()), 0);
        } else {
          totalarr[selected].raydensity = min(rdensity.value(),3);
          //console.log(totalarr[selected].coords.magnitude)
        }
      } else {
        rdensity.value(min(params[i+1][1], 5));
      }
      });
  }
  
  // trash.mouseClicked(function(){
  //   console.log(trash, selected)
  //   if (selected < componentarr.length){
  //     //componentarr[selected].remove();
  //     componentarr.splice(selected, 1);
  //   }
     
  //   //totalarr[selected].remove();
  //   totalarr.splice(selected, 1);
  //   selected = null;
  //   updateComponents();
  // });
} 
  }
  console.log(settings);
  //UIEventHandler1.createButton(settings,"Delete", "/src/icons/trash-outline.svg", false, "Delete", false, );
if (selector == false) {
  
  settings.elt.classList.remove("scale-100");
  settings.elt.classList.add("scale-0");
  let deleter = select("Deleteparent");
  if (deleter != null){
    deleter.elt.classList.remove("scale-100");
    deleter.elt.classList.add("scale-0");
  }
} else {
  settings.elt.classList.remove("scale-0");
  settings.elt.classList.add("scale-100");
  let deleter = select("Deleteparent");
  if (deleter != null){
    deleter.elt.classList.remove("scale-0");
    deleter.elt.classList.add("scale-100");
  }
}
}
let UIEventHandler1;
let maxid = 0;
function findRayById(objects, id) {
  const objectMap = new Map();

  // Create a map of IDs to objects
  for (const obj of objects) {
    objectMap.set(obj.ID, obj);
  }
  //console.log(objectMap)
  // Retrieve the object by its ID from the map
  return objectMap.get(id);
}
function handleUIClicks(){
  console.log(UIEventHandler1.buttons, UIEventHandler1.buttonIDs);
  console.log(UIEventHandler1.buttons.length)
  for (let i = 0; i < UIEventHandler1.buttons.length - 1; i++){
    UIEventHandler1.buttons[i].mouseClicked(function(){
      console.log(UIEventHandler1.buttonIDs[i])
      let add = UIEventHandler1.spawnObjects(UIEventHandler1.buttonIDs[i], maxid);
      if (add != null){
        console.log(totalarr, componentarr, sourcearr)
        if (selected == "Laser" || selected == "Flashlight" || selected == "Normal_Light" || selected == "Sun"){
          sourcearr.push(add);
        } else {
          componentarr.push(add);
          
        }
        totalarr = componentarr.concat(sourcearr);
        maxid+=1;
        console.log(totalarr, componentarr, sourcearr);
      } else{
        
        let preset = UIEventHandler1.spawnPresets(UIEventHandler1.buttonIDs[i]);

        if (preset.length > 0){
          console.log(preset)
          maxid = preset[1];
          console.log(preset)
          componentarr = preset[0];
          totalarr = componentarr.concat(sourcearr);
          //console.log(totalarr, componentarr, sourcearr);
          
          //console.log(totalarr, componentarr, sourcearr);
        }

        //console.log(trash, selected)
        // if (selected < componentarr.length){
        //   //componentarr[selected].remove();
        //   componentarr.splice(selected, 1);
        // }
         
        // //totalarr[selected].remove();
        // totalarr.splice(selected, 1);
        // selected = -1;
        // updateComponents();
        // editables = [];
        // setting(editables, false);
      } 
    }); //to prevent the buttons from being clicked
  }
  console.log(UIEventHandler1.buttons[UIEventHandler1.buttons.length - 1])
  UIEventHandler1.buttons[UIEventHandler1.buttons.length - 1].mouseClicked(function(){
    //del button
    if (selected < componentarr.length){
      //componentarr[selected].remove();
      componentarr.splice(selected, 1);
    }
      
    //totalarr[selected].remove();
    totalarr.splice(selected, 1);
    selected = -1;
    updateComponents();
    editables = [];
    setting(editables, false);
    UIEventHandler1.toggleDeleted(false);
    console.log(3141)
  });
  
  
}
// function handleDeletions(){

//   for (let i = 0; i < UIEventHandler1.buttons.length; i++){
//     UIEventHandler1.buttons[i].mouseClicked(function(){
//       console.log(31)
//       if (UIEventHandler1.buttonIDs[i] == "Delete"){
//         //console.log(trash, selected)
//         if (selected < componentarr.length){
//           //componentarr[selected].remove();
//           componentarr.splice(selected, 1);
//         }
         
//         //totalarr[selected].remove();
//         totalarr.splice(selected, 1);
//         selected = -1;
//         updateComponents();
//         editables = [];
//         setting(editables, false);
//       }
//     }); //to prevent the buttons from being clicked
//   }
//   // let trash = select("#Delete");
//   // if (trash != null){
//   //   trash.mouseClicked(function(){
//   //   //console.log(trash, selected)
//   //   if (selected < componentarr.length){
//   //     //componentarr[selected].remove();
//   //     componentarr.splice(selected, 1);
//   //   }
     
//   //   //totalarr[selected].remove();
//   //   totalarr.splice(selected, 1);
//   //   selected = -1;
//   //   updateComponents();
//   //   editables = [];
//   //   setting(editables, false);
//   // });
//   // }
// }
function updateSettings(bool){
  let settingelt = select("#settings");
  if (bool){
    settingelt.class("h-5/6 bg-indigo-600 rounded-md left-0 origin-top ease-in-out shadow-xl transform transition-all duration-300 scale-100 m-1 min-w-full max-w-full");
    settingelt.elt.classList.remove("scale-0");
  } else {
    //console.log("here");
    settingelt.elt.classList.remove("scale-100");
    settingelt.elt.classList.add("scale-0");
    //settingelt.class("h-5/6 bg-indigo-600 rounded-md left-0 origin-top ease-in-out shadow-xl transform transition-all duration-300 scale-0 m-1 min-w-full max-w-full");
    
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  sandbox = createGraphics(windowWidth * 0.8, windowHeight);
  
  


  
  // settings.position(windowWidth * 0.8, 0);
  // settings.style("height",  '100vh');
  // settings.style("width", '20vw');
  // settings.style("background: linear-gradient(to bottom, #183D54, #052F58);");
  //frameRate(1)
  //ray1 = new RayComponent(createVector(50,100), 20, 250, 0);
  // componentarr.push(
  //   new Refractor(createVector(400, 200), 100, 100, 0, 30, 1.8, [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]], sandbox)
  // );
  //componentarr.push(new Reflector(createVector(100, 300), 100, 135, 1, sandbox));
  //componentarr.push(new Refractor(createVector(300, 200), 200, 90, 2, 30, 1.5, [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]], sandbox));
  //componentarr.push(new DiffractionGrating(createVector(150,150),50 , 0, 2,2.2, 3, sandbox)); //micrometers (double slit)
  //componentarr.push(new Prism(createVector(300,200),50,0, 3, [createVector(0,0), createVector(100,0), createVector(40, -50)], 2, [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]], sandbox));
  //done - componentarr.push(new ConvergingLens(createVector(750,450),500,90, 4, 200, sandbox));
  //componentarr.push(new DivergingLens(createVector(300,300),50,0, 5, 100, sandbox));
  //d - diff componentarr.push(new DiffractionGrating(createVector(400,400),100 , 90, 3,2.2, 3, sandbox)); //micrometers (double slit)
  //done - componentarr.push(new Prism(createVector(330,510),50,0, 3, [createVector(0,0), createVector(100,0), createVector(60, -50)], 2, [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]], sandbox)); finalised
  //done - sun componentarr.push(new ConvergingLens(createVector(750,450),500,90, 4, 200, sandbox));
  //d - tele componentarr.push(new ConvergingLens(createVector(450,450),500,90, 1, 350, sandbox));
  //d - tele componentarr.push(new ConvergingLens(createVector(950,450),500,90, 4, 150, sandbox));
  totalarr = componentarr;
  //rainbow: laser + prism

  //done - totalarr.push(new Laser( createVector(200,500),30, 90,  'alpha', 10, sandbox)); fnialised
  //d - diff totalarr.push(new NormalLight(createVector(200,400), 40, 90, 'beta', 600, sandbox));
  //done - totalarr.push(new Flashlight(createVector(300,350), 40, 1.5,100, 'gamma', 500, sandbox));


  //done totalarr.push(new Sun(200, 1.5, 30, 'delta', 600, sandbox));
  //done - tele totalarr.push(new Sun(200, 1.5, 15, 'delta', 600, sandbox));
  UIEventHandler1= new UIEventHandler(sandbox, totalarr, componentarr);
  UIEventHandler1.displayleftinputbar();
  
  
  maxid = totalarr.length;
  setting(editables, false);
  UIEventHandler1.displayDeleted();
  handleUIClicks();

  
}
function updateComponents(){
  for (let i = 0; i < componentarr.length; i++) {
      //console.log(componentarr[i])
      componentarr[i].display(sandbox);
      componentarr[i].displayIntersects(sandbox);
    }

    for (let i = 0; i < totalarr.length; i++){
      if(totalarr[i].type == "Laser" || totalarr[i].type == "Flashlight" || totalarr[i].type == "NormalLight" || totalarr[i].type == "Sun"){
        //console.log(totalarr[i].type);
        totalarr[i].generateRays(componentarr);
        totalarr[i].display(sandbox);
      }
    }
}
function draw() {
  sandbox.background(20);
  //handleDeletions();
  updateComponents();
  //console.log(UIEventHandler1.buttons, UIEventHandler1.buttonIDs)
  //UIEventHandler1.updateButtons();
  if (selected != -1){
    editables = findEditableData(totalarr[selected]);
    //console.log(editables)
    if (inputbool){
    setting(editables, true);
    inputbool = false;
    }
  }
  image(sandbox, 64,0);
}
var inputbool;
//var dragged = false;
function mousePressed(){
  
  if (selected == -1){ //nothing selected
    let index = selectindex(totalarr, createVector(mouseX - 64, mouseY));
    
  //console.log(2)
  if(index != -1){
    UIEventHandler1.toggleDeleted(true);
    totalarr[index].select();
    setting(editables, true);
    //updateSettings(true);
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
      //if (!dragged){
      let index = selectindex(totalarr, createVector(mouseX - 64, mouseY))
        if(index == -1){
      if (mouseX > 64 && mouseX < windowWidth * 0.8 + 64 && mouseY > 0 && mouseY < windowHeight ){
        totalarr[selected].deselect();
      selected = -1;
      UIEventHandler1.toggleDeleted(false);
      //handleDeletions();
      setting(editables, false);
      //updateSettings(false);
      }
      
    } else if(selected == index) {
      //console.log("drag")
      totalarr[selected].clicked();//drag
      //dragged = true;
    }
    }
    
  }
  
  
}
function mouseReleased(){
  if (selected != -1){
    if (totalarr[selected].dragged){
    totalarr[selected].released();
    //dragged = false;
  } else if (totalarr[selected].vertices.length == 3){
    totalarr[selected].pointadj[0] = false;
    //dragged = false;
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
    } else if (obj.type == "DGrating"){
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


