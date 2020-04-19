export default class LicensePhoto {
  front = null;
  back = null;
  constructor(front, back) {
    this.front = front;
    this.back = back;
  }

  toJson() {
    return {
      front: this.front,
      back: this.back
    }
  }
}