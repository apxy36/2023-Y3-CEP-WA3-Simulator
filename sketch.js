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
    if (text.indexOf(".") === -1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (charC > 31 && (charC < 48 || charC > 57)) return false;
  }
  return true;
}
function findDifference(s, t) {
  if (s === "") return t;

  // (if the additional letter exists)
  // cache them, count values, different values of the same letter would give the answer.

  const obj_S = {};
  const obj_T = {};

  for (let i = 0; i < s.length; i++) {
    if (!obj_S[s[i]]) {
      obj_S[s[i]] = 1;
    } else {
      obj_S[s[i]]++;
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (!obj_T[t[i]]) {
      obj_T[t[i]] = 1;
    } else {
      obj_T[t[i]]++;
    }
  }

  for (const key in obj_T) {
    if (obj_T[key] !== obj_S[key]) {
      return key;
    }
  }
}

function isCharNumber(c) {
  if (c != null) {
    return (c >= "0" && c <= "9") || c == ".";
  } else {
    return false;
  }
}

function styleinput(input, x, y, main, label, w = "7") {
  let maininput = createDiv();
  //bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32
  maininput.class("mb-4 h-10 flex ");
  maininput.parent(main);
  maininput.position(x, y);
  let labelinput = createDiv(label);
  labelinput.parent(maininput);
  labelinput.class(
    " w-" +
      w +
      " h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md p-2.5 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
  );
  //let x = createInput(params[i+1][1].x);
  input.style("width", "4em");
  // x.style("margin-left", "1em");
  // x.style("margin-right", "1em");
  // x.style("margin-bottom", "0.5em");
  // x.style("border-radius", "0.5em");
  input.parent(maininput);
  input.class(
    "h-10 rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  );

  // input.style("width", "4em");
  // input.style("margin-left", "1em");
  // input.style("margin-right", "1em");
  // input.style("margin-bottom", "0.5em");
  // input.class("block w-full p-4 h-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
  // input.position(x,y);
  // input.parent(settings);
}
function styleinput2(input, x, y, main, label, w = "7") {
  let maininput = createDiv();
  //bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32
  maininput.class("mb-4 h-10 flex ");
  //maininput.parent(main);
  maininput.position(x, y);
  let labelinput = createDiv(label);
  labelinput.parent(maininput);
  labelinput.class(
    " w-" +
      w +
      " h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
  );
  //let x = createInput(params[i+1][1].x);
  input.style("width", "4em");
  // x.style("margin-left", "1em");
  // x.style("margin-right", "1em");
  // x.style("margin-bottom", "0.5em");
  // x.style("border-radius", "0.5em");
  input.parent(maininput);
  input.class(
    "h-10 rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  );

  // input.style("width", "4em");
  // input.style("margin-left", "1em");
  // input.style("margin-right", "1em");
  // input.style("margin-bottom", "0.5em");
  // input.class("block w-full p-4 h-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
  // input.position(x,y);
  // input.parent(settings);
}

function styleTable(input, minval, maxval, body, label, w = "45") {
  let maininput = createElement("td");
  maininput.class(
    "whitespace-nowrap text-left w-45 px-6 py-2 font-medium text-neutral-50"
  );
  maininput.parent(body);
  let subinput = createElement("div");
  subinput.class("mb-4 h-10 flex left-0 sticky w-full flex-col space-y-2 p-2");
  subinput.parent(maininput);
  let labelinput = createDiv(label);
  labelinput.parent(subinput);
  labelinput.class(
    " w-" +
      w +
      " h-10 text-gray-500 dark:text-gray-400 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
  );
  input.parent(subinput);
  input.class(
    "rounded-lg dark:bg-gray-700 accent-blue-500 transparent h-[4px] w-full cursor-pointer appearance-none border-transparent"
  );
  // input.elt.min = str(minval);
  // input.elt.max = str(maxval);
  let sliderlabel = createElement("ul");
  sliderlabel.parent(subinput);
  sliderlabel.class(
    "flex justify-between w-full px-[10px] dark:text-neutral-50 block mb-2 text-sm font-medium text-gray-900"
  );

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

function updateRcoeffs(
  lowerbounds,
  upperbounds,
  coeffinputs,
  params,
  paramindex
) {
  //lower and upper boudns are nested arrays
  //convert to int, bound, then convert to string
  for (let i = 0; i < 2; i++) {
    //b and c coefficients
    for (let j = 0; j < 3; j++) {
      //3 coeffs
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

      if (val > upperbounds[i][j]) {
        val = upperbounds[i][j];
      } else if (val < lowerbounds[i][j]) {
        val = lowerbounds[i][j];
      }
      totalarr[selected].rcoeffs[i][j] = val;
      //console.log(totalarr[selected].rcoeffs[i][j], totalarr[selected].rcoeffs);
      //}

      //console.log(val, coeffinputs[3 * i + j].value())
      coeffinputs[3 * i + j].value(val);

      //totalarr[selected].setPos(int(x.value()), int(y.value()));
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
function handleUIClicks() {
  console.log(UIEventHandler1.buttons, UIEventHandler1.buttonIDs);
  console.log(UIEventHandler1.buttons.length);
  for (let i = 0; i < UIEventHandler1.buttons.length - 1; i++) {
    UIEventHandler1.buttons[i].mouseClicked(function () {
      console.log(UIEventHandler1.buttonIDs[i]);
      let add = UIEventHandler1.spawnObjects(
        UIEventHandler1.buttonIDs[i],
        maxid
      );
      if (add != null) {
        //console.log(totalarr, componentarr, sourcearr)
        if (
          selected == "Laser" ||
          selected == "Flashlight" ||
          selected == "Normal_Light" ||
          selected == "Sun"
        ) {
          sourcearr.push(add);
        } else {
          componentarr.push(add);
        }
        totalarr = componentarr.concat(sourcearr);
        maxid += 1;
        console.log(totalarr, componentarr, sourcearr);
      } else {
        let preset = UIEventHandler1.spawnPresets(UIEventHandler1.buttonIDs[i]);

        if (preset.length > 0) {
          maxid = preset[1];
          componentarr = preset[0];
          totalarr = componentarr.concat(sourcearr);
          //console.log(totalarr, componentarr, sourcearr);

          //console.log(totalarr, componentarr, sourcearr);
        }
      }
    }); //to prevent the buttons from being clicked
  }
  console.log(UIEventHandler1.buttons[UIEventHandler1.buttons.length - 1]);
  UIEventHandler1.buttons[UIEventHandler1.buttons.length - 1].mouseClicked(
    function () {
      //del button
      if (selected < componentarr.length) {
        //componentarr[selected].remove();
        componentarr.splice(selected, 1);
      }

      //totalarr[selected].remove();
      totalarr.splice(selected, 1);
      selected = -1;
      updateComponents();
      editables = [];
      UIEventHandler1.setting(editables, false, totalarr, selected);
      UIEventHandler1.toggleDeleted(false);
      console.log(3141);
    }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  sandbox = createGraphics(windowWidth * 0.8, windowHeight);
  componentarr.push(
    new Reflector(createVector(300, 200), 100, 135, 1, sandbox)
  );
  totalarr = componentarr;
  totalarr.push(
    new NormalLight(createVector(100, 200), 40, 90, "beta", 600, sandbox)
  );
  UIEventHandler1 = new UIEventHandler(sandbox, totalarr, componentarr);
  UIEventHandler1.displayleftinputbar();

  maxid = totalarr.length;
  UIEventHandler1.setting(editables, false, totalarr, selected);
  UIEventHandler1.displayDeleted();
  handleUIClicks();
}
function updateComponents() {
  for (let i = 0; i < componentarr.length; i++) {
    //console.log(componentarr[i])
    componentarr[i].display(sandbox);
    componentarr[i].displayIntersects(sandbox);
  }

  for (let i = 0; i < totalarr.length; i++) {
    if (
      totalarr[i].type == "Laser" ||
      totalarr[i].type == "Flashlight" ||
      totalarr[i].type == "NormalLight" ||
      totalarr[i].type == "Sun"
    ) {
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
  if (selected != -1) {
    editables = findEditableData(totalarr[selected]);
    //console.log(editables)
    if (inputbool) {
      UIEventHandler1.setting(editables, true, totalarr, selected);
      inputbool = false;
    }
  }
  image(sandbox, 64, 0);
}
var inputbool;
//var dragged = false;
function mousePressed() {
  if (selected == -1) {
    //nothing selected
    let index = selectindex(totalarr, createVector(mouseX - 64, mouseY));

    //console.log(2)
    if (index != -1) {
      UIEventHandler1.toggleDeleted(true);
      totalarr[index].select();
      UIEventHandler1.setting(editables, true, totalarr, selected);
      //updateSettings(true);
      //totalarr[index].clicked();
      inputbool = true;
    } else {
      //index = selectindex([light1], createVector(mouseX, mouseY));
    }
    selected = index;
  } else {
    //smth selected
    let output = -1;
    if (totalarr[selected].vertices.length == 3) {
      output = totalarr[selected].selectVertex();
    }
    if (output != -1) {
      totalarr[selected].clickedVertex();

      //shiftVertex(output.x, output.y);
    } else {
      //if (!dragged){
      let index = selectindex(totalarr, createVector(mouseX - 64, mouseY));
      if (index == -1) {
        if (
          mouseX > 64 &&
          mouseX < windowWidth * 0.8 + 64 &&
          mouseY > 0 &&
          mouseY < windowHeight
        ) {
          totalarr[selected].deselect();
          selected = -1;
          UIEventHandler1.toggleDeleted(false);
          //handleDeletions();
          UIEventHandler1.setting(editables, false, totalarr, selected);
          //updateSettings(false);
        }
      } else if (selected == index) {
        //console.log("drag")
        totalarr[selected].clicked(); //drag
        //dragged = true;
      }
    }
  }
}
function mouseReleased() {
  if (selected != -1) {
    if (totalarr[selected].dragged) {
      totalarr[selected].released();
      //dragged = false;
    } else if (totalarr[selected].vertices.length == 3) {
      totalarr[selected].pointadj[0] = false;
      //dragged = false;
    }
  }
}
