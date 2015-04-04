/**
 * Collapse code
 */

(function ( $ ) {
    $.fn.collaps = function( options ) {
    	
    	// Default Settings YO!
        var settings = $.extend({
            width: 767,
            open: '<!--more-->',
            containerClass: null,
            clousureClass:'more-content',
            moreClass:'showmore',
        }, options );
        
        //Dam u WordPress default more. Only first one :)
        $('[id^=more-]').replaceWith('<span class="more"></span>');
        
        // Where should we hide all content.
        clousure = '<div class="'+settings.clousureClass+'">';
        
        // Changing comments 'more' to span.more. Roger that!
        $('body *').contents()
        	.filter(function(){ return this.nodeType == 8; })
        	.each(function(){return this=='<!-- more -->';})
        	.replaceWith('<span class="more"></span>');
        
        // All even 'more' come to school.
        $(this).children('.more:even')
        	.addClass(settings.moreClass)
        	.each(function(){
        		$(this).nextUntil('.more').wrapAll(clousure)
        		});
        
        // In-case some **** forgot the last 'more'.
        if(this.children('.more').lenght%2) 
        	$('this').children('.more:odd').last()
        		.addClass(settings.moreClass).nextAll()
        		.wrapAll(clousure);
        
        // Everything use less here.
        $(this).children('.more').not('.'+settings.moreClass)
        	.remove();
        
        //Event register. When someone click this.
        $('.' + settings.moreClass).click(function(){
        	$(this).toggleClass('active').next('.' + settings.clousureClass).slideToggle();
        });
        
        // Time for some styling... LOL!
        var style ="."+settings.clousureClass+"{padding:10px;border-left:5px solid #ddd;margin:0 10px;display:none}."+settings.moreClass+"{display:block;font-size:100%;padding:10px;border-top:1px solid #ddd;border-bottom:1px solid #ddd;font-family:arial;color:#555;position:relative;cursor:pointer; margin:10px 0;}."+settings.moreClass+".active{border-bottom:0 solid #ddd}."+settings.moreClass+":before{content:'Show More'}."+settings.moreClass+":after{width:25px;height:25px;background-repeat:no-repeat;background-image:url(data:image/png;base64,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);background-size:cover;position:absolute;right:16px;font-size:200%;top:50%;line-height:0;cursor:pointer;content:'';transition:all .3s ease-out;transform:translate(0,-12.5px)}."+settings.moreClass+".active:after{transform:rotate(-180deg) translate(0,12.5px)}@media screen and (min-width:767px){."+settings.moreClass+"{display:none}."+settings.clousureClass+"{padding:initial;border-left:0 solid #ddd;margin:initial;display:initial}}";
        $("<style type='text/css'>"+ style +"</style>").appendTo("head");
        
        return this;
    };
    
}( jQuery )); // A jQuery plug-in by iNa. time (6hr 24min); THAT ALL FOLKS!

