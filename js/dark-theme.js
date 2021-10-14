document.addEventListener("DOMContentLoaded", function(){
    //https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting

    //determines if the user has a set theme
    function detectColorScheme(){
        var theme="light";    //default to light

        //local storage is used to override OS theme settings
        if(localStorage.getItem("theme")){
            if(localStorage.getItem("theme") == "dark"){
                var theme = "dark";
            }
        } else if(!window.matchMedia) {
            //matchMedia method not supported
            return false;
        } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
            //OS theme setting detected as dark
            var theme = "dark";
        }

        //dark theme preferred, set document with a `data-theme` attribute
        if (theme=="dark") {
             document.documentElement.setAttribute("data-theme", "dark");
        }
    }
    detectColorScheme();

    //identify all the toggle switch HTML elements
    const toggleSwitches = document.querySelectorAll('#theme-switch');

    //function that changes the theme, and sets a localStorage variable to track the theme between page loads
    function switchTheme(e) {
        if (document.documentElement.getAttribute('data-theme') == "light") {
            localStorage.setItem('theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
        }    
    }

    //listener for changing themes
    for (var i = 0, len = toggleSwitches.length; i < len; i++) {
        toggleSwitches[i].addEventListener('click', switchTheme, false);
    }  
})