
import PriceHelper from '../../controllers/helper/price_helper';
import TaskHelper from '../../controllers/helper/task_helper';
import Receipt from '../../definitions/sequelize/receipt';
import GeoPoint from '../../service/libs/geopoint';

export default class TaskFactory {

  /**
   * New Subscription Instance
   * @param {*} task_object 
   */
  static async createNewInstance(task_object) {
    const task = this.taskInformation(task_object);
    const receiptItems = await PriceHelper.getPriceObject({ ...task, promo_code: task_object.promo_code });
    task.receipt = new Receipt(task_object.charge_id ? task_object.charge_id : null, [], receiptItems);
    return task;
  }

  static taskInformation(task_object) {
    const create_time = Date.now();

    let resultObject = {
      customer_id: task_object.customer_id || '',
      address: task_object.address || '',
      subscription_id: task_object.subscription_id || null,
      card_id: task_object.card_id || '',
      created_at: create_time,
      schedule_at: create_time,
      receipt: task_object.receipt,
      service: task_object.service,
      notes: task_object.notes || null,
      status: 0,
      location: new GeoPoint(task_object.location._lat, task_object.location._long)
    }
    // TODO: Check it
    // if (customer.id == paymentCf.projectOwnerCustomerId) resultObject.live = 1;


    if (task_object.service == TaskHelper.FieldValue.Service.lawn) {
      resultObject = {
        ...resultObject,
        frequency: task_object.frequency,
        grass_length: task_object.grass_length,
        lawn_size: task_object.lawn_size,
        when: task_object.when,
      }


    }
    if (task_object.service == TaskHelper.FieldValue.Service.snow) {
      resultObject = {
        ...resultObject,
        service_type: task_object.service_type
      }
      if (task_object.service_type == TaskHelper.FieldValue.ServiceType.oneTime) {
        resultObject = {
          ...resultObject,
          snow_depth: task_object.snow_depth,
          driveway_size: task_object.driveway_size,
          when: task_object.when,
        }
      }
      else {
        resultObject = {
          ...resultObject,
          vip_deploy_today: task_object.vip_deploy_today,
          driveway_size: task_object.driveway_size,
        }
      }
      if (task_object.sidewalks) {
        // const sidewalks = { ...task_object.sidewalks }
        resultObject = {
          ...resultObject,
          sidewalks: task_object.sidewalks
        }
      }
    }
    if (task_object.service == TaskHelper.FieldValue.Service.leaf) {
      resultObject = {
        ...resultObject,
        amount_of_leaves: task_object.amount_of_leaves,
        remove_option: task_object.remove_option,
        leaf_size: task_object.leaf_size,
        when: task_object.when
      }
    }

    if (TaskHelper.is_FUTURE_Task(resultObject))
      resultObject = {
        ...resultObject,
        schedule_at: new Date(task_object.schedule_at),
        // status : -1 TODO: Status task = -1
      }

    return resultObject;
  }

}