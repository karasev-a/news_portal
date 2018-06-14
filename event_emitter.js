class EventEmitter {
    constructor() {
        this._subscribers = new Object();
    }
    get subscribers(){
        return this._subscribers;
    }

    subscribe(nameSpace, callback) {
        if (!this._subscribers[nameSpace]) {
            this._subscribers[nameSpace] = [];
        }
        this._subscribers[nameSpace].push(callback);
    };

    unsubscribe(nameSpace, callback) {
        if (this._subscribers[nameSpace]) {
            let indexSub = this._subscribers[nameSpace].indexOf(callback);
            if (indexSub >= 0) {
                this._subscribers[nameSpace].splice(indexSub, 1);
            }
            //this._subscribers[key] = this._subscribers[key].filter(subscriber => subscriber !== callback);
        }
        if (this._subscribers[nameSpace].length == 0) {
            delete this._subscribers[nameSpace];
        }
    };

    publish(nameSpace, news) {
        if (this._subscribers[nameSpace]) {
            this._subscribers[nameSpace].forEach(subscriber => subscriber(nameSpace, news));
        }
    }
}

module.exports = EventEmitter;