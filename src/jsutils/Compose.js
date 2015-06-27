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
     * @namespace Compose
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
    cache           = dataStore.stash,
    baseMethods     = {
        init:       function(){},
        destroy:    function(){
            cache.delete(this);
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
                return !instanceObj[protoKey];
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