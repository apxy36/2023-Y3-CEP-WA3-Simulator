class Refractor extends Reflector {
  constructor(pos, w, angle, ID, t, rindex, rcoeffs, display) {
    super(pos, w, angle, ID);
    this.thickness = t;
    this.coords = new Polar(w / 2, angle);
    this.normallen = w / 4;
    this.start = p5.Vector.sub(this.pos, this.coords.convertCartesian());
    this.end = p5.Vector.add(this.coords.convertCartesian(), this.pos);
    this.type = "refractor";
    this.componentID = ID;
    this.intersectpts = [];
    this.intersectedges = [];
    this.intersectIDs = []; //stores unique IDs of ray that intersect with it
    this.displayer = display;

    this.vertices = [this.start, this.end];
    this.displayvertices = [this.start, this.end];
    let offsetcoord = new Polar(this.thickness, this.coords.theta + 90);
    let offsetvector = offsetcoord.convertCartesian();
    let extrapt1 = p5.Vector.add(this.start, offsetvector);
    let extrapt2 = p5.Vector.add(this.end, offsetvector);
    //let points = [extrapt2, extrapt1, this.start, this.end];
    //let index = this.vertices.indexOf(extrapt1);
    //console.log(index)
    this.displayvertices.push(extrapt2);
    this.displayvertices.push(extrapt1);

    this.refractiveindex = rindex;
    this.rcoeffs = rcoeffs; // B:[] C:[] refractive coeffs for sellmeier eqn
  }
  ricalc(wavelength){//three term approximation
    wavelength = wavelength / 1000; //convert to micrometers
    //this.rcoeffs = [[1.03961212, 0.231792344, 	1.01046945], [6.00069867 / 1000, 2.00179144 / 100, 	1.03560653 / 100]];
    return ((1+(this.rcoeffs[0][0]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][0]) + (this.rcoeffs[0][1]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][1]) + (this.rcoeffs[0][2]  * wavelength**2) / (wavelength**2 - this.rcoeffs[1][2])) / wavelength
           )**0.5
  }
}