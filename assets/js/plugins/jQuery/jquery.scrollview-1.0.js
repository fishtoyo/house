/*!
 * scrollview.js alpha v1.0
 * @copyright 2017 AJgarden
 * ##### Author: Jia #####
 */

$.fn.scrollView = function(options) {
  var defaults = {
    start: 'default', // 'default'(str), selector(str) or px(int)
    end: null,
    // null: until the bottom of page
    // selector(str): until the bottom of direct element
    // px(int): until the direct px
    // only avaliable with repeat be true
    threshold: -200,  // px(int)
    delay: 0,  // ms(int > 0)
    addClass: 'scroll-view', // (str)
    repeat: false, // true or false
    onChange: function(element) {
      return false;
    }, // callback(function) when change status everytime
    onAddClass: function(element) {
      return false;
    }, // callback(function) after class added everytime
    onRemoveClass: function(element) {
      return false;
    } // callback(function) after class removed everytime
  };
  var $selector = $(this);
  var settings = $.extend({}, defaults, options);

  $(window).on('scroll', function() {
    var scrollTop = $(window).scrollTop();
    $selector.each(function(i,element) {
      var $this = $(element);
      if ($this.hasClass('scroll-view') == false) {
        if (settings.start === "default")
          var pos = $this.offset().top - $(window).height();
        else if (typeof(settings.start) === "string")
          var pos = $(settings.start).offset().top - $(window).height();
        else
          var pos = settings.start;
        if (settings.repeat == true) {
          if (settings.end != null) {
            if (typeof(settings.end) === "string")
              var posE = $(settings.end).offset().top + $(settings.end).outerHeight() - $(window).height();
            else
              var posE = settings.end;
            if ((scrollTop + settings.threshold) >= pos && (scrollTop + settings.threshold) <= posE) {
              $this.delay(settings.delay).queue(function() {
                if (typeof(settings.onChange) === "function")
                  settings.onChange.call(this,$this);
                $this.addClass(settings.addClass).dequeue();
                if (typeof(settings.onAddClass) === "function")
                  settings.onAddClass.call(this,$this);
              });
            }
          } else {
            if ((scrollTop + settings.threshold) >= pos) {
              $this.delay(settings.delay).queue(function() {
                if (typeof(settings.onChange) === "function")
                  settings.onChange.call(this,$this);
                $this.addClass(settings.addClass).dequeue();
                if (typeof(settings.onAddClass) === "function")
                  settings.onAddClass.call(this,$this);
              });
            }
          }
        } else {
          if ((scrollTop + settings.threshold) >= pos) {
            $this.delay(settings.delay).queue(function() {
              if (typeof(settings.onChange) === "function")
                settings.onChange.call(this,$this);
              $this.addClass(settings.addClass).dequeue();
              if (typeof(settings.onAddClass) === "function")
                settings.onAddClass.call(this,$this);
            });
          }
        }
      } else {
        if (settings.repeat == true) {
          if (settings.start === "default")
            var pos = $this.offset().top - $(window).height();
          else if (typeof(settings.start) === "string")
            var pos = $(settings.start).offset().top - $(window).height();
          else
            var pos = settings.start;
          if (settings.end != null) {
            if (typeof(settings.end) === "string")
              var posE = $(settings.end).offset().top + $(settings.end).outerHeight() - $(window).height();
            else
              var posE = settings.end;
            if ((scrollTop + settings.threshold) < pos || (scrollTop + settings.threshold) > posE) {
              $this.delay(settings.delay).queue(function() {
                if (typeof(settings.onChange) === "function")
                  settings.onChange.call(this,$this);
                $this.removeClass(settings.addClass).dequeue();
                if (typeof(settings.onRemoveClass) === "function")
                  settings.onRemoveClass.call(this,$this);
              });
            }
          } else {
            if ((scrollTop + settings.threshold) < pos) {
              $this.delay(settings.delay).queue(function() {
                if (typeof(settings.onChange) === "function")
                  settings.onChange.call(this,$this);
                $this.removeClass(settings.addClass).dequeue();
                if (typeof(settings.onRemoveClass) === "function")
                  settings.onRemoveClass.call(this,$this);
              });
            }
          }
        }
      }
    });
  }).trigger('scroll');
}