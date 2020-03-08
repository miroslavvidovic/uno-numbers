(function() {
  var THEMES, animateHeader, init, setupNumberSections, setupOnePageScroll;

  THEMES = [
    {
      name: 'train-station',
      numbers: [
        {
          number: 0,
          description: 'Evidencija ulaza/izlaza',
          detail: 'Broj prolazaka'
        }, {
          number: 192854,
          description: 'Evidencija ulaza/izlaza',
          detail: 'Broj prolazaka'
        }
      ]
    },
    {
      name: 'train-station',
      numbers: [
        {
          number: 0,
          description: 'Evidencija izdatih obroka',
          detail: 'Izdati obroci u 2 restorana'
        }, {
          number: 100000,
          description: 'Evidencija izdatih obroka',
          detail : 'Izdati obroci u 2 restorana'
        }
      ]
    },
    {
      name: 'train-station',
      numbers: [
        {
          number: 0,
          description: 'Izlaznice',
          detail: 'Službene, privatne i narađeni sati'
        }, {
          number: 34500,
          description: 'Izlaznice',
          detail: 'Službene, privatne i narađeni sati'
        }
      ]
    },
    {
      name: 'train-station',
      numbers: [
        {
          number: 0,
          description: 'Liste za vanredni rad',
          detail: 'Prekovremeni, vanredni rad i intervencije'
        }, {
          number: 1456,
          description: 'Liste za vanredni rad',
          detail: 'Prekovremeni, vanredni rad i intervencije'
        }
      ]
    },
    {
      name: 'train-station',
      numbers: [
        {
          number: 0,
          description: 'Službena putovanja',
          detail: 'Upotreba službenih vozila'
        }, {
          number: 950,
          description: 'Službena putovanja',
          detail: 'Upotreba službenih vozila'
        }
      ]
    }
  ];

  animateHeader = function() {
    return $('.title-number-section .odometer').addClass('odometer-animating-up odometer-animating');
  };

  setupOnePageScroll = function() {
    return $(function() {
      $('.main').onepage_scroll({
        sectionContainer: '.section'
      });
      $('.down-arrow').click(function() {
        return $('.main').moveDown();
      });
      return $(document).keydown(function(e) {
        switch (e.keyCode) {
          case 40:
          case 34:
            return $('.main').moveDown();
          case 33:
          case 38:
            return $('.main').moveUp();
        }
      });
    });
  };

  setupNumberSections = function() {
    var $afterSections, $numberSectionTemplate, $numberSectionTemplateClone;
    $afterSections = $('.after-number-sections');
    $numberSectionTemplate = $('.number-section.template');
    $numberSectionTemplateClone = $numberSectionTemplate.clone().removeClass('template');
    _.each(THEMES, function(theme) {
      var $odometerContainer, $section, currentNumber, next, odometer, odometerOptions;
      $section = $numberSectionTemplateClone.clone().addClass('number-section-theme-' + theme.name);
      $afterSections.before($section);
      $odometerContainer = $section.find('.odometer-container');
      $odometerContainer.append('<div/>');
      $odometerContainer = $odometerContainer.find('div');
      currentNumber = 0;
      odometerOptions = $.extend(true, {}, theme.odometerOptions || {}, {
        theme: theme.name,
        value: theme.numbers[1].number,
        el: $odometerContainer[0],
        format: 'd'
      });
      odometer = new Odometer(odometerOptions);
      odometer.render();
      next = function() {
        var number;
        number = theme.numbers[currentNumber];
        odometer.update(number.number);
        $section.find('.number-description').html(number.description);
        $section.find('.number-detail').html(number.detail);
        $section.find('.number-source').attr('href', number.source);
        return currentNumber = (currentNumber + 1) % theme.numbers.length;
      };
      next();
      return setInterval(function() {
        if ($section.hasClass('active')) {
          return next();
        }
      }, 4 * 1000);
    });
    $afterSections.remove();
    return $numberSectionTemplate.remove();
  };

  init = function() {
    setupNumberSections();
    setupOnePageScroll();
    return setTimeout(function() {
      return animateHeader();
    }, 500);
  };

  init();

}).call(this);
