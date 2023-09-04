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