/*
Existing script on NREL.gov
*/
	$(document).ready(function()
		{
			var fileTypes = {
				avi:  'http://www.nrel.gov/images/icon_video.gif',
				doc:  'http://www.nrel.gov/images/icon_word.gif',
				docx: 'http://www.nrel.gov/images/icon_word.gif',
				gif:  'http://www.nrel.gov/images/icon_image.gif',
				jpg:  'http://www.nrel.gov/images/icon_image.gif',
				m3u:  'http://www.nrel.gov/images/icon_audio.gif',
				mov:  'http://www.nrel.gov/images/icon_video.gif',
				mp3:  'http://www.nrel.gov/images/icon_audio.gif',
				mpg:  'http://www.nrel.gov/images/icon_video.gif',
				mpeg: 'http://www.nrel.gov/images/icon_video.gif',
				pdf:  'http://www.nrel.gov/images/icon_pdf.gif',
				ppt:  'http://www.nrel.gov/images/icon_powerpoint.gif',
				pptx: 'http://www.nrel.gov/images/icon_powerpoint.gif',
				wmv:  'http://www.nrel.gov/images/icon_video.gif',
				xls:  'http://www.nrel.gov/images/icon_excel.gif',
				xlsx: 'http://www.nrel.gov/images/icon_excel.gif',
				xlsm: 'http://www.nrel.gov/images/icon_excel.gif',
				zip:  'http://www.nrel.gov/images/icon_zip.gif'
			};
			var altText = {
				avi:  'Video',
				doc:  'Microsoft Word',
				docx: 'Microsoft Word',
				gif:  'GIF',
				jpg:  'JPG',
				m3u:  'Audio',
				mov:  'Video',
				mp3:  'Audio',
				mpg:  'Video',
				mpeg: 'Video',
				pdf:  'PDF',
				ppt:  'Microsoft PowerPoint',
				pptx: 'Microsoft PowerPoint',
				wmv:  'Video',
				xls:  'Microsoft Excel',
				xlsx: 'Microsoft Excel',
				xlsm: 'Microsoft Excel',
				zip:  'ZIP Archive'
			};

			// iterate over the matched elements
			$('a').each(function() {

				// get a jQuery object for each anchor found
				var $a = $(this);

				// don't add icons to images that are hyperlinked (eg, lightboxes, PDF thumbnails, etc)
				 if ($a.has('img').length == 0) {


					// get the whole href attribute value
					var href = $a.attr('href');

					// get the extension from the href
					if(typeof(href) !== 'undefined') {
						var hrefArray = href.split('.');
						var extension = hrefArray[hrefArray.length - 1].toLowerCase();

						var image = fileTypes[extension];

						// add the icon!
						if (image) {
							//console.log('image:'+image);
							$('<img />', {'src': image,
													'alt':  altText[extension],
													'border': 0,
													'style': 'margin-left:4px; vertical-align:text-top; position:relative '}).appendTo($a);

						}
				}
			}

			});
		}
	);

