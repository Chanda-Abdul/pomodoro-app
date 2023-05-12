# Frontend Mentor - Pomodoro app

![Design preview for the Pomodoro app coding challenge](./assets/preview.jpg)

This is a solution to the [Pomodoro app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 



## The challenge

Your challenge is to build out this Pomodoro timer app and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:
- [ ] View the optimal layout for the interface depending on their device's screen size
  - [x] Mobile-first, for viewports <b>< 600px</b>
  - [ ] Tablet(Portrait and Landscape), for viewports from <b>600px</b> to <b>1200px</b> <!-- TO-DO => review tablet styles -->
  - [ ] Desktop for viewports <b>< 1200px</b><!-- TO-DO => review desktop styles -->
- [x] Set a pomodoro timer and short & long break timers
- [x] Customize how long each timer runs for
- [x] See a circular progress bar that updates every minute and represents how far through their timer they are
- [x] Customize the appearance of the app with the ability to set preferences for colors and fonts

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### Screenshot

![](./screenshot.jpg)


### Links

- Solution URL: [here](https://github.com/Chanda-Abdul/pomodoro-app)
- Live Site URL: [here](https://cozy-gelato-f57a29.netlify.app/)

## My process

### Built with

  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript icon" height="30" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS icon" height="30" /><img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass icon" height="30" /><img src="https://camo.githubusercontent.com/56a25d7a80ecd7be0919314d76dcae961ea7aac32dac11a7aa81644afa6daa53/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d42454d26636f6c6f723d303030303030266c6f676f3d42454d266c6f676f436f6c6f723d464646464646266c6162656c3d" alt="BEM icon" height="30" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML icon" height="30" /><img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify icon" height="30" /><img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma icon" height="30" />


### What I learned
- I  incorporated  a Sass theme [`/styles/sass/themes/_themes.scss`](/styles/sass/themes/_themes.scss) to update the font and accent color settings.
- I implemented a `<form>` `<input>` radio button on the main page to allow users to select the desired time type on the slider/toggle. I did something similar for custom color and font settings within the modal. This would make  default radio button styles hidden, while keeping radio functionality. An `input` could be selected and updated in JavaScript.
  - This is what it looks like in the HTML
    ```html
       <form class="slider">
        <fieldset class="slider__container">
          ...
          <input type="radio"
                 class="slider__input"
                 name="timer-option"
                 value="shortBreak"
                 id="short-break-option">
          <label for="short-break-option"
                 class="slider__label">short break</label>
          ...
        </fieldset>
      </form>
      ```
  - This is what it looks like in the CSS
      ```css
      .slider {
        ...
        &__input[type="radio"] {
          &:not(:checked),
          &:checked {
            display: none;
          }
        }

        ...

      &__input[type="radio"]:checked+&__label {
        ...
      }
      &__input[type="radio"]:not(:checked)+&__label {
        ...
      }           
            
      
      ```
  - and this is what it looks like in JavaScript
  ```ts
    const timerOptions = document.querySelectorAll('input[name="timer-option"]');

    timerOptions.forEach((timer) => {
      timer.addEventListener('change', handleTimerOption);
    });

    function handleTimerOption(e) {
      timer.currentTimer = e.target.value;
      updateTimerOption();
    }

    function updateTimerOption() {
      timerOptions.forEach((timerOpt) => {
        timer.currentTimer === timerOpt.value
          ? (timerOpt.checked = true)
          : (timerOpt.checked = false);
      });

      updateRemainingTime();
    }
  ```

- Creating the circle progress indicator was quite a challenge. I had to do a lot of math to figure out the right radius and diameter values in JavaScript, and then update the CSS every second during the countdown to make sure the indicator looked and behaved correctly as the time ticked away. 

- I also incorporated some UI/UX elements,  
  - I added an 🍅 icon that serves as a visual indicator, allowing users to easily track the number of remaining pomodoros they need to complete. This enhances the user experience by providing a quick and visual reference of their progress towards their goals. 
  - An info box, to provide users with a clear understanding of the app's purpose.  This ensures that users can easily grasp the functionality and benefits of the application. and a more information hover if they would like to know more
  - An instructions section in the modal, so that the user can understand why they could select the timer settings. 
- To efficiently manage and track the timer data, I utilized an object data structure. Using objects ensure smooth handling and organization of the information throughout. The data remains organized, allowing for easy retrieval and manipulation as needed.
    ```ts
    const timer = {
      settings: {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 30,
        pomodorosRemainingUntilLongBreak: 4,
        numberOfPomodoros: 4,
      },
      currentTimer: 'pomodoro' || 'shortBreak' || 'longBreak',

      status: {
        currentStatus: 'pause' || 'start' || 'restart' || 'default',
        nextStatus: 'pause' || 'start' || 'restart' || 'default',
      },
    };

    let remainingTime = {
      timerLength: timer.settings[timer.currentTimer] * 60,
      timeRemaining: timer.settings[timer.currentTimer] * 60,
      minutes: timer.settings[timer.currentTimer],
      seconds: 0,
      progressPercentage: 1,
    }; 
    ```
### Continued development
- Add Feedback, sound or visual, when time ends/changes
- light/dark mode
- info section

### Useful resources
- [Theming Web Apps with SASS](https://medium.com/@dmitriy.borodiy/easy-color-theming-with-scss-bc38fd5734d1)
- [JavaScript DOM Manipulation, Project 4](https://youtu.be/5fb2aPlgoys?t=7252) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [JavaScript DOM Manipulation, Project 2](https://youtu.be/5fb2aPlgoys?t=7252) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) - The `setInterval()` method repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
- [clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) - The global `clearInterval()` method cancels a timed, repeating action which was previously established by a call to `setInterval()`.
- [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) - The global `setTimeout()` method sets a timer which executes a function or specified piece of code once the timer expires.
- [How to build a Pomodoro Timer App with JavaScript](https://freshman.tech/pomodoro-timer/) -  In this tutorial, you’ll learn how to create such a timer in the browser with JavaScript..
- [The Pomodoro Technique](https://todoist.com/productivity-methods/pomodoro-technique) - What is the Pomodoro Technique and how to use it
- [Project 1, Advanced CSS and Sass Udemy Course by Jonas Schmedtmann](https://www.udemy.com/course/advanced-css-and-sass) 
- [Pure CSS Toggle Multi-Switch (Codepen)](https://codepen.io/markcaron/pen/qXYJVm)
- [How To Make Circular Progress Bar Using HTML CSS JavaScript | Neomorphism Progress Bar](https://www.youtube.com/watch?v=mSfsGTIQlxg)
- [How to Build a Modal with JavaScript](https://www.freecodecamp.org/news/how-to-build-a-modal-with-javascript/)

## Author

- Website - [Chanda Abdul](https://www.Chandabdul.dev)
- Frontend Mentor - [@Chanda-Abdul](https://www.frontendmentor.io/profile/Chanda-Abdul)
- GitHub - [github.com/Chanda-Abdul](https://github.com/Chanda-Abdul)



