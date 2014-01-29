/*
 *  Project: Iconomatic
 *  Description: Detect links to native files and append the proper icon image after the link
 *  Author: Michael Oakley
 *  License: None
 *
 * Todo: use data- attrs
 * add debug flags
  * label h2/h3 with arrows?
	* label external links?
	* expose api call to add to fileTypes object (append to the obj instead of replacing it)  $.extend() !
 */
;(function ( $, window, document, undefined ) {

  var fileTypes = {

        "avi": {
          "extension": "avi",
          "path": "/images/icon_video.gif",
          "type": "Video"
        },
        "doc": {
            "extension": "doc",
            "path": "/images/icon_word.gif",
            "type": "Microsoft Word"
        },
        "docx": {
            "extension": "docx",
            "path": "/images/icon_word.gif",
            "type": "Microsoft Word"
        },
        "gif": {
            "extension": "gif",
            "path": "/images/icon_image.gif",
            "type": "GIF"
        },
        "jpg": {
            "extension": "jpg",
            "path": "/images/icon_image.gif",
            "type": "JPG"
        },
        "m3u": {
            "extension": "m3u",
            "path": "/images/icon_audio.gif",
            "type": "Audio"
        },
        "mov": {
            "extension": "mov",
            "path": "/images/icon_video.gif",
            "type": "Video"
        },
        "mp3": {
            "extension": "mp3",
            "path": "/images/icon_audio.gif",
            "type": "Audio"
        },
        "mpg": {
            "extension": "mpg",
            "path": "/images/icon_video.gif",
            "type": "Video"
        },
        "mpeg": {
            "extension": "mpeg",
            "path": "/images/icon_video.gif",
            "type": "Video"
        },
        "pdf": {
            "extension": "pdf",
            "path": "/images/icon_pdf.gif",
            "type": "PDF"
        },
        "ppt": {
            "extension": "ppt",
            "path": "/images/icon_powerpoint.gif",
            "type": "Microsoft PowerPoint"
        },
        "pptx": {
            "extension": "pptx",
            "path": "/images/icon_powerpoint.gif",
            "type": "Microsoft PowerPoint"
        },
        "wmv": {
            "extension": "wmv",
            "path": "/images/icon_video.gif",
            "type": "Video"
        },
        "xls": {
            "extension": "xls",
            "path": "/images/icon_excel.gif",
            "type": "Microsoft Excel"
        },
        "xlsx": {
            "extension": "xlsx",
            "path": "/images/icon_excel.gif",
            "type": "Microsoft Excel"
        },
        "xlsm": {
            "extension": "xlsm",
            "path": "/images/icon_excel.gif",
            "type": "Microsoft Excel"
        },
        "zip": {
          "extension": "zip",
          "path": "/images/icon_zip.gif",
          "type": "ZIP Archive"
        }


  };


  var pluginName = 'iconomatic';

  var defaults = {
      debug:         false, // to do!
			manualMode:    true,
      dataAttr:      'data-iconomatic',
      iconClass:     'fileicon',
      filesObj:      fileTypes,
      mergefilesObj: true,
      ajax:          true
  };

  // Constructor
  function Iconomatic( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options );

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Iconomatic.prototype = {

    init: function() {

      var $totalLinks;

			if( this.options.manualMode ) {
				var $userLinks = this.getUserLinks();
				var $autoLinks = this.getAutoLinks();

				//console.log($userLinks);
				//console.info($autoLinks);

				$totalLinks = $userLinks.add( $autoLinks );
			} else {
				$totalLinks = this.getAutoLinks();
			}


      this.addIcons( $totalLinks );

      if ( this.options.ajax ) {
        this.enableAjax();
      }
    },


    getAutoLinks: function() {
			var self = this;
      var $links = $( 'a[href]' );

			$links.each( function(){
				var link = this;
				var href = $(link).attr('href');
				if( ! self.getDataAttr( link, self.options.dataAttr ) ) {

					if( typeof href !== "undefined" && href !== null && href !== "" ) {

						var hrefArray = href.split('.');
						var ext = hrefArray[ hrefArray.length - 1 ].toLowerCase();

						self.setDataAttr( link, self.options.dataAttr, ext );
					}
				}
			});
			return  $links;
    },


    getUserLinks: function() {
			var self = this;
      var $links = $( 'a[' + self.options.dataAttr + ']' );

			$links.each( function(){
				var link = this;
				var val  = $(link).attr( self.options.dataAttr );
			});

      return $links;
    },


		setDataAttr: function( el, key, val ) {
			$( el ).attr( key, val );
		},


		getDataAttr: function( el, key ) {
			return $( el ).attr( key );
		},


    enableAjax: function(){
			$(document).on('ajaxSuccess', function(){
        //console.log('on ajaxSuccess	' );
      });


			$( document ).ajaxSuccess( function( event, xhr, settings ) {
			//Note: You can get the returned ajax contents by looking at xhr.responseXML or xhr.responseText for xml and html respectively.

			});

			$(document).on('DOMNodeInserted', function(event) {
						console.log( event.target ); // new node
						console.log( event.relatedNode ); // parent
			});

    },


    addIcons: function( $links ) {
      var self = this;
			var opts = this.options;

      $links.each( function(){
        var link  = this;
				var fileType = self.getDataAttr( link, opts.dataAttr );
				var thePath  = ( typeof opts.filesObj[fileType] !== "undefined" ) ?  opts.filesObj[fileType].path : false;

				if( thePath ) {

						var imgAttrs = {
							'class': opts.iconClass,
							'alt'  : opts.filesObj[fileType].type,
							'src'  : thePath
						};

						$( '<img />', imgAttrs ).appendTo(link);
				}

      });
    }
  };





  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
         $.data(this, "plugin_" + pluginName, new Iconomatic( this, options ));
      }
    });
  };






})( jQuery, window, document );
