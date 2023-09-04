class Sun {
  constructor(w, raydensity, angle, ID, wavelength, display) {
    let poscoord = new Polar(width * 1.5, angle);
    this.pos = p5.Vector.add(
      poscoord.convertCartesian(),
      createVector(width / 2, height / 2)
    ); //out of canvas, rotating ard point
    this.width = w;
    this.coords = new Polar(w / 2, angle + 90); //width of the ray
    this.normallen = w / 5;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "Sun";
    this.componentID = ID;
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
    this.wavelength = wavelength;
    this.vertices = [this.start];
    this.raydensity = raydensity;
    this.rays = [];
    this.maxID = 0;
    this.displayer = display;
    this.rgb = wavelengthToColor(wavelength)[0];

    //draggable functionality
    this.dragged = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.minimumWidth = 10;
    this.minimumHeight = 10;
    this.selected = false;

    this.displayvertices = [];
    let offsetcoord1 = new Polar(height / 2, this.coords.theta);
    let offsetvector1 = offsetcoord1.convertCartesian();
    let offsetcoord2 = new Polar(height / 3, this.coords.theta);
    let offsetvector2 = offsetcoord2.convertCartesian();
    this.middle = createVector(width / 2, height / 2);
    let middle1 = p5.Vector.add(this.middle, this.coords.convertCartesian());
    let middle2 = p5.Vector.sub(this.middle, this.coords.convertCartesian());
    let extrapt1 = p5.Vector.add(middle1, offsetvector1);
    let extrapt2 = p5.Vector.add(middle1, offsetvector2);
    let extrapt3 = p5.Vector.add(middle2, offsetvector2);
    let extrapt4 = p5.Vector.add(middle2, offsetvector1);
    this.displayvertices = [extrapt1, extrapt2, extrapt3, extrapt4];
  }
  generateRays(componentarr) {
    this.maxID = 0;
    this.updateCoords();
    this.update();
    this.rays = [];
    this.raydensity = min(this.raydensity, 3);
    let rayspacedist = 10 / this.raydensity;
    this.width = this.coords.magnitude * 2;
    for (let i = 0; i < this.width; i += rayspacedist) {
      let offset = new Polar(i, this.coords.theta);
      this.rays.push(
        new Ray(
          p5.Vector.add(offset.convertCartesian(), this.start),
          this.coords.theta - 90,
          250,
          this.componentID + (this.maxID + 1),
          this.wavelength,
          this.displayer
        )
      );
      this.rays[this.rays.length - 1].generate(componentarr);
      this.rays[this.rays.length - 1].display(this.displayer);
      this.maxID += 1;
    }
  }
  updateCoords() {
    let poscoord = new Polar(width * 1.5, this.coords.theta + 90);
    this.pos = p5.Vector.add(poscoord.convertCartesian(), this.middle); //out of canvas, rotating ard point
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    let offsetcoord1 = new Polar(height / 1.75, this.coords.theta + 90);
    let offsetvector1 = offsetcoord1.convertCartesian();
    let offsetcoord2 = new Polar(height / 2.5, this.coords.theta + 90);
    let offsetvector2 = offsetcoord2.convertCartesian();

    let middle1 = p5.Vector.add(this.middle, this.coords.convertCartesian());
    let middle2 = p5.Vector.sub(this.middle, this.coords.convertCartesian());
    let extrapt1 = p5.Vector.add(middle1, offsetvector1);
    let extrapt2 = p5.Vector.add(middle1, offsetvector2);
    let extrapt3 = p5.Vector.add(middle2, offsetvector2);
    let extrapt4 = p5.Vector.add(middle2, offsetvector1);
    this.displayvertices = [extrapt1, extrapt2, extrapt3, extrapt4];
  }
  displayIntersects() {}
  clicked() {
    //if mouse over resize buttons
    //(...)
    this.dragged = true;
    this.offsetX = this.pos.x - mouseX;
    this.offsetY = this.pos.y - mouseY;
  }
  released() {
    this.dragged = false;
  }

  update() {
    //dragging functionality
    if (this.dragged) {
      this.setPos(mouseX + this.offsetX, mouseY + this.offsetY);
    }

    //visuals
    if (this.selected) {
      this.displaySelect(this.displayer);
      //this.display(this.displayer);
    }
  }

  setPos(x, y) {
    let vector_x = x - this.pos.x;
    let vector_y = y - this.pos.y;
    this.middle = p5.Vector.sub(
      this.middle,
      createVector(-vector_x, -vector_y)
    );
    for (let index = 0; index < this.displayvertices.length; index++) {
      let vertex = this.vertices[index];

      this.displayvertices[index].x += vector_x;
      this.displayvertices[index].y += vector_y;
    }

    this.pos.x += vector_x;
    this.pos.y += vector_y;
    this.updateCoords();
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  displaySelect(canvas) {
    this.displayer.fill(100, 100, 100, 100);
    //avg -> middle of shape
    let centre = findCentre(this.displayvertices);
    this.displayer.stroke(100);
    this.displayer.circle(centre.x, centre.y, 10);
    this.displayer.stroke(0);
    //this.displayer.fill('white');
    canvas.stroke(0);
    //canvas.fill(200,200,200,100);
    canvas.push();

    canvas.beginShape();
    for (let i = 0; i < this.displayvertices.length; i++) {
      let pointer = this.displayvertices[i];
      canvas.vertex(pointer.x, pointer.y);
    }
    canvas.endShape(CLOSE);
    canvas.pop();
    canvas.fill("white");
  }
  setRotation(rotation) {
    this.coords.theta = rotation;
    this.updateCoords();
  }
  display(canvas) {
    //canvas.pop();
    this.update();
  } //empty bc sun is not displayed
}
function findCentre(vertices) {
  let centreX = 0,
    centreY = 0;
  for (let i = 0; i < vertices.length; i++) {
    centreX += vertices[i].x;
    centreY += vertices[i].y;
  }

  return createVector(centreX / vertices.length, centreY / vertices.length);
}
