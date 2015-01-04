/**
 * widget.people.demo.js
 * Code for the people picker widget.
 */
(function($){

    /* global SPWIDGET_DEMO */
    SPWIDGET_DEMO.demoInitializers.push(function(){
        var $cntr                   = $("#SPControlPickUserDemo"),
            $output                 = $cntr.find("#SPControlPickUserEventOut"),
            prePopuplatedInputDone  = false,
            knownUserString         = '';

        /**
         * Logs output to the people picker output area
         */
        function logOutput(data) {

            $output.append($("<div/>").html(data));

        }

        function initPrePopulatedInputDemo(){

            $("#spuserdemo2cntr")
                .find("input")
                    .val(knownUserString)
                    .pickSPUser({
                        type: 'All',
                        minLength: 3,
                        onPickUser: function(u){

                            logOutput("onPickUser Person added: " + u.displayName + ")");
                        }
                    })
                    .end()
                .show()
                .find(".spwidgets-demo-know-user")
                    .html(knownUserString);

        }

        // SEtup listners
        $cntr
            .on("spwidget:peoplePickerCreate", function(/*ev, $input*/){

                logOutput("spwidget:peoplePickerCreate EVENT TRIGGERED!");

            })
            .on("spwidget:peoplePickerAdd", function(ev, $input, personObj){

                logOutput(
                    "spwidget:peoplePickerAdd TRIGGERED! (Person: " +
                    personObj.displayName + ")");

            })
            .on("spwidget:peoplePickerRemove", function(ev, $input, personObj){

                logOutput(
                    "spwidget:peoplePickerRemove TRIGGERED! (Person: " +
                    personObj.displayName + ")");

            });

        // Attach widget to input.
        $("input[name='spuserdemo']").pickSPUser({
            type: 'All',
            minLength: 1,
            onPickUser: function(u){

                logOutput("onPickUser CALLED!(Person: " + u.displayName + ")");

                $("#sp_control_pick_user_detail")
                    .empty()
                    .append(
                        '<div>The following User was selected:</div>' +
                        '<div>User Name: ' + u.displayName + '</div>' +
                        '<div>Account Name: ' + u.accountName + '</div>' +
                        '<div>Account ID: ' + u.accountId + '</div>' +
                        '<div>Account Type: ' + u.accountType + '</div>'
                    );

                // If Demo 2 is not yet initiated, do it now.
                if (!prePopuplatedInputDone) {

                    prePopuplatedInputDone  = true;
                    knownUserString         = $(this).val();

                    initPrePopulatedInputDemo();

                    logOutput("NOTE: SECOND DEMO WAS INITIATED!");

                }

            },
            onCreate: function(/*$input*/) {

                logOutput("onCreate CALLED!");

            },
            onRemoveUser: function($input, $ui, person){

                logOutput("onRemoveUser CALLED! (Person: " + person.displayName + ")");

            }
        });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);
