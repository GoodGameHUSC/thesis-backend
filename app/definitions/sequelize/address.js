export class Address {

  id = null;
  location = null;
  address = null;
  phone = null;
  additional_info = null;

  constructor(id, location, address, phone, additional_info) {
    this.id = id;
    this.location = location;
    this.address = address;
    this.phone = phone;
    this.additional_info = additional_info;
  }

  toJson() {
    return {
      id: this.id,
      location: this.location,
      address: this.address,
      phone: this.phone,
      additional_info: this.additional_info
    }
  }
}