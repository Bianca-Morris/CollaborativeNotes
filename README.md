# Redux Take Home Challenge

This is an assignment intended to be completed individually and with as little help form the TA's as you can manage.

This assignment was a real coding challenge presented to a former Horizons student as part of an interview process with a tech company, except the assignment was to use Flux instead of Redux.

## Your Task

You are meant to implement an interactive phone call scheduler using React and Redux. There should be several 1 hour time slots in a given day between 9 and 5. When the app first starts, these time slots are all open. When clicking any time slot, a modal should open that enables the user to enter a name and phone number of the person with whom they are scheduling a phone call during that time slot. Upon submitting the modal, that time slot should visibly change color and update to display the information just entered. Clicking the same slot again should open the same modal, but with its input fields already populated with the information already given to that time slot. This should allow the user to easily fix a typo and resubmit, saving the updated information. The ultimate goal would be to have a week's worth of days where each day has 8 hour long time slots between 9 and 5, but just getting one day working would be acceptable. You should also do your best to make the app as presentable as possible, looks matter to both employers and clients!

## Go get 'em

You have been provided with a boilerplate that has React and Redux set up. You have ALSO been provided with materials intended to provide enough guidance for you to be able to write the boilerplate yourself from scratch if you want to: [This new set up writeup](SETUP.md) and the [React From Scratch writeup](https://github.com/horizons-school-of-technology/week05/blob/master/day5/full-stack-react.md) you encountered a few weeks ago.

You haven't yet used modals in React. It's quite common that a coding challenge would have at least one thing that is new to you. Your first step would be to google it, which would probably land you at [this npm package](https://www.npmjs.com/package/react-modal) pretty quickly.
