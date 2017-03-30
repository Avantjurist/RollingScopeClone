$(".add-dlg-button").on("click", function() {
    var name = $(".chat-menu > input");
    var newUser = $(`
    <li>
        <a href=""><img class="avatar" src="./img/default-avatar.png" alt="Profile photo"></a>
        <h3>${name.val() || 'Ivan Ivanov'}</h3>
        <p class="message">Thank you!</p>
    </li>
  `);
    newUser.appendTo(".message-list");
    name.val("");
})

$(".add-currency").on("click", function() {
    if ($("*").is(".existBlr")) {
        $(".existBlr").remove();
    } else {
        var newCurrency = $(`
  <li class="existBlr">
      <div class="currency-name">
          <p>BYN</p>
      </div>
      <input id="blr" type="number" class="currency-input blr" value="1.97">
      <label for="blr"></label>
  </li>
  `);
        newCurrency.appendTo(".currency-list");
        $("#blr").css("width", "85");
        $("#blr").on("input", function() {
            if (this.value.length > 5) {
                this.value = this.value.substr(0, 5);
            }
            var newMoney = $(this).val();
            $(this).css("width", function() {
                return this.value.length * 25 + 10;
            })
            var newMoneyUsd = 0.51 * newMoney;
            if (newMoneyUsd > 1000) {
                newMoneyUsd = Math.round(newMoneyUsd);
            }
            usd.val(newMoneyUsd);
            if (usd.val().length > 5) {
                usd.val(usd.val().substr(0, 5));
            }
            usd.css("width", function() {
                return usd.val().length * 25 + 10;
            })
            var newMoneyGbr = 0.49 * newMoney;
            if (newMoneyGbr > 1000) {
                newMoneyGbr = Math.round(newMoneyGbr);
            }
            gbr.val(newMoneyGbr);
            if (gbr.val().length > 5) {
                gbr.val(gbr.val().substr(0, 5));
            }
            gbr.css("width", function() {
                return gbr.val().length * 25 + 10;
            })
        })
    }
})

$("#usd").css("width", "35");
$("#gbr").css("width", "85");
var usd = $("#usd");
var gbr = $("#gbr");
$("#usd").on("input", function() {
    var blr = $("#blr");
    if (this.value.length > 5) {
        this.value = this.value.substr(0, 5);
    }
    var newMoney = $(this).val();
    $(this).css("width", function() {
        return this.value.length * 25 + 10;
    })
    var newMoneyGbr = 0.96 * newMoney;
    if (newMoneyGbr > 1000) {
        newMoneyGbr = Math.round(newMoneyGbr);
    }
    gbr.val(newMoneyGbr);
    if (gbr.val().length > 5) {
        gbr.val(gbr.val().substr(0, 5));
    }
    gbr.css("width", function() {
        return gbr.val().length * 25 + 10;
    })
    if ($("*").is("#blr")) {
        var blr = $("#blr");
        var newMoneyBlr = 1.97 * newMoney;
        if (newMoneyBlr > 1000) {
            newMoneyBlr = Math.round(newMoneyBlr);
        }
        blr.val(newMoneyBlr);
        if (newMoneyBlr > 99999) {
            blr.val("99999");
            blr.css("width", function() {
                return blr.val().length * 25 + 10;
            })
        }
        if (blr.val().length > 5) {
            blr.val(blr.val().substr(0, 5));
        }
        blr.css("width", function() {
            return blr.val().length * 25 + 10;
        });
    }
})

$("#gbr").on("input", function() {
    if (this.value.length > 5) {
        this.value = this.value.substr(0, 5);
    }
    var newMoney = $(this).val();
    $(this).css("width", function() {
        return this.value.length * 25 + 10;
    })
    var newMoneyUsd = 1.04 * newMoney;
    if (newMoneyUsd > 1000) {
        newMoneyUsd = Math.round(newMoneyUsd);
    }
    usd.val(newMoneyUsd);
    if (newMoneyUsd > 99999) {
        usd.val("99999");
        usd.css("width", function() {
            return usd.val().length * 25 + 10;
        })
    }
    if (usd.val().length > 5) {
        usd.val(usd.val().substr(0, 5));
    }
    usd.css("width", function() {
        return usd.val().length * 25 + 10;
    })
    if ($("*").is("#blr")) {
        var blr = $("#blr");
        var newMoneyBlr = 2.06 * newMoney;
        if (newMoneyBlr > 1000) {
            newMoneyBlr = Math.round(newMoneyBlr);
        }
        blr.val(newMoneyBlr);
        if (newMoneyBlr > 99999) {
            blr.val("99999");
            blr.css("width", function() {
                return blr.val().length * 25 + 10;
            })
        }
        if (blr.val().length > 5) {
            blr.val(blr.val().substr(0, 5));
        }
        blr.css("width", function() {
            return blr.val().length * 25 + 10;
        });
    }
})


var temperature = $(".temperature");
temperature.addClass("temF");
$(".F").on("click", function() {
    if (temperature.hasClass("temC")) {
        temperature.removeClass("temC").addClass("temF");
        temperature.text(+temperature.text() + 32);
    }
})
$(".C").on("click", function() {
    if (temperature.hasClass("temF")) {
        temperature.removeClass("temF").addClass("temC");
        temperature.text(+temperature.text() - 32);
    }
})

var passwordBlock = $(".password-block");
passwordBlock.addClass("login-not-access");
passwordBlock.on("input", function() {
    if ($("#password").val().length >= 7) {

        passwordBlock.removeClass("login-not-access").addClass("login-access");
    } else {
        passwordBlock.removeClass("login-access").addClass("login-not-access");
    }
})

var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var emailBlock = $(".email-block");
emailBlock.addClass("login-not-access");
emailBlock.on("input", function() {
    // var blocks = $(".email-block, .password-block");
    if ($("#email").val().search(re) != -1) {

        emailBlock.removeClass("login-not-access").addClass("login-access");
    } else {
        emailBlock.removeClass("login-access").addClass("login-not-access");
    }
})

$('.signup-button').on({
    "click": function() {
        if (emailBlock.hasClass("login-access") && passwordBlock.hasClass("login-access")) {
            $(this).tooltip({
                items: ".signup-button",
                content: "singed up"
            });
            $(this).tooltip("open");
        }
    },
    "mouseout": function() {
        $(this).tooltip("disable");
    }
});

$('.signin-button').on({
    "click": function() {
        if (emailBlock.hasClass("login-access") && passwordBlock.hasClass("login-access")) {
            $(this).tooltip({
                items: ".signin-button",
                content: "singed in"
            });
            $(this).tooltip("open");
        }
    },
    "mouseout": function() {
        $(this).tooltip("disable");
    }
});


$(".valid-input").datepicker({
    dateFormat: "dd/mm/yy",
    minDate: 0
});
