export default class Reviews {

  rating = 0;
  text = "";
  tip = 0;
  created_at;

  constructor(rating, text, tip, created_at = null) {
    if (!validate(rating, text, tip, created_at))
      throw new Error("Invalid parameter")
    this.rating = rating;
    this.text = text;
    this.tip = Number.isInteger(tip) ? tip : null;
    this.created_at = created_at || new Date();
  }

}
const validate = (rating, text, tip, created_at) => {
  if (Number.isInteger(tip) && (tip < 100 || tip > 50 * 100)) return false;
  if (isNaN(rating) || rating < 0 || rating > 5) return false;
  if (typeof text != "string") return false;
  if (created_at && !(created_at instanceof Date)) return false;
  return true;
}