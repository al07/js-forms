$(document).ready(function() {

	
    
    var CommentBtnModule = (function(){
        var init = function() {
            _setUpListener();
        }
        var areaComment = $('#area_comment');
        var _valid_or_not = true;
        //
        var _setUpListener = function() {
            $('#form').on('submit', function(e) {
                _actionOnClick(e);
            }).on('submit', CommentBtnModule._sendEmail );
            
            
        }
        
        var _actionOnClick = function(event) {
            _valid = true;
            
             
            if( areaComment.val().trim() == "") {
                $('#commentErrorEmpty').fadeIn(300);
                _valid = false;
                event.preventDefault();
            } else {
                $('#commentErrorEmpty').fadeOut(300);
            }
            
            areaComment.on('focus', function() {
                $('#commentErrorEmpty').fadeOut(1000);
            });
            _valid_or_not = _valid;
            
            
        }   
        
        var _sendComment = function (event) {
            if ( _valid_or_not ) {
                console.log("Форма уехала!!! Ураааа!!!");
                $('#form').submit();
            }
        }
        return {
            init
        }
    }());
    
    CommentBtnModule.init();
});