// On ready
document.addEventListener('DOMContentLoaded', ready, false);

// Ready method
function ready() {
  // Main element
  var pswpElement = $(document).find('.pswp')[0];

  $('.painting__gallery figure').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var el = $(this),
      parent = el.parents('.painting'),
      main = parent.find('.painting__gallery__main');

    // Main element
    var items = [{
      src: main.find('a').attr('href'),
      w: main.find('meta[itemprop="width"]').attr('content'),
      h: main.find('meta[itemprop="height"]').attr('content')
    }];

    // Get figures
    parent.find('.painting__gallery__right figure').forEach(function(figure) {
      var f = $(figure);
      items.push({
        src: f.find('a').attr('href'),
        w: f.find('meta[itemprop="width"]').attr('content'),
        h: f.find('meta[itemprop="height"]').attr('content')
      });
    });

    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  });
}
