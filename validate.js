// Checks for the validation attributes and calls the respective validation functions.
//
// @param [DOM Object] el
window.validate = function(el) {
  if(el.attributes['required']) {
    validateRequired(el);
  }
  if(el.attributes['no-space']) {
    validateNoSpace(el);
  }
  if(el.attributes['email']) {
    validateEmail(el);
  }
}

// Validates if the field value is not set or is undefined or false
//
// @param [DOM Object] el
window.validateRequired = function(el) {
  var namespace = 'required'
  if(el.value == '' || (el.type == 'checkbox' && el.checked == false)) {
    window.showError(el, 'Field is required.', namespace);
  } else {
    window.hideError(el, namespace);
  }
}

// Validates if the field value of the element has space
//
// @param [DOM Object] el
window.validateNoSpace = function(el) {
  var namespace = 'no-space';
  if(el.value.match(/\s/)) {
    window.showError(el, 'No space allowed.', namespace);
  } else {
    window.hideError(el, namespace);
  }
}

// Validates if the email is correct
//
// @param [DOM Object] el
window.validateEmail = function(el) {
  var namespace = 'email';
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!el.value.match(re)) {
    window.showError(el, 'Email is incorrect.', namespace);
  } else {
    window.hideError(el, namespace);  
  }
}

// Shows error message.
// Appends a span with the error text to the parent of the +el+
// if the span doesn't exist.
// If the span exists, it just sets its visibility.
//
// @param [DOM Object] el
// @param [String] msg Error message
// @param [String] namespace A string representing the namespace of the error.
//               Required to make sure the ID of the appended error
//               element is unique.
window.showError = function(el, msg, namespace) {
  var id_attr = 'error' + '-' + el.name + '-' + namespace;
  var error_span = document.getElementById(id_attr);
  if(error_span) {
    error_span.style.display = 'block';
    return;
  }
  appendErrorElement(el, msg, namespace);
}

// Hides the error message.
// Checks if the error element has been appended. If it is, it hides the element.
//
// @param [DOM Object] el
// @param [String] namespace A string representing the namespace of the error.
//               Required to make sure the ID of the appended error
//               element is unique.
window.hideError = function(el, namespace) {
  var id_attr = 'error' + '-' + el.name + '-' + namespace;
  var error_span = document.getElementById(id_attr);
  if(error_span) {
    error_span.style.display = 'none';
    return;
  }
}

// Appends the error element to the parent of the +el+.
// Ideally, +el+ is the input field. If a validation fails,
// a span with error message is appended using this function.
//
// @param [DOM Object] el
// @param [String] msg
// @param [String] namespace A string representing the namespace of the error.
//               Required to make sure the ID of the appended error
//               element is unique.
window.appendErrorElement = function(el, msg, namespace) {
  var span = document.createElement('span');
  var parent = el.parentElement;
  span.innerHTML = msg;
  span.id = 'error' + '-' + el.name + '-' + namespace;
  parent.appendChild(span);
}
