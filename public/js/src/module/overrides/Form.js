var Form = require( 'enketo-core' );
var $ = require( 'jquery' );

function FormWrapper(formSelector, data) {
    var form = new Form(formSelector, data);
    var originalInit = form.init;
    // Monkey-patching init function so we do not scroll on init
    form.init = function() {
        var $form = $( formSelector )[ 0 ];
        var originalScrollFn = $form.scrollIntoView;
        $form.scrollIntoView = function () {};
        var loadErrors = originalInit.call(form);
        $form.scrollIntoView = originalScrollFn;
        return loadErrors;
    };

    return form;
}

module.exports = FormWrapper;

