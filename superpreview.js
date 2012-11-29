var selected_device = 'generic-desktop';
var current_menu = '';
var current_language = 'en';

function updateActiveResolutions() {
  $('#resolution_list > li').css('display', 'none');
  $('li[id^="'+selected_device+'_"]').css('display', 'block');
}

function updateClickHandlers() {
  $('#device_list > li').click(updateDevice);
  $('#resolution_list > li').click(updateResolution);
  $('#language_list > li').click(updateLanguage);
}

function updateDevice() {
  $('#device_list > li').removeClass('preview_active');
  $(this).addClass('preview_active');
  selected_device = $(this).attr('id');
  adjustFrameResolution($('#resolution_list > li[id^="'+selected_device+'_"]').first());
  $('#menu_float').css('display', 'none').children('ul').css('display', 'none');
  current_menu = '';
  reloadFrame();
}

function adjustFrameResolution(obj) {
  $('#resolution_list > li').removeClass('preview_active');
  obj.addClass('preview_active');
  var parts = obj.attr('id').replace(selected_device + '_', '').split('x');
  $('iframe').animate({
    width: parts[0],
    height: parts[1]
  });
}

function updateResolution() {
  adjustFrameResolution($(this));
  $('#menu_float').css('display', 'none').children('ul').css('display', 'none');
  current_menu = '';
}

function updateLanguage() {
  var new_language = $(this).attr('id').substr(8);
  if (new_language != current_language) {
    current_language = new_language;
    $('#language_list > li').removeClass('preview_active');
    $(this).addClass('preview_active');
    reloadFrame();
  }
  $('#menu_float').css('display', 'none').children('ul').css('display', 'none');
  current_menu = '';
}

function reloadFrame() {
  var url = $('#base_path').val() + current_language + '/' + selected_device;
  $('iframe').attr('src', url);
}

(function($) {
  $(document).ready(function() {
    selected_device = $('#device_list .preview_active').attr('id');
    current_language = $('#language_list .preview_active').attr('id').substr(8);
    $('.dropdownitems > li').each(function() {
      $('#menu_float').append($(this).children('ul'));
    });
    $('.dropdownitems > li').click(function() {
      $('#menu_float ul, #menu_float').css('display', 'none');
      if ($(this).attr('id') != current_menu) {
        current_menu = $(this).attr('id');
        $('#menu_float ul#' + $(this).attr('id').substr(5)).css('display', 'block');
        $('#menu_float').css({
          display: 'block',
          top: $(this).position().top + 18,
          left: $(this).position().left,
          position: 'absolute'
        });
        updateActiveResolutions()
        updateClickHandlers();
      } else {
        current_menu = '';
      }

    });
  });
}(jQuery));