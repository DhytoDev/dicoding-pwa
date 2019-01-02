document.addEventListener(
    "DOMContentLoaded", function () {
        var menus = document.querySelectorAll(".sidenav");
        M.Sidenav.init(menus);
        loadNav();
        includeHTML();

        var elems = document.querySelectorAll('.slider');
        M.Slider.init(elems);

        var scroll = document.querySelectorAll(".scrollspy");
        M.ScrollSpy.init(scroll, {
            scrollOffset: 50
        });

        function loadNav() {
            var xHttp = new XMLHttpRequest();

            xHttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status !== 200) return;


                    document.querySelectorAll(".topnav, .sidenav").forEach(function (menu) {
                        menu.innerHTML = xHttp.responseText;
                    });

                    document.querySelectorAll(".sidenav a, .topnav a").forEach(function (nav) {
                        nav.addEventListener(
                            "click", function () {
                                var sideNav = document.querySelector(".sidenav");
                                M.Sidenav.getInstance(sideNav).close();
                            }
                        );
                    });
                }
            };

            xHttp.open("GET", "nav.html", true);
            xHttp.send();
        }
    }
);

function includeHTML() {
    /*loop through a collection of all HTML elements:*/
    var z = document.getElementsByTagName("*");
    for (var i = 0; i < z.length; i++) {
        var elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        var file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status === 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};