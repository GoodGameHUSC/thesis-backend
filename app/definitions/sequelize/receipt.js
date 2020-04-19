export default class Receipt {

  authorize = "";
  charges = [];
  items = [];

  constructor(authorize = "", charges = [], items) {
    this.authorize = authorize;
    this.charges = charges || [];
    this.items = items;
  }

}