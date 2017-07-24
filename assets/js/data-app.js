/*!
 * (jQuery mobile) jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @scottjehl
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */

/**
 * @see http://stackoverflow.com/questions/2656730/internet-explorer-console
 *  Please note that in IE, unlike in Firefox, if the developer tools are not active,
 *  window.console is undefined and calling console.log() will break.
 *  Always protect your calls with window.console && console.log('stuff'); –  Guss Apr 30 '12 at 12:32
 *
 */

(function ($, window, document, undefined) {

  // define a widget under a namespace of your choice
  // here 'mobile' has been used in the first parameter
  $.widget('intr.ammeraal', $.mobile.widget, {
    // Options to be used as defaults
    options: {
      dataUrl: 'assets/data.json',
      themes: {
        panel: 'a',
        header: 'a',
        index: 'a',
        products: 'b',
        navbarTabs: 'a',
        popup: {
          button: 'd',
          container: 'd',
          overlay: 'a'
        },
        popupOverlay: 'd'
      },
      transitions: {
        panel: 'slide',
        grid: 'pop',
        tabs: 'fade'
      },
      data: null,
      externalData: true,
      prefixes: {
        page: 'page-',
        product: 'product-',
        tabs: 'cat-selector-',
        introSection: false, // 'intro-',
        problemsSection: 'problems-',
        solutionsSection: 'solutions-'
      },
      collapsedSolution: false,
      collapsibleSolutionSets: false,
      refSeparator: '|'
    },
    // Respond to any changes the user makes to the option method
    _setOption: function (key, value) {
      this._super(key, value);
    },
    _setOptions: function (options) {
      this._super(options);
    },
    _create: function () {
      var o = this.options;
      // window.console && console.log('Creating Widget');
      if (o.externalData) {
        this._loadData(o.dataUrl);
      }

      // _create will automatically run the first time this
      // widget is called. Put the initial widget set-up code
      // here, then you can access the element on which
      // the widget was called via this.element
      // The options defined above can be accessed via
      // this.options


    },
    _bindEvents: function () {
      $('body')
        .on('loadData.intr', function (e) {
          $(e.target)
            .find(":jqmData(role='ammeraal')")
            .ammeraal('loadDone', e.data);
        });
    },
    /**
     * Sets instance data and launches build
     * @param {object} data
     * @returns void
     */
    _loadDone: function (data) {
      // window.console && console.log('Data loaded');
      $(this)
        .ammeraal('build', data);
    },
    build: function (data) {
      this._setOption('data', $.extend({}, data));
      this._buildContent();
    },
    _loadFail: function (jqxhr, textStatus, error) {
      window.console && console.log({ jqxhr: jqxhr, textStatus: textStatus, error: error });
    },
    _buildContent: function () {
      // window.console && console.log('Building content');
      var i = this,
        e = i.element,
        p = $('#page-index'),
        c = p.find(":jqmData(role='content')"),
        o = this.options,
        $menu = $('<ul />')
          .attr('data-role', 'listview')
          .appendTo(e),
        $index = $('<ul />')
          .attr({
            'data-role': 'listview',
            'data-inset': 'true'
          })
          .addClass('grid-list clearfix')
          .appendTo(c);



      // first menu element: the logo
      $menu.append('<li data-icon="false"><a data-transition="' + o.transitions.panel + '" href="#page-index" class="big-icon-only"><img src="assets/img/favicon.png" alt="Logo"></a></li>');

      $.each(o.data, function (index, item) {
        var $myPage = $('<div />'),
          $tabsContainer = $('<div />'),
          $tabNavBar = $('<div />'),
          $sectionIntro = $('<div />'),
          $sectionProblems = $('<div />'),
          $problemList = $('<ol />'),
          $sectionSolutions = $('<div />'),
          $pageHeader = $('<div />'),
          $solutionsContainer = $('<div />'),
          $nonFeaturedSolutionsContainer = $('<ul />');



        // ------------ MENU ENTRY ----------------
        $menu.append(
          $('<li />')
            .addClass(item.grouping)
            .append(
            $('<a />')
              .attr({
                'data-transition': o.transitions.panel,
                'href': '#' + o.prefixes.page + item.id
              })
              .text(item.title)
            )
        );

        // ------------ INDEX ENTRY ----------------
        $index.append(
          $('<li />')
            .addClass(item.grouping)
            .append(
            $('<a />')
              .attr({
                'data-transition': o.transitions.index,
                'href': '#' + o.prefixes.page + item.id
              })
              .append($('<img />')
                .attr('src', 'assets/img/content-images/secciones-generico/' + item.id + '.jpg')
                .addClass('ui-li-thumb'))
              .append($('<h2 />')
                .text(item.title))
              .append($('<p />')
                .html(item.description))
            // .append($('<span />')
            //  .addClass('ui-li-count')
            //  .text(item.grouping))
            )
        );

        // ------------ PAGE ITSELF ----------------

        $myPage
          .attr({
            'id': o.prefixes.page + item.id,
            'data-role': 'page'
          })
          .addClass('my-page product ' + o.prefixes.product + item.id)
          .appendTo($('body'));

        // ------------ PAGE HEADER ----------------
        $pageHeader.attr({
          'data-role': 'header',
          'data-position': 'fixed',
          'data-theme': 'a'
        })
          .addClass('ui-panel-fixed-toolbar')
          .addClass(item.grouping)
          .append($('<a />')
            .attr({
              'data-transition': o.transitions.panel,
              'data-inline': 'true',
              'data-role': 'button',
              'data-corners': 'false',
              'data-theme': 'c',
              'role': 'button',
              'href': '#menu'
            })
            .addClass('ui-btn-left ui-btn-corner-all ui-btn ui-icon-bars ui-btn-icon-left')
            .text('Menu')
          )
          .append($('<h1 />')
            .text(item.title)
          )
          .appendTo($myPage)
          ;

        $tabsContainer
          .attr({
            'data-role': 'tabs',
            'id': o.prefixes.tabs + item.id,
            'data-show': o.transitions.tabs,
            'data-active': '0'
          })
          .addClass('sliding-tabs ammeraal-gradient')
          .appendTo($('<div />')
            .addClass('full-size')
            .appendTo($('<div />')
              .attr({
                'data-role': 'content',
                'role': 'main',
                'data-theme': 'b'
              })
              .addClass('full-size-container')
              .appendTo($('<div />')
                .addClass('ui-panel-wrapper')
                .appendTo($myPage)))
          );

        // ------------ NAVBAR ----------------

        $tabsContainer.append($tabNavBar.attr('data-role', 'navbar')
          .append($('<ul />')
            .append($('<li />')
              .append($('<a />')
                .attr({
                  'href': '#' + o.prefixes.problemsSection + item.id,
                  'data-theme': 'a',
                  'data-ajax': 'false'
                })
                .text('Problems')))
            .append(o.prefixes.introSection ? $('<li />')
              .append($('<a />')
                .attr({
                  'href': '#' + o.prefixes.introSection + item.id,
                  'data-theme': 'a',
                  'data-ajax': 'false'
                })
                .text('Intro')) : '')
            .append($('<li />')
              .append($('<a />')
                .attr({
                  'href': '#' + o.prefixes.solutionsSection + item.id,
                  'data-theme': 'a',
                  'data-ajax': 'false'
                })
                .text('Solutions')))));

        // ------------ PROBLEMS ----------------
        $problemList.addClass('full-size problem-window');
        $tabsContainer.append($sectionProblems
          .attr('id', o.prefixes.problemsSection + item.id)
          .addClass('ui-content problems-section')
          .append($('<h1 />')
            .addClass('floating-title section-title')
            .text(item.title))
          .append($('<div />')
            .addClass('problem-popup-container')
            .append($('<a />')
              .attr('data-rel', 'popup')
              .attr('data-transition', 'pop')
              .attr('data-position-to', 'origin')
              .attr('href', '#' + o.prefixes.problemsSection + item.id + '-problem')
              .addClass('ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-alert ui-btn-icon-left ui-btn-f clickable-area')
              .text('Show Problems'))
            .append($('<div />')
              .attr('data-role', 'popup')
              .attr('data-arrow', 'true')
              .attr('data-theme', 'f')
              .attr('data-overlay-theme', 'a')
              .attr('id', o.prefixes.problemsSection + item.id + '-problem')
              .addClass('problem-item ui-content')
              .append($('<a />')
                .attr('data-rel', 'back')
                .attr('href', '#')
                .addClass('ui-btn ui-corner-all ui-shadow ui-btn-b ui-icon-delete ui-btn-icon-notext ui-btn-right')
                .text('Close'))))
          .append(function (problems, $container) {
            $.each(problems, function (i, v) {
              $container.append($('<li />')
                .attr('data-x', v.x)
                .attr('data-y', v.y)
                .append($('<span />')
                  .addClass('handle'))
                .append($('<span />')
                  .addClass('problem-text')
                  .text(v.title))

                // .append($('<h1 />')
                //  .text(v.title))
                // .append(v.description)

              );
              //
              $sectionProblems.find('.problem-item')
                .append($('<h1 />')
                  .text(v.title))
                .append(v.description);
            });
            // append all problems to each container
            /* $.each(problems, function (i, v) {
             $container.find('.problem-item')
             .append($('<h1 />')
             .text(v.title))
             .append(v.description);
             });*/

            return $container;
          }.call(this, item.problems, $problemList)));

        // ------------ INTRO ----------------

        o.prefixes.introSection ? $tabsContainer.append($sectionIntro
          .attr('id', o.prefixes.introSection + item.id)
          .addClass('ui-content intro-section')
          .append($('<h1 />')
            .addClass('floating-title section-title')
            .text(item.title))
          .append($('<ul />')
            .addClass('stack stack-horizontal')
            .append($('<li />')
              .addClass('problems')
              .append($('<a />')
                .attr('id', 'button-' + o.prefixes.problemsSection + item.id)
                .attr('data-ajax', 'false')
                .attr('href', '#' + o.prefixes.problemsSection + item.id)
                .addClass('full-size problems-button')
                .append($('<span />')
                  .addClass('h2')
                  .text('Problems'))))
            .append($('<li />')
              .addClass('solutions')
              .append($('<a />')
                .attr('id', 'button-' + o.prefixes.solutionsSection + item.id)
                .attr('data-ajax', 'false')
                .attr('href', '#' + o.prefixes.solutionsSection + item.id)
                .addClass('full-size solutions-button')
                .append($('<span />')
                  .addClass('h2')
                  .text('Solutions'))))
          )

        ) : $.noop;


        // ------------ SOLUTIONS ----------------

        $tabsContainer.append($sectionSolutions
          .attr('id', o.prefixes.solutionsSection + item.id)
          .attr('data-theme', 'b')
          .addClass('ui-content solutions-section')
          .append($('<h1 />')
            .addClass('floating-title section-title')
            .append($('<img />')
              .attr('src', 'assets/img/Ammeraal-Beltech-Logo-Home.png')
              .attr('title', 'Chemprene'))))
          ;
        // If desired through options,
        // Expand a bit previously barely defined featured  and non featured
        // solutions container. This will be cloned
        // to act as a collapsible set (or not) for every set of solutions within a group
        if (o.collapsibleSolutionSets) {
          $solutionsContainer
            .attr('data-role', 'collapsible-set')
            .attr('data-content-theme', 'b')
            .attr('data-inset', 'false')
            .appendTo($('<div />')
              .addClass('ui-content'));
        } else {
          $solutionsContainer
            .addClass('ui-content');
        }
        $nonFeaturedSolutionsContainer
          .attr({
            'data-role': 'listview',
            'data-theme': 'b'
          })
          .appendTo($('<div />')
            .addClass('ui-content non-featured')
          );
        // false means we are not within a chain of solutions,
        // or we have just entered a separator.
        // True means we have started adding solutions to a collapsible set
        var writingSolutions = false;


        // Define Section container and plug it to the DOM
        if (item.solutions.length) {

          // ------------------------------------------------------------------------
          // let's go through each solution
          //  if it's a separator
          //    append pending (if any) solution set
          //    append separator
          //  else
          //    create collapsible set if empty
          //    append collapsible solution to collapsible set
          // -------------------------------------------------------------------------
          var $currentContainer = [];
          $.each(item.solutions, function (j, w) {
            var $sol;
            // if current container is false
            if (!writingSolutions) {
              // if it's a separator, create a list with the separator element
              if (typeof w.separator !== 'undefined'
                && w.separator) {
                $currentContainer.push($nonFeaturedSolutionsContainer
                  .clone()
                  .appendTo($sectionSolutions));
                $sol = $('<li />')
                  .attr('data-role', 'list-divider')
                  .text(w.title)
                  .appendTo($currentContainer[$currentContainer.length - 1]);
                // otherwise mark it as a solution and append a collapsible set
              } else {
                writingSolutions = true;
                $currentContainer.push($solutionsContainer
                  .clone()
                  .appendTo($sectionSolutions));
              }
            }
            if (writingSolutions) {
              if (typeof w.separator !== 'undefined'
                && w.separator) {
                $currentContainer.push($nonFeaturedSolutionsContainer
                  .clone()
                  .appendTo($sectionSolutions));
                $sol = $('<li />')
                  .attr('data-role', 'list-divider')
                  .text(w.title)
                  .appendTo($currentContainer[$currentContainer.length - 1]);
                writingSolutions = false;
                // otherwise mark it as a solution and append a collapsible set
              } else {

                $sol = $('<div />');
                $sol.attr({
                  'data-role': 'collapsible',
                  'data-collapsed-icon': 'carat-d',
                  'data-expanded-icon': 'check',
                  'data-inset': false,
                  'data-mini': !w.featured
                })
                  .addClass(w.featured ? 'featured' : '')
                  .appendTo($currentContainer[$currentContainer.length - 1]);
                if (!w.collapsed) {
                  $sol.attr({ 'data-collapsed': 'false' });
                }
                if (w.ref) {
                  // if references have a separator, split solutions and titles into several lines
                  if (s.include(w.ref, o.refSeparator)) {
                    window.console && console.log('More than one Ref Nº at ' + w.ref);
                    var refs = w.ref.split(o.refSeparator),
                      titles = w.title.split(o.refSeparator);
                    window.console && console.log(refs);
                    $h3 = $('<h3 />');
                    for (h = 0; h < refs.length; h++) {
                      window.console && console.log(h + ' ' + refs[h]);
                      var mySuffix = '<br>';
                      if (h === refs.length - 1) {
                        mySuffix = '';
                      }
                      $h3
                        .append($('<span >')
                          .addClass('ref-no')
                          .text(refs[h])
                        )
                        .append(' ' + titles[h] + mySuffix);
                    }
                    window.console && console.log($h3.html());
                    $sol.append($h3);

                  } else {
                    $sol.append($('<h3 >')
                      .append($('<span >')
                        .addClass('ref-no')
                        .text(w.ref)
                      )
                      .append(' ' + w.title));
                  }

                } else {
                  $sol.append($('<h3 >')
                    .text(w.title));
                }

                // if it has video or image use 2 columns
                if (w.video || w.images.length) {
                  var $mediaContainer = $('<div />')
                    .addClass('ui-block-b media-container');
                  if (w.video) {
                    /*
                     *  @see https://github.com/panique/html5-video
                     *  also <object /> and its params have to be added as a string because
                     *  IE does not see this as part of the html dom, so manipulation with jquery returns a null object.
                     *  @see http://stackoverflow.com/questions/9150938/invalid-argument-in-ie-8-on-jquery-prepend-on-flash-objects
                     *
                     */
                    var src = 'assets/video/' + w.video,
                      objectId = 'player-' + item.id + j,
                      poster = 'assets/video/' + w.video.substr(0, w.video.indexOf('mp4')) + 'jpg', // 'assets/video/' + w.video.substr(0, w.video.indexOf('mp4')) + 'jpg',
                      flowSrc = 'assets%2Fvideo%2F' + w.video,
                      flowPoster = 'assets%2Fvideo%2F' + w.video.substr(0, w.video.indexOf('mp4')) + 'jpg', // '..%2Fvideo%2F' + w.video.substr(0, w.video.indexOf('mp4')) + 'jpg',
                      playerWidth = 600,
                      playerHeight = 338,
                      swf = 'assets/swf/flowplayer-3.2.18.swf',
                      ratio = 720 / 1280,

                      // first we save all data inside the media container for further declaration
                      // this is no longer used with the youtube solution
                      videoData = {
                        src: 'assets/video/' + w.video,
                        poster: 'assets/video/' + w.video.substr(0, w.video.indexOf('mp4')) + 'jpg',
                        flowSrc: 'assets%2Fvideo%2F' + w.video,
                        flowPoster: 'assets%2Fvideo%2F' + w.video.substr(0, w.video.indexOf('mp4')) + 'jpg',
                        playerWidth: 600,
                        playerHeight: 338,
                        swf: 'assets/swf/flowplayer-3.2.18.swf',
                        ratio: ratio
                      };
                    var $videoContainer = $('<div />');
                    $videoContainer.addClass('video-container ui-content')
               
                      .appendTo($mediaContainer)
                      .data('videoData', videoData)
                      // for youtube, the embed iframe
                      .append($('<iframe />')
                        .attr({
                          width: '560',
                          height: '315',
                          frameborder: '0',
                          src: w.video + '?rel=0&amp;fs=0&amp;showinfo=0'
                        })


                      );


                    $videoContainer.attr('id', 'container-' + item.id + j);


                  }



                  if (w.images.length) {
                    var $imageContainer = $('<div />');
                    $imageContainer.addClass('image-container ui-content')
                      .appendTo($mediaContainer);
                    $.each(w.images, function (k, x) { // i->j->k, v->w->x
                      // @todo make zoomable if so specified
                      $imageContainer.append($('<img />')
                        .attr({
                          src: 'assets/img/content-images/' + x.filename,
                          alt: w.title
                        }));
                    });

                  }
                  $sol.append($('<div />')
                    .addClass('ui-grid-a ui-responsive')
                    .append($('<div />')
                      .addClass('ui-block-a')
                      .append($('<div />')
                        .addClass('ui-content')
                        .append(w.description)
                      )
                    )
                    .append($mediaContainer)
                  )
                    ;
                  if (w.video) {
                    var $myVideo = $('#' + 'container-' + item.id + j);

                  }


                } else {
                  $sol.append(w.description);
                }
              }
            }

          });
        }



      });
      $('body')
        .enhanceWithin();

      // make it easy to autoscale videos proportionally
      $('video')
        .on('loadedmetadata', function (e) {
          var $self = $(e.currentTarget);
          $self.addClass('has-metadata')
            .data('metadata', {
              videoWidth: $self.attr('videoWidth'),
              videoHeight: $self.attr('videoHeight')
            });
          if ($self.is(':visible')) {
            var myWidth = $self.width();
            $self.css('min-height', Math.floor($self.attr('videoWidth') / $self.attr('videoHeight') * myWidth) + 'px');

          }
        });

      $(".solutions-section :jqmData(role='collapsible')")
        .on('collapsibleexpand', function (event, ui) {
          // window.console && console.log(event.currentTarget);
          $(event.currentTarget)
            .find('video')
            .each(function (index, element) {
              var $mySelf = $(this);
              if ($mySelf.hasClass('has-metadata')) {

              }
            });

        })
        .on('collapsiblecollapse', function (event, ui) {
          $(event.currentTarget)
            .find('video')
            .each(function (index, element) {
              // @TODO pause the flowplayer also
              element.pause && element.pause();
            });
        });


    },
    /**
     * Loads external data and executes done
     * @param {type} url
     * @returns {undefined}
     */
    _loadData: function (url) {
      $.ajax({
        dataType: 'json',
        url: url,
        context: this.element
      })
        .done(this._loadDone)
        .fail(this._loadFail);

    },
    // Public methods like these below can can be called
    // externally:
    // $("#myelem").foo( "enable", arguments );

    enable: function () {
    },
    destroy: function () {
      window.console && console.log('Death & Destruction');
    }
  });

})(jQuery, window, document);
