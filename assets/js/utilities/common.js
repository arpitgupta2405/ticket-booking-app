// ####################### LOGIN FUNCTION STARTS ########################//

function signIn(element) {
  var userEmail = $('#email').val();
  var password = $('#password').val();
  var isValid = true;

  if (userEmail.trim() === '') {
    $('#email').addClass('invalid');
    isValid = false;
    $('#error-msg-email').html('Please enter email id.').removeClass('hide');
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(userEmail)) {
    isValid = true;
    $('#error-msg-email').html('').addClass('hide');
    $('#email').removeClass('invalid');
  } else {
    isValid = false;
    $('#email').addClass('invalid');
    $('#error-msg-email').html('Please enter valid email id.').removeClass('hide');
  }

  if (password.trim() === '') {
    $('#password').addClass('invalid');
    isValid = false;
    $('#error-msg-password').html('Please enter password.').removeClass('hide');
  } else {
    isValid = true;
    $('#error-msg-password').html('').addClass('hide');
    $('#password').removeClass('invalid');
  }

  if (isValid) {
    var data = {
      userEmail: userEmail,
      password: password
    };
    $.ajax({
        url: '/user/login',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      })
      .then(function onSuccess(response) {
        if (response.success) {
          window.location.href = response.redirectPath;
        } else {
          $('#sign-in-block .model-success h2').html(response.message);
          $('#sign-in-block').show();
          return;
        }
      })
      .fail(function onFailure(response) {
        var error;
        var message;

        error = response.responseJSON;
        message = error ? error.message : 'Internal error. Please try again.';
        $('#sign-in-block .model-success h2').html(message);
        $('#sign-in-block').show();
        return;
      });
  }
}

$('#email').on('input', function() {
  $('#error-msg-email').html('').addClass('hide');
  $('#email').removeClass('invalid');
});

$('#password').on('input', function() {
  $('#error-msg-password').html('').addClass('hide');
  $('#password').removeClass('invalid');
});


// ####################### LOGIN FUNCTION END ########################//

// ####################### SIGN UP FUNCTION STARTS ########################//


function signUp(element) {
  var userEmail = $('#femail').val();
  var password = $('#fpassword').val();
  var userName = $('#fname').val();
  var isValid = true;

  if (userName.trim() === '') {
    $('#fname').addClass('invalid');
    $('#error-msg-fname').html('Please enter your name.').removeClass('hide');
    isValid = false;
  } else {
    if (/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(userName)) {
      $('#fname').removeClass('invalid');
      $('#error-msg-fname').hide();
      isValid = true;
    } else {
      $('#fname').addClass('invalid');
      $('#error-msg-fname').html('Please enter only characters and number').removeClass('hide');
      isValid = false;
    }
  }

  if (userEmail.trim() === '') {
    $('#femail').addClass('invalid');
    isValid = false;
    $('#error-msg-femail').html('Please enter email id.').removeClass('hide');
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(userEmail)) {
    isValid = true;
    $('#error-msg-femail').html('').addClass('hide');
    $('#femail').removeClass('invalid');
  } else {
    isValid = false;
    $('#femail').addClass('invalid');
    $('#error-msg-femail').html('Please enter valid email id.').removeClass('hide');
  }

  if (password.trim() === '') {
    $('#fpassword').addClass('invalid');
    isValid = false;
    $('#error-msg-fpassword').html('Please enter password.').removeClass('hide');
  } else if (password.length < 6) {
    $('#fpassword').addClass('invalid');
    isValid = false;
    $('#error-msg-fpassword').html('Password must be of minimum 6 characters.').removeClass('hide');
  } else {
    isValid = true;
    $('#error-msg-fpassword').html('').addClass('hide');
    $('#fpassword').removeClass('invalid');
  }

  if (isValid) {
    var data = {
      userEmail: userEmail,
      password: password,
      userName: userName
    };
    $.ajax({
        url: '/user/signup',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      })
      .then(function onSuccess(response) {
        if (response.success) {
          window.location.href = response.redirectPath;
        } else {
          $('#sign-up-block .model-success h2').html(response.message);
          $('#sign-up-block').show();
          return;
        }
      })
      .fail(function onFailure(response) {
        var error;
        var message;

        error = response.responseJSON;
        message = error ? error.message : 'Internal error. Please try again.';
        $('#sign-up-block .model-success h2').html(message);
        $('#sign-up-block').show();
        return;
      });
  }
}

