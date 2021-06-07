function getCookie(c_name) 
{
    return localStorage.getItem(c_name);
}

function setCookie(c_name, value) 
{
    return localStorage.setItem(c_name, value);
}

function vh(v) 
{
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}
  
function vw(v) 
{
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}

function vmin(v) 
{
    return Math.min(vh(v), vw(v));
}

function vmax(v) 
{
    return Math.max(vh(v), vw(v));
}

var isOn = true;

$(function() {
    if (typeof Snowflakes !== 'undefined' && Snowflakes !== undefined && Snowflakes)
    {
        var sf = new Snowflakes ({
            count: 50,
            minOpacity: 0.1,
            maxOpacity: 0.95,
            minSize: vmin(3),
            maxSize: vmin(10),
            rotation: true,
            speed: 2,
            wind: true,
            zIndex: 100
        });
    
        function hideBottles(on)
        {
            if (on) {
                sf.stop();
                $(".snowflakes").hide();
                isOn = false;
                window.setCookie("bottles", "false", 999);
                $("#toggleBottles").prop("checked", "");
            } else {
                sf.start();
                $(".snowflakes").show();
                isOn = true;
                window.setCookie("bottles", "true", 999);
                $("#toggleBottles").prop("checked", "checked");
            }
        }
    
        $(document).on("change", "#toggleBottles", function() {
            hideBottles(isOn);
        });
    
        var cookie = window.getCookie("bottles");
        if (cookie != null)
        {
            hideBottles(cookie === "false");
        } else {
            hideBottles(true);
        }
    }

    /**
     * CSS workaround because you can't select parent element from children (#wrapper > #toggleMenu)
     */
    $(document).on("change", "#toggleMenu", function() {
        var $wrapper = $("#wrapper");
        if ($(this).prop("checked")) {
            $wrapper.css("grid-template-rows", "17% 25% 43% 15%").css("-ms-grid-rows", "17% 25% 43% 15%");
            return;
        }
        $wrapper.css("grid-template-rows", "17% 8% 60% 15%").css("-ms-grid-rows", "17% 8% 60% 15%"); 
    });
});