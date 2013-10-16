/**
 * widget.people.demo.js
 * Code for the people picker widget.
 */
(function(){
    
    var $cntr   = $("#SPControlPickUserDemo"),
        $output = $cntr.find("#SPControlPickUserEventOut");
    
    /**
     * Logs output to the people picker output area
     */
    function logOutput(data) {
        
        $output.append($("<div/>").html(data));
        
    }
    
    // SEtup listners
    $cntr
        .on("spwidget:peoplePickerCreate", function(ev, $input){
            
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
        },
        onCreate: function($input) {
            
            logOutput("onCreate CALLED!");
            
        },
        onRemoveUser: function($input, $ui, person){
            
            logOutput("onRemoveUser CALLED! (Person: " + person.displayName + ")");
            
        }
    });
    
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
