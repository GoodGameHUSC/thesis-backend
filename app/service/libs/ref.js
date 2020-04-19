export default class DBRef {
  nodeName = null;

  /**
   * Constructor
   * @param {*} nodeName 
   */
  constructor(nodeName) {
    if (!nodeName) throw new Error("Unable create node without name")
    this.nodeName = nodeName;
  }

  onValue() {
    return this.nodeName + '.value';
  }

  onUpdate() {
    return this.nodeName + '.update';
  }

  onAdd() {
    return this.nodeName + '.add';
  }

  onRemove() {
    return this.nodeName + '.remove';
  }

  onAll() {
    return this.nodeName + '.*';
  }

  child() {
    this.nodeName += '/*';
    return this;
  }

  ref() {
    return this.nodeName;
  }

  id(id) {
    this.nodeName += `/${id}`
    return this;
  }
}