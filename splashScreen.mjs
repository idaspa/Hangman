import {SPLASH_SCREEN} from "./intro.mjs";
import {CLEAR_SCREEN, CURSOR_HOME} from "./colors.mjs";
const SPLASH_SCREEN_MANAGER = {
    showScreen: function() {
        console.log(CLEAR_SCREEN);
        console.log(SPLASH_SCREEN[1] + CURSOR_HOME);
    }
}



//SPLASH_SCREEN_MANAGER.showScreen();
export { SPLASH_SCREEN_MANAGER };