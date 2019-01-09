$(document).ready(function() {

	console.log('Hello world!');	

    
    (function() {
       
        
        var LoginCheckerModule = {
            _validate_bool: true,
            init: function() {
                LoginCheckerModule._setUpListener();
                
            },
            _setUpListener: function() {
                
                $('#form').on('submit', LoginCheckerModule._validateForm).on('submit', LoginCheckerModule._sendEmail );
            },
            
            _validateForm: function(event) {
                
                _cur_validate = true;
                
                var email = $('#form_email');
                var password = $('#form_password');
                var form = email.parents('#form');
                console.log("Привет из валидейт!");
                email_empty_tooltip = $('<div class="notify notify--error mb-20" id="email_required">Введите email</div>');
                email_format_tooltip = $('<div class="notify notify--error mb-20" id="email_format_wrong">Неверный формат email</div>');
                
                password_empty_tooltip = $('<div class="notify notify--error mb-20" id="password_required">Введите пароль</div>');
                
                
                login_or_password_tooltip = $('<div class="notify no-paddings" id="login_password_wrong"><div class="notify no-radius-bottom notify--error">Неверный email или пароль</div><div class="notify no-radius-top"><p>Введите верные данные для входа или воспользуйтесь <a href="#!">восстановлением пароля </a>, чтобы войти на сайт.</p></div></div>');
                
                
                
                if (email.val().length == 0) {
                    LoginCheckerModule._removeEmailError();
                    email_empty_tooltip.insertBefore(form);
                    _cur_validate = false;
                } else {
                    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                    if( !(pattern.test(email.val())) ) {
                        LoginCheckerModule._removeEmailError();
                        email_format_tooltip.insertBefore(form);
                        _cur_validate = false;
                    }
                }
                
                if (password.val().length == 0) {
                    LoginCheckerModule._removePasswordError();
                    password_empty_tooltip.insertBefore(form);
                    _cur_validate = false;
                }
                
                if(_cur_validate) {
                    _mail_correct = email.val() != "mail@mail.ru";
                    _password_correct = password.val() != "123";
                    
                    if (_mail_correct || _password_correct) {
                        LoginCheckerModule._removeEmailError();
                        $('#login_password_wrong').remove();
                        login_or_password_tooltip.insertBefore(form);
                        _cur_validate = false;
                    }
                }
                
                if(!(_cur_validate)) {
                    event.preventDefault();
                } else {
                    
                    
                }
                email.on('focus', function() {
                    LoginCheckerModule._removeEmailError();
                    $('#login_password_wrong').remove();
                });
                password.on('focus', function() {
                    LoginCheckerModule._removePasswordError();
                    $('#login_password_wrong').remove();
                });
                LoginCheckerModule._validate_bool = _cur_validate;
                
                
                
            },
            _send_form: function(event) {
                if(LoginCheckerModule._validate_bool) {
                    $('#form').submit();
                }
            },
            _removeEmailError: function() {
                $('#email_required').remove();
                $('#email_format_wrong').remove();
            },
            _removePasswordError: function () {
                $('#password_required').remove();
            }
        };
        LoginCheckerModule.init();
        
    }());
});