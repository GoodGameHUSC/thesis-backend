export class Card {
  brand = null;
  id = null;
  last4 = null;
  constructor(brand, id, last4) {
    this.brand = brand;
    this.id = id;
    this.last4 = last4;
  }

  toJson() {
    return {
      brand: this.brand,
      id: this.id,
      last4: this.last4
    }
  }
}