export class Events {
  static events: any = {};

  /**
   * Subsribes to event name and performes callback whenever a notification for this event happens
   * @param {string} event - event name
   * @param {fn} callback - the callback function
   * @return {number} subscriptions - number of total subscriptions
   */
  static subscribe(event: string, callback: () => void) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }

    return this.events[event].push(callback);
  }

  /**
   * Notifies all subscribers for a given event and passes data to the callbacks
   * @param {string} event - Name of the event
   * @param {Object} data - Data that will be passed to the callback function
   * @return any todo
   */
  static notify(event: string, data: any = {}) {
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }

    return this.events[event].map((callback: ({}) => void) => callback(data));
  }
}
