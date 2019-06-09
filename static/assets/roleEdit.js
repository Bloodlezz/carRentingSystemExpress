$(document).ready(() => {
    $('input').click(function (e) {
        $(this).parent().attr('style', 'background-color:white');
        $('input').attr('disabled', true);
        const id = $(this).attr('id');
        const role = $(this).attr('value');
        const status = $(this).is(':checked') ? 'on' : 'off';

        $.ajax({
            type: 'POST',
            url: `/user/users-rights/${id}`,
            data: {role, status}
        })
            .then(() => {
                setTimeout(() => {
                    $('<div>').attr('id', 'successBox')
                        .append($('<h2>')
                            .text('Updated'))
                        .prependTo('main');

                    $(this).parent().removeAttr('style');
                    $('input').removeAttr('disabled');

                    setTimeout(() => {
                        $('#successBox').remove();
                    }, 2000)

                }, 1000)
            })
            .catch(err => {
                console.log(err);
            });
    });
});