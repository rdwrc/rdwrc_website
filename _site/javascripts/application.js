$(function () {
  // see https://gist.github.com/pinchyfingers/2414459
  sidebarwidth = $(".sidebar-width").css('width');
  bodypaddingtop = $(".navbar-fixed-top").css('height');
  sidebarheight = $("body").css('height');
  $('.sidebar-nav-fixed').css('width', sidebarwidth);
  $('.sidebar-nav-fixed').css('height', sidebarheight);
  $('body').css('paddingTop', bodypaddingtop)
  contentmargin = parseInt(sidebarwidth)
  $('.span-fixed-sidebar').css('marginLeft', contentmargin);
  $('.span-fixed-sidebar').css('paddingLeft', 60);

  if (getURLPath().match(/manage_users/)) {
    $('ul.navbar-nav li').removeClass('active');

    anchor = $('ul.navbar-nav li').has('a[href="'+(getURLPath()+'.html')+'"]');
    $(anchor).addClass('active');
  }
  else if (getURLPath().match(/index/) || getURLPath() == '') {
    $('#index_nav_link').addClass('active');
  }
  else if (getURLPath().match(/calendar/)) {
    $('#calendar_nav_link').addClass('active');
  }
  else if (getURLPath().match(/past_events/)) {
    $('#past_events_nav_link').addClass('active');
  }
  else if (getURLPath().match(/contact/)) {
    $('#contact_nav_link').addClass('active');
  }

  $('.navbar-form').submit(function(e) {
    e.preventDefault();
    show_search_results();
    return false;
  });
});

/* see http://www.texodigital.com/blog/JavaScript/javascript-url-parameters
* @param    string    parameter to return the value of.
* @return   string    value of chosen parameter, if found.
*/
function getURLParameter(name) {
  // Globally replace illegal chars.
  var nameLowerCase = name.replace(/\?/ig, "").replace(/=/ig, "");

  // Get the URL.
  var url = window.location.href;

  // Split by "param=value".
  var parameters = url.substring(url.indexOf("?") + 1).split("&");

  // Array to store individual values.
  var params = [];

  for(var i = 0; i < parameters.length; i++) {
    if (parameters[i].search(nameLowerCase + "=") != -1) {
      return parameters[i].substring(parameters[i].indexOf("=") + 1).split("+");
    }
  }

  return null;
}

function getURLPath() {
  return window.location.pathname.replace('/', '').replace(/\.html$/, '');
}

function login(event) {
  event.preventDefault();
  if ($('#username').val().match(/admin/)) {
    window.location = 'admin.html';
  } else if ($('#username').val().match(/editor/)) {
    window.location = 'editor.html';
  } else if ($('#username').val().match(/author/)) {
    window.location = 'author.html';
  } else {
    window.location = 'index.html';
  }
  return falss;
}

// Load scripts asynchronously
//  NOTE: Don't use $.getScript since it disables caching
function loadJavascriptAsync(url, callback) {
  $.getScript((document.location.protocol == 'https:' ? 'https:' : 'http:') + '//' + url, callback);
}

/*
  see https://developers.google.com/custom-search/
  see https://developers.google.com/custom-search/docs/element
  see https://developers.google.com/custom-search/docs/js/cselement-reference
  see https://www.google.com/cse/create/getcode?cx=017719576301278948167%3Abmktl2iol5o
*/

function show_search_results() {
  var queryStr = $('.navbar-form .form-control').first().val();
  if (queryStr.length > 0) {
    google.search.cse.element.getElement('rdwrc_search').execute(queryStr);
  }
}

function clear_search_text() {
  $('.navbar-form .form-control').first().val('');
}
