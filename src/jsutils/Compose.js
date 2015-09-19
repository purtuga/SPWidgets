define([
    "./objectExtend",
    "./dataStore"
], function(
    objectExtend,
    dataStore
){

    /**
     * Composes new factory methods from a list of given Objects/Classes.
     *
     * @constructor Compose
     *
     * @example
     *
     * var Widget = Compose.create(Model, Events);
     *
     * myWidget = Widget.create();
     *
     */

    var
    // return all KEYs of an object, even those that are not iterable
    objectKeys  = function(prototype){
        var k, keys = [];
        for (k in prototype){
            keys.push(k);
        }
        return keys;
    },

    objectCreate    = Object.create,

    instData        = dataStore.stash,

    // Base instance methods for Compose'd object
    baseMethods = /** @lends Compose.prototype */{

        /**
         * Property indicating whether instance has been destroyed
         */
        isDestroyed: false,

        /**
         * instance initializing code
         */
        init: function(){},

        /**
         * Destroys the instance, by removing its private data.
         */
        destroy:    function(){
            var
            hasCallbacks = this.__onDestroy,
            onDestroyCallbacks;

            if (hasCallbacks) {
                onDestroyCallbacks = instData.get(hasCallbacks);

                if (Array.isArray(onDestroyCallbacks)) {
                    onDestroyCallbacks.forEach(function(callback, i){
                        if ("function" === typeof callback) {
                            callback();
                        }
                        onDestroyCallbacks[i] = null;
                    });
                }
                instData["delete"](hasCallbacks);
            }

            instData["delete"](this);
            this.isDestroyed = true;
        },

        /**
         * Adds a callback to the queue to be called when this object's `.destroy()`
         * is called.
         *
         * @param {Function} callback
         */
        onDestroy: function(callback){
            if (!this.__onDestroy) {
                this.__onDestroy = function(){};
            }
            if ("function" === typeof callback) {
                var
                key                 = this.__onDestroy,
                onDestroyCallbacks  = instData.get(key);

                if (!onDestroyCallbacks) {
                    onDestroyCallbacks = [];
                    instData.set(key, onDestroyCallbacks);
                }
                onDestroyCallbacks.push(callback);
            }
        }
    },

    staticMethods = /** @lends Compose */{

        /**
         * Creates an new factory based on the prototye of the current Factory
         * and any other Factory given on input.
         *
         * @return {Compose}
         */
        extend: function(){
            var
            args    = Array.prototype.slice.call(arguments),
            Factory = function(){};

            Factory.prototype = args.reduce(function(newProto, obj){
                if (obj) {
                    var thisObjProto = (obj.prototype || obj);
                    objectKeys(thisObjProto).forEach(function(objKey){
                        newProto[objKey] = thisObjProto[objKey];
                    });
                }
                return newProto;
            }, objectCreate(this.prototype));

            return objectExtend(Factory, this);
        },

        /**
         * Checks if the Object given on input looks like an instance of this Factory.
         *
         * @return {Boolean}
         */
        isInstanceOf: function(instanceObj){

            if (!instanceObj) {
                return false;
            }

            var neededKeys = objectKeys(this.prototype);

            // If any prototype key is not in the object prototype, then return false
            return !neededKeys.some(function(protoKey){
                return typeof instanceObj[protoKey] === "undefined";
            });

        },

        /**
         * Creates an instance object based on this factory.
         *
         * @return {Object}
         */
        create: function(){
            var instance = objectCreate(this.prototype);
            if (instance.init) {
                instance.init.apply(instance, arguments);
            }
            return instance;
        }
    },

    Compose = function(){};

    Compose.prototype = objectCreate(baseMethods);
    objectExtend(Compose, staticMethods);

    return Compose;

});