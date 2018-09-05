
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    //var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    // var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');

    // show alert
    function addMessage(msg, type) {
        var element;
        switch(type) {
            case 'success':
                element = "<div id='success-msg' class='alert alert-primary' style='display: none;'><i class='fa fa-check-circle fa-fw'></i>" 
                            + msg 
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
                break;
            case 'error':
                element = "<div id='success-msg' class='alert alert-danger' style='display: none;'><i class='fa fa-info-circle fa-fw'></i>" 
                            + msg 
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
                break;
        }
        $('#success-panel').html('');
        $(element).appendTo('#success-panel').show('slow');
    }

    $('.validate-form').on('submit',function(e){
        e.preventDefault();
        var check = true;

        // if($(name).val().trim() == ''){
        //     showValidate(name);
        //     check=false;
        // }

        // if($(subject).val().trim() == ''){
        //     showValidate(subject);
        //     check=false;
        // }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        //return check;
        if(check) {
            var formData = {
                'email': $('input[name=email]').val(),
                'message': $('textarea[name=message]').val()
            };
            $.ajax({
                type: 'POST',
                url: 'api/submit-form.php',
                data: formData,
                dataType: 'json',
                success: function(success) {
                    var result = success.result;
                    if(result == 'success')
                        addMessage('Sent successfully', 'success');
                    else 
                        addMessage('Failed to sent', 'error');
                }
            });
        }
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);