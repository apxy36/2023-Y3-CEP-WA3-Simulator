
//import { IoIosFlashlight} from "react-icons/io";
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
  bodyDataInputEditing(input, property) {
  }
  //
  //<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//   <path d="M15 3.75H9v16.5h6V3.75zM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5zM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 01-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875z"></path>
// </svg>
  displayleftinputbar() {
    this.mainleftinputbar.class("fixed top-0 left-0 h-screen w-16 m-0 flex flex-col shadow-lg items-center bg-primary text-white-shadow");
    // let b1 = createElement("i");
    // b1.value("123");
    // b1.parent(this.leftinputbar);
    this.leftinputbar.class("fixed top-0 left-0 h-56 w-16 m-0 flex flex-col shadow-lg items-center bg-primary text-white-shadow");
    this.createButton(this.leftinputbar, "sources" ,"/src/icons/flashlight-outline.svg", true, "Add Light Sources", true, [["Normal_Light", "Flashlight", "Laser", "Sun"], ["/src/icons/light-bulb.svg", "/src/icons/flashlight-outline.svg", "/src/icons/laser-blast.svg", "/src/icons/sunny-outline.svg"], [true, true, false, true]]);
    this.createButton(this.leftinputbar, "reflectors", "/src/icons/mirror-mirror.svg", false, "Add Reflectors etc.", true, [["Mirror", "Refractor", "Prism", "Grating" , "Converging_Lens", "Diverging_Lens"], ["/src/icons/mirror-mirror.svg", "/src/icons/refractor.svg", "/src/icons/prism-outline.svg", "/src/icons/grating.svg", "/src/icons/clens.svg", "/src/icons/dlens.svg"], [false, true, true, true, true, true, true]]);
    this.createButton(this.leftinputbar, "presets", "/src/icons/presets.svg", true, "Use Presets",  true, [["Light source and lens", "Sun and lens", "Astronomical Telescope", "Rainbow Prism", "Diffraction Grating"], ["/src/icons/image+lens-preset.svg", "/src/icons/sun+lens-preset.svg", "/src/icons/telescope-preset.svg", "/src/icons/rainbow-preset.svg", "/src/icons/diffraction-preset.svg"], [true, false, true, true, true]]);
    this.createButton(this.leftinputbar, "help", "/src/icons/help-circle-outline.svg", true, "Need Help?", false);
  }
  displayDeleted(div){
    let deleter = select("#Deleteparent");
    if (deleter != null){
      deleter.remove();
    }
    this.createButton(this.leftinputbar, "Delete", "/src/icons/trash-outline.svg", false, "Delete", false);
    this.toggleDeleted(false);
  }
  toggleDeleted(bool){
    console.log(this.buttons[this.buttonIDs.indexOf("Delete")].elt.scale);
    if (bool){
      //appear
      this.buttons[this.buttonIDs.indexOf("Delete")].elt.classList.remove("scale-0");
      this.buttons[this.buttonIDs.indexOf("Delete")].elt.classList.add("scale-100");
    } else {
      //disappear
      this.buttons[this.buttonIDs.indexOf("Delete")].elt.classList.remove("scale-100");
      this.buttons[this.buttonIDs.indexOf("Delete")].elt.classList.add("scale-0");
    }
  }
  createButton(parent, id, icon, invert, label, expandable, secondbardata) {
    if (id == "Delete"){  //parentimg is the problem -> keeps spawining new buttons
      for (let i = 0; i < this.buttonIDs.length; i++){
        if (this.buttonIDs[i] == "Delete"){
          let parentbutton = this.buttonparents[i].id();
          let deleter = select("#Deleteparent");
          if (deleter != null){
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
    parentimg.class('flex group hover:scale-110 transition-all duration-300 ease-linear');
    let buttonimg = createImg(icon, "");
    buttonimg.parent(parentimg);
    
    
    if (invert){
      buttonimg.class("relative flex items-center filter invert justify-center bg-invertedquartenary w-12 h-12  mt-2 mb-2 mx-auto rounded-full shadow-lg cursor-pointer hover:bg-invertedindigo hover:rounded-xl text-neutral-50 focus:bg-gray-200 focus:outline-none transition-all duration-300 ease-linear");
    } else {
      buttonimg.class("relative flex items-center justify-center w-12 h-12 mt-2 mb-2 mx-auto bg-quartenary rounded-full shadow-lg cursor-pointer hover:bg-indigo-600 hover:rounded-xl text-neutral-50 focus:bg-gray-200 focus:outline-none transition-all duration-300 ease-linear");
    }
    if (id == "Delete"){
      parentimg.class("flex flex-col group hover:scale-110 transition-all duration-300 ease-linear h-12 bottom-0 w-full");
      buttonimg.class("b-0 relative flex items-center justify-center w-24 h-12  mt-2 mb-2 mx-auto bg-rose-600 rounded-full shadow-lg cursor-pointer hover:bg-indigo-600 hover:rounded-xl text-neutral-50 focus:bg-gray-200 focus:outline-none transition-all duration-300 ease-linear")
      //console.log(this.buttonIDs)
      parentimg.position(0, height-84);
    }
    //buttonimg.elt.classList.add("bg-primary");
    buttonimg.id(id);
    this.buttonIDs.push(id);
    this.buttons.push(buttonimg);
      //labeldiv.class('left-14 text-white invert-0')
    if (label != null){
      
      let labeldiv = createDiv(label);
    //labeldiv.position(56, 0);
    labeldiv.class("absolute w-auto p-2 t-0 invert-0 m-2 min-w-max left-14 rounded-md shadow-md text-neutral-50 bg-gray-800 text-xs text-bold transition-all duration-100 ease-linear origin-left scale-0 group-hover:scale-100");
    labeldiv.id(id + "label");
    labeldiv.parent(parentimg);
    if (label == "Need Help?"){
      labeldiv.class("absolute w-auto p-2 t-0 invert-0 m-2 min-w-max left-14 rounded-md shadow-md text-neutral-50 bg-gray-800 text-md font-bold transition-all duration-100 ease-linear origin-left scale-0 group-hover:scale-100");
      let sublabeldiv = createElement("ul");
      sublabeldiv.parent(labeldiv);
      sublabeldiv.class("list-disc list-inside text-xs font-normal");
      let help1 = createElement("li");
      help1.html("Maybe you could try adding more objects from the left sidebar and dragging them in the way of light rays in the play area...");
      help1.parent(sublabeldiv);
      let help2 = createElement("li");
      help2.html("You can also change the properties of objects by clicking on them and editing the values in the settings bar on the right.");
      help2.parent(sublabeldiv);
      let help3 = createElement("li");
      help3.html("You can also delete objects by clicking on the bin icon at the bottom of the left sidebar.");
      help3.parent(sublabeldiv);
      let help4 = createElement("li");
      help4.html("You can also use presets by clicking on the presets icon in the left sidebar.");
      help4.parent(sublabeldiv);
      let help5 = createElement("li");
      help5.html("Have fun!");
      help5.parent(sublabeldiv);
    }
    }
    if (expandable){
      this.createSecondInputBar(secondbardata[0], secondbardata[1], secondbardata[2], parentimg);
    }
    return buttonimg;
  }
  spawnObjects(selected, id){
    //console.log(selected);
    let component;
    let position = createVector(width/2 + random(-100,100), height/2 + random(-100,100));
    if (selected == "Laser" || selected == "Flashlight" || selected == "Normal_Light" || selected == "Sun"){
      if (selected == "Laser"){
        component = new Laser(position, 20, 0, id, 8, this.displayer);
      } else if (selected == "Flashlight"){
        component = new Flashlight(position, 20, 2, 0, id, 600, this.displayer);
      } else if (selected == "Normal_Light"){
        component = new NormalLight(position, 20, 0, id, 600, this.displayer);
      } else if (selected == "Sun"){
        component = new Sun(100, 1, 0, id, 600, this.displayer);
      } 
    } else {
      if (selected == "Mirror"){
        component = new Reflector(position, 50, 0, id, this.displayer);
      } else if (selected == "Refractor"){
        component = new Refractor(position, 50, 0, id, 50, 1.5,[[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]] ,this.displayer);
      } else if (selected == "Prism"){
        component = new Prism(position, 50, 0, id, [createVector(0,0), createVector(100,0), createVector(40, -50)], 1.5,[[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]] ,this.displayer);
      } else if (selected == "Grating"){
        component = new DiffractionGrating(position, 50, 0, id, 2.2,3 ,this.displayer);
      } else if (selected == "Converging_Lens"){
        component = new ConvergingLens(position, 50, 0, id, 150,this.displayer);
      } else if (selected == "Diverging_Lens"){
        component = new DivergingLens(position, 50, 0, id, 150,this.displayer);
      }

      }
      this.maxid += 1;
      return component;
  }
  createSecondInputBar(buttonsnames, icons, inversions, parent){
    let mainsecondinputbar = createDiv();
    mainsecondinputbar.id("mainsecondinputbar");
    mainsecondinputbar.parent(parent);
    mainsecondinputbar.class(" rounded-md fixed top-2 left-14 h-96 w-16 m-0 flex flex-col shadow-lg items-center bg-tertiary text-white-shadow group-hover:scale-100 scale-0 transition-all duration-300 ease-linear");
    let secondinputbar = createDiv();
    secondinputbar.class("rounded-md fixed top-0 left-0 h-56 m-0 w-16 flex flex-col shadow-lg items-center bg-tertiary text-white-shadow");
    secondinputbar.parent(mainsecondinputbar);
    for (let i = 0; i < buttonsnames.length; i++){
      let buttonname = buttonsnames[i];
      this.createButton(secondinputbar, buttonname, icons[i], inversions[i], buttonname, false);
    }
    //this.updateButtons(buttonsnames);
    

  }
  updateButtons(buttonsnames){ //for loop should be sorted out-> works when divelement is only one button eg laser
    // for (let i = 0; i < buttonsnames.length; i++){
    //   //console.log(str("#" +buttonsnames[i]))
    //   let buttonname = buttonsnames[i];
    //   let divelement = select(str("#" + buttonname));
    //   //console.log(divelement)
    // divelement.mousePressed(
    //   console.log(334)
    // );
    // }
    // //console.log(this.tarr);
    // for (let i = 0; i < this.tarr.length; i++){}

    // let divelement = select(str("#Laser")); //wat is going on
    //   //console.log(divelement)
    // divelement.mousePressed(
    //   console.log(334)
    // );
    // return [this.tarr, this.carr];
  }
  spawnPresets(preset){
    let output = [];
    if (preset == "Light source and lens"){
      let light = new Flashlight(createVector(300,350), 40, 1.5,100, 0, 500, this.displayer);
      let lens = new ConvergingLens(createVector(750,450),500,90, 1, 200, this.displayer);
      output = [[light, lens], 2]; //maxid
    } else if (preset == "Sun and lens"){
      let sun = new Sun(200, 1.5, 20, 0, 600, this.displayer);
      let lens = new ConvergingLens(createVector(750,450),500,90, 1, 200, this.displayer);
      output = [[sun, lens], 2]; //maxid
    } else if (preset == "Astronomical Telescope"){
      let sun = new Sun(200, 1.5, 15, 0, 600, this.displayer);
      let lens1 = new ConvergingLens(createVector(450,450),500,90, 1, 350, this.displayer);
      let lens2 = new ConvergingLens(createVector(950,450),500,90, 2, 150, this.displayer);
      output = [[sun, lens1, lens2], 3]; //maxid
    } else if (preset == "Rainbow Prism"){
      let source = new Laser( createVector(200,500),30, 90,  0, 10, this.displayer);
      let prism = new Prism(createVector(330,510),50,0, 1, [createVector(0,0), createVector(100,0), createVector(60, -50)], 2, [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]], this.displayer);
      output = [[source, prism], 2]; //maxid
    } else if (preset == "Diffraction Grating"){
      let source = new NormalLight(createVector(200,400), 40, 90, 0, 600, this.displayer);
      let grating = new DiffractionGrating(createVector(400,400),100 , 90, 1,2.2, 3, this.displayer);
      output = [[source, grating], 2]; //maxid
    }
    this.maxid = output[output.length-1];
    return output;
  }
  

  

  
  

}
