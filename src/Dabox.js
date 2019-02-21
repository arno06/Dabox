/**
 * @author Arnaud NICOLAS - arno06@gmail.com
 */
var Dabox = (function()
{
    var publicAPI = {
        display:function(pContent)
        {
            if(!created)
                createDaBox();
            var overlay = document.getElementById("DaboxHide");
            var box = document.getElementById("Dabox");
            M4Tween.killTweensOf(overlay);
            M4Tween.killTweensOf(box);
            box.innerHTML = "";
            box.style.width = "auto";
            box.innerHTML = pContent;
            overlay.style.display = "block";
            box.style.display = "block";
            box.style.filter = "alpha(opacity=0)";
            M4Tween.to(overlay, .2, {"opacity":.95});
            M4Tween.to(box, .3, {"opacity":1});
            box.style.left = "50%";
            box.style.marginLeft = "-"+(box.offsetWidth * .5)+"px";
            var closeBtn = document.createElement("div");
            var cross = document.createElement("a");
            cross.className = "icon-close";
            cross.href="#";
            closeBtn.appendChild(cross);
            box.appendChild(closeBtn);
            closeBtn.classList.add('close');
            cross.addEventListener('click', closeBoxHandler);
            if(displayHandler)
                displayHandler(box, overlay, closeBtn);
        },
        hide:function()
        {
            var a = document.getElementById("DaboxHide");
            var b = document.getElementById("Dabox");
            M4Tween.killTweensOf(a);
            M4Tween.killTweensOf(b);
            M4Tween.to(a, .3, {"opacity":0}).onComplete(function(){a.style.display="none";b.style.display="none";});
            M4Tween.to(b, .2, {"opacity":0});
        },
        register:function(pElement, pIdContent)
        {
            if(content[pIdContent])
            {
                pElement.setAttribute("rel", pIdContent);
                pElement.addEventListener('click', aClickDisplayBox);
                return;
            }
            var t = document.getElementById(pIdContent);
            if(!t)
                return;
            content[pIdContent] = t.innerHTML;
            t.parentNode.removeChild(t);
            pElement.setAttribute("rel", pIdContent);
            pElement.addEventListener('click', aClickDisplayBox);
        },
        onDisplay:function(pHandler)
        {
            displayHandler = pHandler;
        }
    };
    var created = false;
    var content = {};
    var displayHandler;

    function aClickAsyncBox(e)
    {
        if(e)
        {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        }
        var rel = e.currentTarget.getAttribute("rel");
        Request.load(rel).onComplete(displayBoxAjax);
    }


    function displayBoxAjax(pResponse)
    {
        publicAPI.display(pResponse.responseText);
    }

    function createDaBox()
    {
        var hide = document.createElement("div");
        hide.setAttribute("id", "DaboxHide");
        document.body.appendChild(hide);
        var box = document.createElement("div");
        box.setAttribute("id","Dabox");
        document.body.appendChild(box);
        created = true;
        hide.addEventListener('click', closeBoxHandler);
    }

    function closeBoxHandler(e)
    {
        if(e)
        {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        }
        publicAPI.hide();

    }

    function aClickDisplayBox(e)
    {
        if(e)
        {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        }
        var rel = e.target.getAttribute("rel")?e.target.getAttribute("rel"):e.target.parentNode.getAttribute('rel');
        publicAPI.display(content[rel]);
    }

    function initDaBox()
    {
        document.querySelectorAll('*[rel^="Dabox"]').forEach(function(a)
        {
            if(a.rel == "")
                return;
            var r = a.getAttribute("rel"), t;
            t = r.match(/Dabox\[([a-z0-9\_\-]+)\]/);
            t = t?t[1]:null;
            if(t)
            {
                publicAPI.register(a, t);
            }
            if(t = r.match(/Dabox\[async\:([^\]]+)\]/))
            {
                a.setAttribute('rel', t[1]);
                a.addEventListener('click', aClickAsyncBox);
            }
        });
    }
    NodeList.prototype.forEach = Array.prototype.forEach;
    window.addEventListener("load", initDaBox);
    return publicAPI;
})();
