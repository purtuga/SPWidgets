define(['jquery'], function($){

    /**
     * An extreemly lightweight template engine for replacing
     * tokens in the form of {{name}} with values from an object
     * or a list (array) of objects
     *
     * @param {Object} tmplt
     * @param {Object} data
     *
     * @return {String} templated filled out
     *
     */
    var fillTemplate = function fillTemplate(tmplt, data) {

        var opt = {},i,j,x,y,item, tokenVal;

        // If user used an object to define input param, then parse that now
        if (typeof tmplt === "object" && arguments.length === 1) {

            data    = tmplt.data;
            tmplt   = tmplt.tmplt;

        }

        opt.response    = "";
        opt.template    = (
            typeof tmplt !== "string" ?
                String($("<div/>").append(tmplt).html()) :
                tmplt
        );
        opt.tokens      = opt.template.match(/(\{\{.*?\}\})/g);

        if (!$.isArray(data)) {

            if (!data) {

                data = [{}];

            } else {

                data = [ data ];

            }

        }

        // If we have tokens in the template, then replace them
        if (opt.tokens !== null) {

            // If data tokens were passed in on input, then use them
            // in looking for that token in the template and replacing
            // it with the value defined.
            for(x=0,y=data.length; x<y; x++){

                item = opt.template;

                for(i=0,j=opt.tokens.length; i<j; i++){

                    opt.tokens[i]   = opt.tokens[i].replace(/[\{\}]/g, "");
                    tokenVal        = data[x][ opt.tokens[i] ] || '';

                    if ($.isFunction(tokenVal)) {

                        tokenVal = tokenVal();

                    }

                    item = item.replace("{{" + opt.tokens[i] + "}}", tokenVal);

                }

                opt.response += item;

            }

        } else {

            opt.response = opt.template;

        }

        return opt.response;

    }; //end: fillTemplate()

    return fillTemplate;

});
