Iconomatic
===============

Detect links to native files and append the proper icon image.


This is an update to the old script to include new AJAX detection, manual overrides, custom file types, and encapsulation using jQuery plugin design pattern.


## Quick Setup
Include the scripts
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.js"></script>
<script src="jquery.iconomatic.js"></script>
```

Initialize the plugin
```js
$(document).ready( function() {
  $('body').iconomatic()
});
```
## Options
Default plugin options:
```js
var defaults = {
     ajax:      false        // if true: listen for DOM changes using the MutationObserver object
    ,dataMode:  false        // if true: check data attributes for manually tagged links (useful for redirected links)
    ,dataAttr:  'iconomatic' // the data attribute to check for (eg data-iconomatic="pdf")
    ,iconClass: 'fileIcon'   // the CSS class to apply to the icons
    ,filesObj:  fileTypes    // an object that lists the file types to label with icons (see structure below)
};
```
## Notes  
By default, both ```ajax``` and ```dataMode``` are disabled.   

The ```ajax``` option may not work in all browsers. MutationObserver is a DOM4 spec.  
For support see: http://caniuse.com/mutationobserver

The ```dataMode / dataAttr``` options are useful for hyperlinks that have non-normative href attributes for their filetype, or are controlled by javascript.  
For example, these links would not be labeled without ```dataMode:true```:    
```html
<a data-iconomatic="pdf" href="http://bit.ly/12345">Some PDF</a>
<a data-iconomatic="pdf" href="#" onclick="downloadfunction()">Some PDF</a>
```  

The default file types are:
```js
var fileTypes = {
      'avi':  { 'path': path + 'icon_video.gif',      'type': 'Video'}
    , 'doc':  { 'path': path + 'icon_word.gif',       'type': 'Microsoft Word'}
    , 'docx': { 'path': path + 'icon_word.gif',       'type': 'Microsoft Word'}
    , 'gif':  { 'path': path + 'icon_image.gif',      'type': 'GIF'}
    , 'jpg':  { 'path': path + 'icon_image.gif',      'type': 'JPG'}
    , 'm3u':  { 'path': path + 'icon_audio.gif',      'type': 'Audio'}
    , 'mov':  { 'path': path + 'icon_video.gif',      'type': 'Video'}
    , 'mp3':  { 'path': path + 'icon_audio.gif',      'type': 'Audio'}
    , 'mpg':  { 'path': path + 'icon_video.gif',      'type': 'Video'}
    , 'mpeg': { 'path': path + 'icon_video.gif',      'type': 'Video'}
    , 'pdf':  { 'path': path + 'icon_pdf.gif',        'type': 'PDF'}
    , 'ppt':  { 'path': path + 'icon_powerpoint.gif', 'type': 'Microsoft PowerPoint'}
    , 'pptx': { 'path': path + 'icon_powerpoint.gif', 'type': 'Microsoft PowerPoint'}
    , 'wmv':  { 'path': path + 'icon_video.gif',      'type': 'Video'}
    , 'xls':  { 'path': path + 'icon_excel.gif',      'type': 'Microsoft Excel'}
    , 'xlsx': { 'path': path + 'icon_excel.gif',      'type': 'Microsoft Excel'}
    , 'xlsm': { 'path': path + 'icon_excel.gif',      'type': 'Microsoft Excel'}
    , 'zip':  { 'path': path + 'icon_zip.gif',        'type': 'ZIP Archive'}
};
```

## Dependencies
jQuery ( Tested with 1.7 and 1.11)
