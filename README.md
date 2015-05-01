# fb-calendar

## The task
Given a set of events, each with a start time and end time,
render the events on a single day calendar (similar to Outlook,
Calendar.app, and Google Calendar). There are several properties
of the layout:

1. No events may visually overlap.
2. If two events collide in time, they MUST have the same width. This is an invariant. Call this width W.
3. W should be the maximum value possible without breaking the previous invariant.

Each event is represented by a JavaScript object with a start and end attribute.
The value of these attributes is the number of minutes since 9am.
So {start:30, end:90) represents an event from 9:30am to 10:30am.
The events should be rendered in a container that is 620px wide
(600px + 10px padding on the left/right) and 720px long (the day will end at
9pm). The styling of the events should match the attached screenshot.

You may structure your code however you like, but you must implement the
following function in the global namespace. The function takes in an array of
events and will lay out the events according to the above description.

```js
function layOutDay(events) {}
```

This function will be invoked from the console for testing purposes. If it
cannot be invoked, the submission will be rejected. This function should be 
idempotent.

In your submission, please implement the calendar with the following input:

```js
[ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
```

## Solution
I implemented the task without using any third party library, for testing I
used jest.
