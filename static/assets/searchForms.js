$(document).ready(() => {
    $('#searchBy').change(function () {
        const selection = $('#searchBy').val();

        if (selection === 'price') {
            $('#model').replaceWith(inputFields.priceFields);
            $('input[type=submit]').val('Search by car price');
        } else {
            $('#to').remove();
            $('#from').replaceWith(inputFields.modelField);
            $('input[type=submit]').val('Search by car model');
        }
    });

    const inputFields = {
        priceFields: '<input type="text" name="from" id="from" placeholder="Enter starting price">\n' +
            '<input type="text" name="to" id="to" placeholder="Enter ending price">',
        modelField: '<input type="text" name="model" id="model" placeholder="Enter model">'
    }
});