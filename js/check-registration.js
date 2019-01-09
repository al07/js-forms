$(document).ready(function() {

    
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
                
                email_empty_tooltip = $('<div class="notify notify--error mb-20" id="email_required">Введите email</div>');
                email_format_tooltip = $('<div class="notify notify--error mb-20" id="email_format_wrong">Неверный формат email</div>');
                
                password_empty_tooltip = $('<div class="notify notify--error mb-20" id="password_required">Введите пароль</div>');
                
                
                login_or_password_tooltip = $('<div class="notify no-paddings" id="login_existed"><div class="notify no-radius-bottom notify--error">Данный email уже занят</div><div class="notify no-radius-top"><p>Используйте другой email чтобы создать новый аккаунт</p> <p> Или воспользуйтесь <a href="#!">восстановлением пароля </a>, чтобы войти на сайт.</p></div></div>');
                
                
                
                if (email.val().length == 0) {
//                    $('#email_required').remove();
                    LoginCheckerModule._removeEmailError();
                    email_empty_tooltip.insertBefore(form);
                    _cur_validate = false;
                } else {
                    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                    if( !(pattern.test(email.val())) ) {
//                        $('#email_format_wrong').remove();
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
                    _mail_correct = email.val() == "mail@mail.ru";
                    
                    
                    if (_mail_correct) {
                        $('#login_existed').remove();
                        login_or_password_tooltip.insertBefore(form);
                        _cur_validate = false;
                    }
                }
                
                email.on('focus', function() {
                        LoginCheckerModule._removeEmailError();
                        $('#login_existed').remove();
                });
                password.on('focus', function() {
                        LoginCheckerModule._removePasswordError();
                });
                console.log("_cur_validate= " + _cur_validate);
                if (!(_cur_validate)) {
                    
                    event.preventDefault();
                }
                LoginCheckerModule._validate_bool = _cur_validate;
                
                
                
            },
            _send_form: function(event) {
                console.log("Зашел отправить");
                if(LoginCheckerModule._validate_bool) {
                    $('#form').submit();
                } else {
                    event.preventDefault();
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