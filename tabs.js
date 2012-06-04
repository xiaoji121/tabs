(function($){
    
    var tabs = {

    	init: function() {
    		
    		var self = this;

    		self.boxes = $(".f-tab-b","#tab1");
    		self.title = $(".f-tab-t","#tab1");
    		self.currentTabClass = ".current";
    		self.timer = null;
    		self.index = 0;
    		self.isPause = false;

    		self._setTabs(0);

            self._bindEvent();


    	},

    	_setTabs: function( index ) {
    		var self = this;
            index = self._getIndex( index );
            self.index = index;

    		self._setTitle( index );
    		self._setBox( index );
            
    	},

    	_setTitle: function( index ) {
    		var self = this;
    		self.title.removeClass("current");
    		$(self.title[index]).addClass("current");
    	},

    	_setBox: function( index ) {
    		var self = this;
    		self.boxes.hide();
    		$(self.boxes[index]).show();

    		self._autoPlay(1);
    	},

    	_autoPlay: function( n ) {
    		var self = this;
    		// console.log("index " + self.index)
    		// self.index += n;
            // self.index = self._getIndex(self.index);
            console.log(self.index)
    		if( self.isPause === false ){
    			if( self.timer ){
    				clearTimeout(self.timer);
    			}

    			self.timer = setTimeout(function(){
    				self._setTabs( self.index + n );
    			},3000);
    		}
    		
    	},

        _getIndex: function( index ) {
            return index % this.boxes.length;
        },

        _bindEvent: function() {
            var self = this;

            self.title.bind("click",function( e ){
                self._clearTime();
                var index = self.title.index($(e.currentTarget));
                console.log( "index " + index + "selfindex " + self.index)
                if ( self.index !== index ) {
                    self._setTabs( index );
                }

                self._autoPlay(1);
                
            });

            self.boxes.hover(function() {
                self.isPause = true;
                self._clearTime();
            },function() {
                self.isPause = false;
                self._autoPlay(1);
            });
        },

        _clearTime: function() {
            if( this.timer ) {
                clearTimeout( this.timer );
            }
            this.timer = null;
        },

    	end: 0
    };

    $(function(){
    	tabs.init();
    });
})(jQuery)
