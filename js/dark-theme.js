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

//identify the toggle switch HTML element
const toggleSwitch = document.querySelector('#theme-switch');

//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(value) {
    if (value == "light") {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.value = "dark";
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        toggleSwitch.value = "light";
    }    
}

//listener for changing themes
toggleSwitch.addEventListener('click', (e) => {switchTheme(e.target.value)}, false);

//pre-check the dark-theme checkbox if dark-theme is set
if (document.documentElement.getAttribute("data-theme") == "dark"){
    toggleSwitch.value = "dark";
} else {
    toggleSwitch.value = "light";
}