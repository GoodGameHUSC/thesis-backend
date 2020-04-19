import stripe from "../plugins/stripe";

class Payment {


  static createTestToken() {
    return new Promise((res, rej) => {
      stripe.tokens.create(
        {
          card: {
            number: '4242424242424242',
            exp_month: 1,
            exp_year: 2021,
            cvc: '314',
          },
        },
        function (err, token) {
          if (err) rej(err);
          res(token);
        }
      );
    });

  }

  /**
   * Create Stripe Account With Email
   * @param {*} name 
   * @param {*} email 
   */
  static createStripeAccountWithEmail(name, email) {
    return new Promise((res, rej) => {
      const data = {
        name: name,
        email: email,
      }
      stripe.customers.create(data, function (error, customer) {
        if (customer) res(customer)
        rej(error)
      })
    })
  }

  /**
   * add Card to token
   * @param {*} token 
   * @param {*} stripe_customer_id 
   * @param {*} live 
   */
  static addCardToUser(token, stripe_customer_id) {
    return new Promise((res, rej) => {
      stripe.customers.createSource(
        stripe_customer_id,
        {
          source: token,
        },
        function (err, card) {
          if (card) res(card)
          rej(err)
        }
      );
    })
  }

  /**
   * refund card
   * @param {*} card_stripe_id 
   * @param {*} stripe_customer_id 
   * @param {*} live 
   */
  static removeCardOfUser(card_stripe_id, stripe_customer_id) {
    return new Promise((res, rej) => {
      stripe.customers.deleteSource(
        stripe_customer_id,
        card_stripe_id,
        function (err, confirmation) {
          if (confirmation) res(confirmation)
          rej(err)
        }
      );
    })
  }

  static listCardOfUser(stripe_customer_id) {
    return new Promise((res, rej) => {
      stripe.customers.listSources(
        stripe_customer_id,
        {
          object: 'card',
        },
        function (err, cards) {
          if (cards) {
            let data = cards.data.map(card => {
              return {
                id: card.id,
                brand: card.brand,
                last4: card.last4,
                name: card.name,
              }
            })
            res(data);
          } else rej(err)
        });
    });
  }

  // /**
  //  * create new Charge 
  //  * @param {*} amount 
  //  * @param {*} stripe_customer_id 
  //  * @param {*} currency 
  //  * @param {*} capture 
  //  * @param {*} description 
  //  */
  // static createCharge(amount, stripe_customer_id, currency = 'usd', capture = true, description, cardId) {
  //   return new Promise((res, rej) => {
  //     let params = {
  //       amount: amount * 100,
  //       customer: stripe_customer_id,
  //       currency: currency,
  //       capture: capture,
  //       description: description,
  //       card: cardId
  //     }
  //     stripe.charges.create(params, function (err, charge) {
  //       if (charge) res(charge);
  //       rej(err)
  //     });
  //   });
  // }

  static createChargeWithObject({ amount, stripe_customer_id, capture, description, cardId }) {
    return new Promise((res, rej) => {
      let params = {
        amount: amount,
        customer: stripe_customer_id,
        currency: 'usd',
        capture: capture,
        description: description,
        card: cardId
      }
      stripe.charges.create(params, function (err, charge) {
        if (charge) res(charge);
        rej(err)
      });
    });
  }

  // /**
  //  * refund stripe charge
  //  * @param {*} stripe_customer_id 
  //  * @param {*} charge_token 
  //  */
  static refundStripeCharge(stripe_customer_id, charge_token, amount = 0) {
    return new Promise((res, rej) => {

      let object_refund = {
        charge: charge_token,
        reason: "requested_by_customer"
      }
      if (amount) object_refund = { ...object_refund, amount }
      stripe.refunds.create(object_refund, function (err, refund) {
        if (refund) res(refund)
        rej(err)
      });
    });
  }

  // /**
  //  * Edit card
  //  * @param {*} stripe_customer_id 
  //  * @param {*} card_id 
  //  * @param {*} information 
  //  */
  // static editCard(stripe_customer_id, card_id, information) {
  //   return new Promise((res, rej) => {
  //     stripe.customers.updateSource(
  //       stripe_customer_id,
  //       card_id,
  //       information,
  //       function (err, card) {
  //         if (card) return res(card)
  //         return rej(err)
  //       }
  //     );
  //   })
  // }
}

export default Payment;