define(function(){

    /**
     * Extends an object with the properties of another.
     *
     * @name objectExtend
     *
     * @param {Object} mergeIntoObj
     * @param {...Object} copyObj1
     *
     * @return {Object}
     */
    var objectExtend = function(mergeIntoObj) {

        var
        response    = mergeIntoObj || {},
        copyObjs    = Array.prototype.slice.call(arguments, 1),
        total       = copyObjs.length,
        i, key;
        for (i = 0; i < total; i++) {

            if (!copyObjs[i]) {
                continue;
            }

            for (key in copyObjs[i]) {
                if (copyObjs[i].hasOwnProperty(key)){
                    response[key] = copyObjs[i][key];
                }
            }

        }
        return response;
    };

    return objectExtend;

});