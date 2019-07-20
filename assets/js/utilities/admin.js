function adminSignIn(element) {
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
        url: '/admin/login',
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

function adminLogout() {
  $.ajax({
      url: '/admin/logout',
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

function showAddNewTheatre(element) {
  $('#addNewTheatre').show();
}

function showAddNewMovie(element) {
  $('#addNewMovie').show();
}

function addNewTheatre(element) {
  var name = $('#tname').val();
  var seat = $('#tseat').val();
  var cost = $('#tcost').val();
  var status = $('#tstatus').val();
  var isValid = true;

  if (name.trim() === '') {
    $('#tname').addClass('invalid');
    isValid = false;
    $('#error-msg-name').html('Please enter name.').removeClass('hide');
  }

  if (cost.trim() === '') {
    $('#tcost').addClass('invalid');
    isValid = false;
    $('#error-msg-cost').html('Please enter cost.').removeClass('hide');
  } else if (/^[-+]?\d*$/.test(cost)) {
    $('#tcost').removeClass('invalid');
    isValid = true;
    $('#error-msg-cost').html('').addClass('hide');
  } else {
    $('#tcost').addClass('invalid');
    isValid = false;
    $('#error-msg-cost').html('Please enter numeric value.').removeClass('hide');
  }

  if (seat.trim() === '') {
    $('#tseat').addClass('invalid');
    isValid = false;
    $('#error-msg-seat').html('Please enter seat.').removeClass('hide');
  } else if (/^[0-9]+$/.test(seat)) {
    $('#tseat').removeClass('invalid');
    isValid = true;
    $('#error-msg-seat').html('').addClass('hide');
  } else {
    $('#tseat').addClass('invalid');
    isValid = false;
    $('#error-msg-seat').html('Please enter integer value.').removeClass('hide');
  }

  if (isValid) {
    var data = {
      name,
      seat,
      cost,
      status
    }
    $.ajax({
        url: '/admin/add-new-theatre',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      })
      .then(function onSuccess(response) {
        $('#sign-in-block .model-success h2').html(response.message);
        $('#sign-in-block').show();
        if (response.success) {
          window.location.reload();
        }
        return;
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

$('#tname').on('input', function() {
  $('#error-msg-name').html('').addClass('hide');
  $('#tname').removeClass('invalid');
});

$('#tseat').on('input', function() {
  $('#error-msg-seat').html('').addClass('hide');
  $('#tseat').removeClass('invalid');
});

$('#tcost').on('input', function() {
  $('#error-msg-cost').html('').addClass('hide');
  $('#tcost').removeClass('invalid');
});


function addNewMovie(element) {
  var name = $('#cname').val();
  var duration = $('#cduration').val();
  var type = $('#ctype').val();
  var status = $('#cstatus').val();
  var theatreId = $('#theatre').val();
  var isValid = true;

  if (name.trim() === '') {
    $('#cname').addClass('invalid');
    isValid = false;
    $('#error-msg-name').html('Please enter name.').removeClass('hide');
  }

  if (duration.trim() === '') {
    $('#cduration').addClass('invalid');
    isValid = false;
    $('#error-msg-duration').html('Please enter duration.').removeClass('hide');
  } else if (/^[0-9]+$/.test(duration)) {
    $('#cduration').removeClass('invalid');
    isValid = true;
    $('#error-msg-duration').html('').addClass('hide');
  } else {
    $('#cduration').addClass('invalid');
    isValid = false;
    $('#error-msg-duration').html('Please enter integer value.').removeClass('hide');
  }

  if (isValid) {
    var data = {
      name,
      duration,
      type,
      status,
      theatreId
    }
    $.ajax({
        url: '/admin/add-new-movie',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      })
      .then(function onSuccess(response) {
        $('#sign-in-block .model-success h2').html(response.message);
        $('#sign-in-block').show();
        if (response.success) {
          window.location.reload();
        }
        return;
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

$('#cname').on('input', function() {
  $('#error-msg-name').html('').addClass('hide');
  $('#cname').removeClass('invalid');
});

$('#cduration').on('input', function() {
  $('#error-msg-duration').html('').addClass('hide');
  $('#cduration').removeClass('invalid');
});

function pagination(element) {
  var data = {
    'searchString': $('#search-string').val(),
    'page': Number($(element).attr('data-page'))
  };
  var url = window.location.pathname;
  var form = $('<form action="' + url + '" method="POST">' +
    '<input type="hidden" name="searchString" value="' + data.searchString + '" /><input type="hidden" name="page" value="' + data.page + '" />' +
    '</form>');

  $('body').append(form);
  form.submit();
}


function updateTheatre(element) {
  var name = $('#tname').val();
  var seat = $('#tseat').val();
  var cost = $('#tcost').val();
  var status = $('#tstatus').val();
  var id = $(element).data('id');
  var isValid = true;

  if (name.trim() === '') {
    $('#tname').addClass('invalid');
    isValid = false;
    $('#error-msg-name').html('Please enter name.').removeClass('hide');
  }

  if (cost.trim() === '') {
    $('#tcost').addClass('invalid');
    isValid = false;
    $('#error-msg-cost').html('Please enter cost.').removeClass('hide');
  } else if (/^[-+]?\d*$/.test(cost)) {
    $('#tcost').removeClass('invalid');
    isValid = true;
    $('#error-msg-cost').html('').addClass('hide');
  } else {
    $('#tcost').addClass('invalid');
    isValid = false;
    $('#error-msg-cost').html('Please enter numeric value.').removeClass('hide');
  }

  if (seat.trim() === '') {
    $('#tseat').addClass('invalid');
    isValid = false;
    $('#error-msg-seat').html('Please enter seat.').removeClass('hide');
  } else if (/^[0-9]+$/.test(seat)) {
    $('#tseat').removeClass('invalid');
    isValid = true;
    $('#error-msg-seat').html('').addClass('hide');
  } else {
    $('#tseat').addClass('invalid');
    isValid = false;
    $('#error-msg-seat').html('Please enter integer value.').removeClass('hide');
  }

  if (isValid) {
    var data = {
      name,
      seat,
      cost,
      status,
      id
    }
    $.ajax({
        url: '/admin/update-theatre-detail',
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      })
      .then(function onSuccess(response) {
        $('#sign-in-block .model-success h2').html(response.message);
        $('#sign-in-block').show();
        if (response.success) {
          window.location.reload();
        }
        return;
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

function updateCategory(element) {
  var name = $('#cname').val();
  var duration = $('#cduration').val();
  var type = $('#ctype').val();
  var status = $('#cstatus').val();
  var theatreId = $('#theatre').val();
  var id = $(element).data('id');
  var isValid = true;

  if (name.trim() === '') {
    $('#cname').addClass('invalid');
    isValid = false;
    $('#error-msg-name').html('Please enter name.').removeClass('hide');
  }

  if (duration.trim() === '') {
    $('#cduration').addClass('invalid');
    isValid = false;
    $('#error-msg-duration').html('Please enter duration.').removeClass('hide');
  } else if (/^[0-9]+$/.test(duration)) {
    $('#cduration').removeClass('invalid');
    isValid = true;
    $('#error-msg-duration').html('').addClass('hide');
  } else {
    $('#cduration').addClass('invalid');
    isValid = false;
    $('#error-msg-duration').html('Please enter integer value.').removeClass('hide');
  }

  if (isValid) {
    var data = {
      name,
      duration,
      type,
      status,
      theatreId,
      id
    }
    $.ajax({
        url: '/admin/update-category-detail',
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      })
      .then(function onSuccess(response) {
        $('#sign-in-block .model-success h2').html(response.message);
        $('#sign-in-block').show();
        if (response.success) {
          window.location.reload();
        }
        return;
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

function deleteTheatre(element) {
  var theatreId = $(element).data('id');
  var name = $(element).data('name');
  var data = {
    theatreId
  };

  if (confirm('Do you want to delete: ' + name)) {
    $.ajax({
        url: '/admin/delete-theatre',
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
      })
      .then(function onSuccess(response) {
        $('#sign-in-block .model-success h2').html(response.message);
        $('#sign-in-block').show();
        if (response.success) {
          window.location.reload();
        }
        return;
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

function deleteCategory(element) {
  var categoryId = $(element).data('id');
  var name = $(element).data('name');
  var data = {
    categoryId
  };

  if (confirm('Do you want to delete: ' + name)) {
    $.ajax({
        url: '/admin/delete-category',
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
      })
      .then(function onSuccess(response) {
        $('#sign-in-block .model-success h2').html(response.message);
        $('#sign-in-block').show();
        if (response.success) {
          window.location.reload();
        }
        return;
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
