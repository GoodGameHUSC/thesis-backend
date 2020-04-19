
import PriceHelper from '../../controllers/helper/price_helper';
import TaskFactory from './task';

export default class SubscriptionFactory {

  /**
   * Create new subscription object
   * 
   * @param {*} task_object 
   */
  static async createNewInstance(task_object) {
    // Normally, it create by remove receipt from task object
    let subs = await TaskFactory.createNewInstance(task_object);
    subs.price = await PriceHelper.subscriptionPrice(subs);
    delete subs.receipt;
    return subs;
  }

}