export default class ChargeObject {

  stripe_customer_id = null;
  amount = 0;
  description = "";
  capture = false;
  cardId = null;

  constructor(stripe_customer_id, amount, description, capture, cardId) {
    this.stripe_customer_id = stripe_customer_id;
    this.amount = amount;
    this.description = description;
    this.capture = capture;
    this.cardId = cardId;
  }

  toJson() {
    return {
      stripe_customer_id: this.stripe_customer_id,
      amount: this.amount,
      description: this.description,
      capture: this.capture,
      cardId: this.cardId,
    }
  }

}