$('#fname').on('input', function() {
  $('#error-msg-fname').html('').addClass('hide');
  $('#fname').removeClass('invalid');
});

$('#femail').on('input', function() {
  $('#error-msg-femail').html('').addClass('hide');
  $('#femail').removeClass('invalid');
});

$('#fpassword').on('input', function() {
  $('#error-msg-fpassword').html('').addClass('hide');
  $('#fpassword').removeClass('invalid');
});


// ####################### SIGN UP FUNCTION END ########################//

// ####################### LOGOUT FUNCTION START ########################//

function logout() {
  $.ajax({
      url: '/user/logout',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: {}
    })
    .then(function onSuccess(response) {
      if (response.success) {
        window.location.href = response.redirectPath;
      }
    })
    .fail(function onFailure(response) {
      return;
    });
}

// ####################### LOGOUT FUNCTION END ########################//

$(document).on('change', '#type', function() {
  var type = $('#type').val();

  if (typeof type === 'undefined') {
    $('#categorySection').hide();
    return;
  }

  $.ajax({
      url: '/get-category-by-type',
      // method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: {
        type
      }
    })
    .then(function onSuccess(html) {
      $('#categorySection').html(html).show();
    })
    .fail(function onFailure(response) {
      return;
    });
});

$(document).on('change', '#categories', function() {
  var categoryId = $('#categories').val();

  if (typeof categoryId === 'undefined') {
    $('#categoryDetail').hide();
    return;
  }

  $.ajax({
      url: '/get-category-details',
      // method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: {
        categoryId
      }
    })
    .then(function onSuccess(html) {
      $('#categoryDetail').html(html).show();
    })
    .fail(function onFailure(response) {
      return;
    });
});

function checkAndGetCost(element) {
  var theatreId = $('#theatre').data('id');
  var numOfSeats = $('#seatsToBeBooked').val();
  var show = $('input[name=showTimings]:checked').val();
  var isValid = true;

  if (typeof show === 'undefined' || !show) {
    isValid = false;
    $('#confirmation-block .model-success h2').html('Please select the show timing');
    $('#confirmation-block').show();
  }

  if (show === "9:00 AM") {
    show = "9";
  }
  if (show === "01:00 PM") {
    show = "13";
  }
  if (show === "05:00 PM") {
    show = "17";
  }
  if (show === "9:00 PM") {
    show = "21";
  }

  if (typeof numOfSeats === 'undefined' || !numOfSeats || numOfSeats < 1) {
    isValid = false;
    $('#confirmation-block .model-success h2').html('Type in number of seats');
    $('#confirmation-block').show();
  }

  if (isValid) {
    var data = {
      theatreId: theatreId,
      numOfSeats: numOfSeats,
      show: show
    };
    $.ajax({
        url: '/check-availability',
        contentType: 'application/json; charset=utf-8',
        data: data
      })
      .then(function onSuccess(html) {
        $('#confirmation').html(html).show();
      })
      .fail(function onFailure(response) {
        return;
      });
  }
}

function confirmBooking(elemet) {
  var type = $('#type').val();
  var categoryId = $('#categories').val();
  var theatreId = $('#theatre').data('id');
  var numOfSeats = $('#numOfSeats').data('numoftickets');
  var show = $('#showTime').data('showtime');
  var totalCost = $('#totalCost').data('totalcost');

  if (show === "9:00 AM") {
    show = "9";
  }
  if (show === "01:00 PM") {
    show = "13";
  }
  if (show === "05:00 PM") {
    show = "17";
  }
  if (show === "9:00 PM") {
    show = "21";
  }

  var data = {
    type: type,
    categoryId: categoryId,
    theatreId: theatreId,
    numOfSeats: numOfSeats,
    show: show,
    totalCost: totalCost
  }

  $.ajax({
      url: '/book-ticket',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data)
    })
    .then(function onSuccess(response) {
      $('#confirm .model-success h2').html(response.message);
      $('#confirm').show();
    })
    .fail(function onFailure(response) {
      var error;
      var message;

      error = response.responseJSON;
      message = error ? error.message : 'Internal error. Please try again.';
      $('#confirm .model-success h2').html(message);
      $('#confirm').show();
      return;
    });
}
