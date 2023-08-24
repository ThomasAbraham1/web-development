exports.getDate = function(){ // exports.getDate makes getDate exportable and able to be used in other js
    const today = new Date();
    const options = {
        weekday : 'long',
        day : 'numeric',
        month : 'long',
    }
    return today.toLocaleDateString('en-US',options);
};