//import { IoIosFlashlight} from "react-icons/io";
//import Flashlight from "./src/sources/flashlight";
class UIEventHandler {
  constructor(display, tarr, carr) {
    this.displayer = display;
    this.leftinputbar = createDiv();
    this.leftinputbar.id("leftinputbar");
    this.mainleftinputbar = createDiv();
    this.mainleftinputbar.id("mainleftinputbar");
    this.leftinputbar.parent(this.mainleftinputbar);
    this.mainsettings = createDiv();
    this.maxid = tarr.length;
    this.buttons = [];
    this.buttonIDs = [];
    this.buttonparents = [];
    this.presets = []; //imagelens, sunlens, telescope, rainbow, diffraction
    //this.mainsettings.id("mainsettings");
  }

  displayleftinputbar() {
    this.mainleftinputbar.class(
      "fixed top-0 left-0 h-screen w-16 m-0 flex flex-col shadow-lg items-center bg-primary text-white-shadow"
    );
    // let b1 = createElement("i");
    // b1.value("123");
    // b1.parent(this.leftinputbar);
    this.leftinputbar.class(
      "fixed top-0 left-0 h-56 w-16 m-0 flex flex-col shadow-lg items-center bg-primary text-white-shadow"
    );
    this.createButton(
      this.leftinputbar,
      "sources",
      "./src/icons/flashlight-outline.svg",
      true,
      "Add Light Sources",
      true,
      [
        ["Normal_Light", "Flashlight", "Laser", "Sun"],
        [
          "./src/icons/light-bulb.svg",
          "./src/icons/flashlight-outline.svg",
          "./src/icons/laser-blast.svg",
          "./src/icons/sunny-outline.svg",
        ],
        [true, true, false, true],
      ]
    );
    this.createButton(
      this.leftinputbar,
      "reflectors",
      "./src/icons/mirror-mirror.svg",
      false,
      "Add Reflectors etc.",
      true,
      [
        [
          "Mirror",
          "Refractor",
          "Prism",
          "Grating",
          "Converging_Lens",
          "Diverging_Lens",
        ],
        [
          "./src/icons/mirror-mirror.svg",
          "./src/icons/refractor.svg",
          "./src/icons/prism-outline.svg",
          "./src/icons/grating.svg",
          "./src/icons/clens.svg",
          "./src/icons/dlens.svg",
        ],
        [false, true, true, true, true, true, true],
      ]
    );
    this.createButton(
      this.leftinputbar,
      "presets",
      "./src/icons/presets.svg",
      true,
      "Use Presets",
      true,
      [
        [
          "Light source and lens",
          "Sun and lens",
          "Astronomical Telescope",
          "Rainbow Prism",
          "Diffraction Grating",
        ],
        [
          "./src/icons/image+lens-preset.svg",
          "./src/icons/sun+lens-preset.svg",
          "./src/icons/telescope-preset.svg",
          "./src/icons/rainbow-preset.svg",
          "./src/icons/diffraction-preset.svg",
        ],
        [true, false, true, true, true],
      ]
    );
    this.createButton(
      this.leftinputbar,
      "help",
      "./src/icons/help-circle-outline.svg",
      true,
      "Need Help?",
      false
    );
  }
  displayDeleted(div) {
    let deleter = select("#Deleteparent");
    if (deleter != null) {
      deleter.remove();
    }
    this.createButton(
      this.leftinputbar,
      "Delete",
      "./src/icons/trash-outline.svg",
      false,
      "Delete",
      false
    );
    this.toggleDeleted(false);
  }
  toggleDeleted(bool) {
    console.log(this.buttons[this.buttonIDs.indexOf("Delete")].elt.scale);
    if (bool) {
      //appear
      this.buttons[this.buttonIDs.indexOf("Delete")].elt.classList.remove(
        "scale-0"
      );
      this.buttons[this.buttonIDs.indexOf("Delete")].elt.classList.add(
        "scale-100"
      );
    } else {
      //disappear
      this.buttons[this.buttonIDs.indexOf("Delete")].elt.classList.remove(
        "scale-100"
      );
      this.buttons[this.buttonIDs.indexOf("Delete")].elt.classList.add(
        "scale-0"
      );
    }
  }
  createButton(parent, id, icon, invert, label, expandable, secondbardata) {
    if (id == "Delete") {
      //parentimg is the problem -> keeps spawining new buttons
      for (let i = 0; i < this.buttonIDs.length; i++) {
        if (this.buttonIDs[i] == "Delete") {
          let parentbutton = this.buttonparents[i].id();
          let deleter = select("#Deleteparent");
          if (deleter != null) {
            deleter.remove();
          }
          this.buttonIDs.splice(i, 1);
          this.buttons.splice(i, 1);
          //return this.buttons[i]; //return null -> does not spawn new button
        } //returns null if delete?
      }
    }
    let parentimg = createDiv();
    parentimg.parent(parent);
    parentimg.id(id + "parent");
    this.buttonparents.push(parentimg);
    parentimg.class(
      "flex group hover:scale-110 transition-all duration-300 ease-linear"
    );
    let buttonimg = createImg(icon, "");
    buttonimg.parent(parentimg);

    if (invert) {
      buttonimg.class(
        "relative flex items-center filter invert justify-center bg-invertedquartenary w-12 h-12  mt-2 mb-2 mx-auto rounded-full shadow-lg cursor-pointer hover:bg-invertedindigo hover:rounded-xl text-neutral-50 focus:bg-gray-200 focus:outline-none transition-all duration-300 ease-linear"
      );
    } else {
      buttonimg.class(
        "relative flex items-center justify-center w-12 h-12 mt-2 mb-2 mx-auto bg-quartenary rounded-full shadow-lg cursor-pointer hover:bg-indigo-600 hover:rounded-xl text-neutral-50 focus:bg-gray-200 focus:outline-none transition-all duration-300 ease-linear"
      );
    }
    if (id == "Delete") {
      parentimg.class(
        "flex flex-col group hover:scale-110 transition-all duration-300 ease-linear h-12 bottom-0 w-full"
      );
      buttonimg.class(
        "b-0 relative flex items-center justify-center w-24 h-12  mt-2 mb-2 mx-auto bg-rose-600 rounded-full shadow-lg cursor-pointer hover:bg-indigo-600 hover:rounded-xl text-neutral-50 focus:bg-gray-200 focus:outline-none transition-all duration-300 ease-linear"
      );
      //console.log(this.buttonIDs)
      parentimg.position(0, height - 84);
    }
    //buttonimg.elt.classList.add("bg-primary");
    buttonimg.id(id);
    this.buttonIDs.push(id);
    this.buttons.push(buttonimg);
    //labeldiv.class('left-14 text-white invert-0')
    if (label != null) {
      let labeldiv = createDiv(label);
      //labeldiv.position(56, 0);
      labeldiv.class(
        "absolute w-auto p-2 t-0 invert-0 m-2 min-w-max left-14 rounded-md shadow-md text-neutral-50 bg-gray-800 text-xs text-bold transition-all duration-100 ease-linear origin-left scale-0 group-hover:scale-100"
      );
      labeldiv.id(id + "label");
      labeldiv.parent(parentimg);
      if (label == "Need Help?") {
        labeldiv.class(
          "absolute w-auto p-2 t-0 invert-0 m-2 min-w-max left-14 rounded-md shadow-md text-neutral-50 bg-gray-800 text-md font-bold transition-all duration-100 ease-linear origin-left scale-0 group-hover:scale-100"
        );
        let sublabeldiv = createElement("ul");
        sublabeldiv.parent(labeldiv);
        sublabeldiv.class("list-disc list-inside text-xs font-normal");
        let help1 = createElement("li");
        help1.html(
          "Maybe you could try adding more objects from the left sidebar and dragging them in the way of light rays in the play area..."
        );
        help1.parent(sublabeldiv);
        let help2 = createElement("li");
        help2.html(
          "You can also change the properties of objects by clicking on them and editing the values in the settings bar on the right."
        );
        help2.parent(sublabeldiv);
        let help3 = createElement("li");
        help3.html(
          "You can also delete objects by clicking on the bin icon at the bottom of the left sidebar."
        );
        help3.parent(sublabeldiv);
        let help4 = createElement("li");
        help4.html(
          "You can also use presets by clicking on the presets icon in the left sidebar."
        );
        help4.parent(sublabeldiv);
        let help5 = createElement("li");
        help5.html("Have fun!");
        help5.parent(sublabeldiv);
      }
    }
    if (expandable) {
      this.createSecondInputBar(
        secondbardata[0],
        secondbardata[1],
        secondbardata[2],
        parentimg
      );
    }
    return buttonimg;
  }
  spawnObjects(selected, id) {
    //console.log(selected);
    let component;
    let position = createVector(
      width / 2 + random(-100, 100),
      height / 2 + random(-100, 100)
    );
    if (
      selected == "Laser" ||
      selected == "Flashlight" ||
      selected == "Normal_Light" ||
      selected == "Sun"
    ) {
      if (selected == "Laser") {
        component = new Laser(position, 20, 0, id, 8, this.displayer);
      } else if (selected == "Flashlight") {
        component = new Flashlight(position, 20, 2, 0, id, 600, this.displayer);
      } else if (selected == "Normal_Light") {
        component = new NormalLight(position, 20, 0, id, 600, this.displayer);
      } else if (selected == "Sun") {
        component = new Sun(100, 1, 0, id, 600, this.displayer);
      }
    } else {
      if (selected == "Mirror") {
        component = new Reflector(position, 50, 0, id, this.displayer);
      } else if (selected == "Refractor") {
        component = new Refractor(
          position,
          50,
          0,
          id,
          50,
          1.5,
          [
            [1.03961212, 0.231792344, 1.01046945],
            [6.00069867 / 1000, 2.00179144 / 100, 1.03560653 / 100],
          ],
          this.displayer
        );
      } else if (selected == "Prism") {
        component = new Prism(
          position,
          50,
          0,
          id,
          [createVector(0, 0), createVector(100, 0), createVector(40, -50)],
          1.5,
          [
            [1.03961212, 0.231792344, 1.01046945],
            [6.00069867 / 1000, 2.00179144 / 100, 1.03560653 / 100],
          ],
          this.displayer
        );
      } else if (selected == "Grating") {
        component = new DiffractionGrating(
          position,
          50,
          0,
          id,
          2.2,
          3,
          this.displayer
        );
      } else if (selected == "Converging_Lens") {
        component = new ConvergingLens(
          position,
          50,
          0,
          id,
          150,
          this.displayer
        );
      } else if (selected == "Diverging_Lens") {
        component = new DivergingLens(position, 50, 0, id, 150, this.displayer);
      }
    }
    this.maxid += 1;
    return component;
  }
  createSecondInputBar(buttonsnames, icons, inversions, parent) {
    let mainsecondinputbar = createDiv();
    mainsecondinputbar.id("mainsecondinputbar");
    mainsecondinputbar.parent(parent);
    mainsecondinputbar.class(
      " rounded-md fixed top-2 left-14 h-96 w-16 m-0 flex flex-col shadow-lg items-center bg-tertiary text-white-shadow group-hover:scale-100 scale-0 transition-all duration-300 ease-linear"
    );
    let secondinputbar = createDiv();
    secondinputbar.class(
      "rounded-md fixed top-0 left-0 h-56 m-0 w-16 flex flex-col shadow-lg items-center bg-tertiary text-white-shadow"
    );
    secondinputbar.parent(mainsecondinputbar);
    for (let i = 0; i < buttonsnames.length; i++) {
      let buttonname = buttonsnames[i];
      this.createButton(
        secondinputbar,
        buttonname,
        icons[i],
        inversions[i],
        buttonname,
        false
      );
    }
    //this.updateButtons(buttonsnames);
  }
  spawnPresets(preset) {
    let output = [];
    if (preset == "Light source and lens") {
      let light = new Flashlight(
        createVector(300, 350),
        40,
        1.5,
        100,
        0,
        500,
        this.displayer
      );
      let lens = new ConvergingLens(
        createVector(750, 450),
        500,
        90,
        1,
        200,
        this.displayer
      );
      output = [[light, lens], 2]; //maxid
    } else if (preset == "Sun and lens") {
      let sun = new Sun(200, 1.5, 20, 0, 600, this.displayer);
      let lens = new ConvergingLens(
        createVector(750, 450),
        500,
        90,
        1,
        200,
        this.displayer
      );
      output = [[sun, lens], 2]; //maxid
    } else if (preset == "Astronomical Telescope") {
      let sun = new Sun(200, 1.5, 15, 0, 600, this.displayer);
      let lens1 = new ConvergingLens(
        createVector(450, 450),
        500,
        90,
        1,
        350,
        this.displayer
      );
      let lens2 = new ConvergingLens(
        createVector(950, 450),
        500,
        90,
        2,
        150,
        this.displayer
      );
      output = [[sun, lens1, lens2], 3]; //maxid
    } else if (preset == "Rainbow Prism") {
      let source = new Laser(
        createVector(200, 500),
        30,
        90,
        0,
        10,
        this.displayer
      );
      let prism = new Prism(
        createVector(330, 510),
        50,
        0,
        1,
        [createVector(0, 0), createVector(100, 0), createVector(60, -50)],
        2,
        [
          [1.03961212, 0.231792344, 1.01046945],
          [6.00069867 / 1000, 2.00179144 / 100, 1.03560653 / 100],
        ],
        this.displayer
      );
      output = [[source, prism], 2]; //maxid
    } else if (preset == "Diffraction Grating") {
      let source = new NormalLight(
        createVector(200, 400),
        40,
        90,
        0,
        600,
        this.displayer
      );
      let grating = new DiffractionGrating(
        createVector(400, 400),
        100,
        90,
        1,
        2.2,
        3,
        this.displayer
      );
      output = [[source, grating], 2]; //maxid
    }
    this.maxid = output[output.length - 1];
    return output;
  }
  setting(params, selector, totalarr, selected) {
    //convert everything in terms of displayheight and displaywidth
    let remover = select("#mainsettings");
    if (remover != null) {
      //reloads the settings menu
      remover.remove();
    }
    let mainsettings = createDiv();
    mainsettings.id("mainsettings");
    let settings = createElement("ul");
    //settings.parent(parent);
    //settings.position(0,0);
    mainsettings.position(windowWidth * 0.8, 0);
    mainsettings.style("height", "100vh");
    mainsettings.style("width", "18vw");
    settings.parent(mainsettings);
    settings.id("settings");
    //settings.style("background: linear-gradient(to bottom, #183D54, #052F58);");
    mainsettings.class("flex h-auto bg-primary border-2 border-primary");

    if (selector) {
      //is the settings menu open? -> scaling
      settings.class(
        "h-5/6 bg-indigo-600 rounded-md left-0 origin-top ease-in-out shadow-xl transform transition-all duration-300 scale-0 m-1 min-w-full max-w-full"
      );
    } else {
      settings.class(
        "h-5/6 bg-indigo-600 rounded-md left-0 origin-top ease-in-out shadow-xl transform transition-all duration-300 scale-100 m-1 min-w-full max-w-full"
      );
    }
    if (params.length > 0) {
      //creates the elements to modify the properties of the selected object
      let settingsheader = createSpan(params[0].constructor.name);
      settingsheader.class(
        " h-5 rounded-md py-3 text-lg top-0 left-0 font-medium text-white text-left"
      );
      settingsheader.parent(settings);
      settingsheader.position(10, windowHeight / 150);
      for (let i = 0; i < params.length - 1; i++) {
        let label = createSpan(params[i + 1][0]);
        label.class(
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        );
        label.parent(settings);
        label.position(10, 50 + 80 * i);
        label.innerHTML = params[i + 1][0];
        if (params[i + 1][0] == "Position") {
          let x = createInput(params[i + 1][1].x);
          x.style("width", "4em");
          styleinput(x, displayWidth / 200, 30 + 80 * i + 50, settings, "x:");
          let y = createInput(params[i + 1][1].y);
          y.style("width", "4em");
          styleinput(y, displayWidth / 15, 30 + 80 * i + 50, settings, "y:");
          //y.parent(settings);
          x.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1].x), x.value())
              ) ||
              isCharNumber(findDifference(x.value(), str(params[i + 1][1].x)))
            ) {
              if (x.value() == "") {
                totalarr[selected].setPos(0, int(y.value()));
              } else {
                totalarr[selected].setPos(int(x.value()), int(y.value()));
              }
              updateComponents();
            } else {
              x.value(params[i + 1][1].x);
            }
          });
          y.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1].y), y.value())
              ) ||
              isCharNumber(findDifference(y.value(), str(params[i + 1][1].y)))
            ) {
              if (y.value() == "") {
                totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].setPos(int(x.value()), int(y.value()));
              }
              updateComponents();
            } else {
              y.value(params[i + 1][1].y);
            }
          });
        } else if (params[i + 1][0] == "Angle") {
          let mainangle = createElement("div");
          mainangle.class(
            "mb-2 h-10 flex left-0 sticky w-4/5 flex-col space-y-2 p-2"
          );

          mainangle.parent(settings);
          let angle = createSlider(0, 360, params[i + 1][1], 1);
          //styleinput(angle, windowWidth / 200, 300 + 70 * (i) + 50, settings);
          mainangle.position(windowWidth / 100, 30 + 80 * i + 50);
          //angle.class("block mb-2 text-sm font-medium text-gray-900 dark:text-white");
          angle.parent(mainangle);
          angle.class(
            "w-full h-2  bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
          );
          //angle.class("range pr-6 accent-red-500");
          angle.input(function () {
            console.log(angle.value());
            totalarr[selected].setRotation(angle.value());
            totalarr[selected].coords.theta = angle.value();

            updateComponents();
          });
          let sliderlabel = createElement("ul");
          sliderlabel.parent(mainangle);
          sliderlabel.class(
            "flex justify-between w-full px-[10px] block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          );

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
        } else if (params[i + 1][0] == "Width") {
          let width = createInput(params[i + 1][1]);
          width.style("width", "4em");
          styleinput(
            width,
            windowWidth / 200,
            30 + 80 * i + 50,
            settings,
            "Width:",
            "20"
          );
          width.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1]), width.value())
              ) ||
              isCharNumber(findDifference(width.value(), str(params[i + 1][1])))
            ) {
              if (width.value() == "" || int(width.value()) == 0) {
                totalarr[selected].coords.magnitude = 5;
                if (
                  totalarr[selected].constructor.name == "ConvergingLens" ||
                  totalarr[selected].constructor.name == "DivergingLens"
                ) {
                  totalarr[selected].width = 5;
                }
                //totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].coords.magnitude = int(width.value()) / 2;
                //console.log(totalarr[selected].coords.magnitude)
                if (
                  totalarr[selected].constructor.name == "ConvergingLens" ||
                  totalarr[selected].constructor.name == "DivergingLens"
                ) {
                  totalarr[selected].width = int(width.value());
                }
              }
              updateComponents();
            } else {
              width.value(params[i + 1][1]);
            }
          });
        } else if (params[i + 1][0] == "Thickness") {
          //console.log(params[i+1][1])
          let thickness = createInput(params[i + 1][1]);
          thickness.style("width", "4em");
          styleinput(
            thickness,
            windowWidth / 200,
            30 + 80 * i + 50,
            settings,
            "Thickness:",
            "20"
          );
          thickness.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1]), thickness.value())
              ) ||
              isCharNumber(
                findDifference(thickness.value(), str(params[i + 1][1]))
              )
            ) {
              if (thickness.value() == "" || int(thickness.value()) == 0) {
                totalarr[selected].thickness = 5;
                //totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].thickness = int(thickness.value()) / 2;
                //console.log(totalarr[selected].coords.magnitude)
              }
              updateComponents();
            } else {
              thickness.value(params[i + 1][1]);
            }
          });
        } else if (params[i + 1][0] == "Refractive Coefficients") {
          //UI for modifying refractive coefficients
          let mainrcoeffs = createElement("div");
          mainrcoeffs.class("flex-col flex w-full");
          mainrcoeffs.position(windowWidth / 200, 30 + 80 * i + 50);
          mainrcoeffs.parent(settings);
          let rcoeffs = createElement("table");
          rcoeffs.class("table-fixed space-y-3");

          //rcoeffs.position(windowWidth / 200, 30 + 80 * (i) + 50);
          rcoeffs.class(
            "inline-block overflow-x-auto flex flex-col overflow-hidden bg-indigo-500 h-1/3 w-5/6 text-center font-light rounded-lg"
          );

          let thead = createElement("tr");
          thead.parent(rcoeffs);
          thead.class(
            "flex font-medium min-w-full bg-gray-600 px-2 py-2 h-12 bg-indigo-700 text-neutral-50 border-b font-bold text-sm"
          );

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
          let lowerbounds = [
            [0.73961212, 0.151792344, 0.90046945],
            [3.00069867 / 1000, 1.00179144 / 100, 0.63560653 / 100],
          ];
          let upperbounds = [
            [2.03386592, 0.39875031, 2.00179144],
            [12.3980732 / 1000, 8.97479468 / 100, 13.2765991 / 100],
          ];
          let inputs = [];
          for (let j = 0; j < 3; j++) {
            let tr = createElement("tr");
            tr.parent(tbody);
            for (let k = 0; k < 2; k++) {
              let input = createSlider(
                lowerbounds[k][j],
                upperbounds[k][j],
                params[i + 1][1][k][j],
                lowerbounds[k][j] / 100
              );
              if (k == 0) {
                styleTable(
                  input,
                  lowerbounds[k][j].toFixed(5),
                  upperbounds[k][j].toFixed(5),
                  tr,
                  "B" + str(j + 1) + ":",
                  "10"
                );
              } else if (k == 1) {
                styleTable(
                  input,
                  lowerbounds[k][j].toFixed(5),
                  upperbounds[k][j].toFixed(5),
                  tr,
                  "C" + str(j + 1) + ":",
                  "10"
                );
              }
              inputs.push(input);
            }
          }
          let ray;
          //finds first ray wavelenngth
          for (let j = 0; j < totalarr.length; j++) {
            if (
              totalarr[j].type == "Laser" ||
              totalarr[j].type == "Flashlight" ||
              totalarr[j].type == "NormalLight" ||
              totalarr[j].type == "Sun"
            ) {
              for (let k = 0; k < totalarr[j].rays.length; k++) {
                ray = findRayById(
                  totalarr[j].rays[k].raysegments,
                  params[0].intersectIDs[0]
                );
                //console.log(ray, totalarr[j].rays[k].raysegments, params[0].intersectIDs[0])
                if (ray != null) {
                  break;
                }
              }
            }
          }
          //let component = findObjectById(params[0].id, componentarr);
          inputs = [
            inputs[0],
            inputs[2],
            inputs[4],
            inputs[1],
            inputs[3],
            inputs[5],
          ]; //b0, b1
          let labelinput;
          if (ray != null) {
            labelinput = createDiv(
              "Refractive Index: " +
                params[0].ricalc(ray.wavelength).toFixed(3) +
                " Wavelength: " +
                ray.wavelength
            );
          } else {
            labelinput = createDiv(
              "Refractive Index: " +
                params[0].ricalc(600).toFixed(3) +
                " Wavelength: 600"
            );
          }
          labelinput.class(
            "dark:font-bold w-5/6 h-16 py-2 text-neutral-50  dark:text-neutral-50 inline-flex text-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
          );

          for (let j = 0; j < 6; j++) {
            inputs[j].input(function () {
              updateRcoeffs(lowerbounds, upperbounds, inputs, params, i + 1);
              //labelinput.html('Refractive Index: ' + params[0].ricalc(600).toFixed(3));
              if (ray != null) {
                labelinput.html(
                  "Refractive Index: " +
                    params[0].ricalc(ray.wavelength).toFixed(3) +
                    " Wavelength: " +
                    ray.wavelength
                );
              } else {
                labelinput.html(
                  "Refractive Index: " +
                    params[0].ricalc(600).toFixed(3) +
                    " Wavelength: 600"
                );
              }
            });
          }

          rcoeffs.parent(mainrcoeffs);
          labelinput.parent(mainrcoeffs);
        } else if (params[i + 1][0] == "Wavelength") {
          let wavelength = createInput(params[i + 1][1]);
          wavelength.style("width", "4em");
          styleinput(
            wavelength,
            windowWidth / 200,
            30 + 80 * i + 50,
            settings,
            "Wavelength(nm):",
            "30"
          );
          wavelength.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1]), wavelength.value())
              ) ||
              isCharNumber(
                findDifference(wavelength.value(), str(params[i + 1][1]))
              )
            ) {
              if (wavelength.value() == "" || int(wavelength.value()) == 0) {
                totalarr[selected].wavelength = 400;
                //totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].wavelength = int(wavelength.value());
                //console.log(totalarr[selected].coords.magnitude)
              }
            } else {
              wavelength.value(params[i + 1][1]);
            }
          });
        } else if (params[i + 1][0] == "Number of different wavelengths") {
          let wavelengthno = createInput(params[i + 1][1]);
          styleinput(
            wavelengthno,
            windowWidth / 200,
            30 + 80 * i + 50,
            settings,
            "Wavelength Number: (Max 15)",
            "30"
          );
          wavelengthno.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1]), wavelengthno.value())
              ) ||
              isCharNumber(
                findDifference(wavelengthno.value(), str(params[i + 1][1]))
              )
            ) {
              if (
                wavelengthno.value() == "" ||
                int(wavelengthno.value()) == 0
              ) {
                totalarr[selected].number = 1;
                //totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].number = min(int(wavelengthno.value()), 15);
                //console.log(totalarr[selected].coords.magnitude)
              }
            } else {
              wavelengthno.value(min(params[i + 1][1], 15));
            }
          });
        } else if (params[i + 1][0] == "Maximum Order") {
          let maxorder = createInput(params[i + 1][1]);
          styleinput(
            maxorder,
            windowWidth / 200,
            30 + 80 * i + 50,
            settings,
            "Maximum Order: (Max 6)",
            "30"
          );
          maxorder.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1]), maxorder.value())
              ) ||
              isCharNumber(
                findDifference(maxorder.value(), str(params[i + 1][1]))
              )
            ) {
              if (maxorder.value() == "" || int(maxorder.value()) == 0) {
                totalarr[selected].maxorder = 1;
                //totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].maxorder = min(int(maxorder.value()), 6);
                //console.log(totalarr[selected].coords.magnitude)
              }
            } else {
              maxorder.value(min(params[i + 1][1], 6));
            }
          });
        } else if (params[i + 1][0] == "Slit Separation Distance") {
          let slitdist = createInput(params[i + 1][1]);
          styleinput(
            slitdist,
            windowWidth / 200,
            30 + 80 * i + 50,
            settings,
            "Slit separation (Micrometers):",
            "30"
          );
          slitdist.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1]), slitdist.value())
              ) ||
              isCharNumber(
                findDifference(slitdist.value(), str(params[i + 1][1]))
              )
            ) {
              if (slitdist.value() == "" || int(slitdist.value()) == 0) {
                totalarr[selected].slitdist = 1;
                //totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].slitdist = min(int(slitdist.value()), 10);
                //console.log(totalarr[selected].coords.magnitude)
              }
            } else {
              slitdist.value(min(params[i + 1][1], 6));
            }
          });
        } else if (params[i + 1][0] == "Focal Length") {
          //handles focal length input
          let flength = createInput(params[i + 1][1]);
          styleinput(
            flength,
            windowWidth / 200,
            30 + 80 * i + 50,
            settings,
            "Focal Length: (Max 1000)",
            "30"
          );
          flength.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1]), flength.value())
              ) ||
              isCharNumber(
                findDifference(flength.value(), str(params[i + 1][1]))
              )
            ) {
              if (flength.value() == "" || int(flength.value()) == 0) {
                totalarr[selected].flength = 1;
                //totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].flength = min(int(flength.value()), 1000);
                //console.log(totalarr[selected].coords.magnitude)
              }
            } else {
              flength.value(min(params[i + 1][1], 1000));
            }
          });
        } else if (params[i + 1][0] == "Ray Density") {
          let rdensity = createInput(params[i + 1][1]);
          styleinput(
            rdensity,
            windowWidth / 200,
            30 + 80 * i + 50,
            settings,
            "Ray Density (Max 3):",
            "30"
          );
          rdensity.input(function () {
            if (
              isCharNumber(
                findDifference(str(params[i + 1][1]), rdensity.value())
              ) ||
              isCharNumber(
                findDifference(rdensity.value(), str(params[i + 1][1]))
              )
            ) {
              if (rdensity.value() == "" || float(rdensity.value()) == 0) {
                totalarr[selected].raydensity = 1;
                //totalarr[selected].setPos(int(x.value()), 0);
              } else {
                totalarr[selected].raydensity = min(rdensity.value(), 3);
                //console.log(totalarr[selected].coords.magnitude)
              }
            } else {
              rdensity.value(min(params[i + 1][1], 5));
            }
          });
        }
      }
    }
    //UIEventHandler1.createButton(settings,"Delete", "./src/icons/trash-outline.svg", false, "Delete", false, );
    if (selector == false) {
      settings.elt.classList.remove("scale-100");
      settings.elt.classList.add("scale-0");
      let deleter = select("Deleteparent");
      if (deleter != null) {
        deleter.elt.classList.remove("scale-100");
        deleter.elt.classList.add("scale-0");
      }
    } else {
      settings.elt.classList.remove("scale-0");
      settings.elt.classList.add("scale-100");
      let deleter = select("Deleteparent");
      if (deleter != null) {
        deleter.elt.classList.remove("scale-0");
        deleter.elt.classList.add("scale-100");
      }
    }
  }
}
