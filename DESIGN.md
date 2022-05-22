# Design Document for cmy-OK
## by Amanda Darmosaputro

## Technical Decisions
### In this section, share and justify the technical decisions you made.

The main tool in cmy-OK -- the eyedropper tool -- was the most daunting to implement. After many struggles trying to find the right way to deliver pixel data upon hovering or clicking on it, I looked into existing web apps which deal with colorpicking, and found many simpler ones to use the very basic color-input which exists for HTML. This solved many issues as it already had many of my desired features built into it -- the ability to pick a color and return its RGB/HSL/hex values, to conversely look up a color based on those values, and most importantly, the eyedropper tool, which even works beyond the current browser window.

After that, the important focus of the project is to implement a tool which can return a name for the color, rather than computerized values and parameters. At this point I found a few other web apps which have such a feature, and that many of them used Chirag Mehta's Name that Color JavaScript library. However, the color dictionary it uses is not helpful for colorblind users  -- what color does "Barley Corn" or "Spring Leaves" look like? Still using Mehta's NTC, I sought out other color dictionaries via https://people.csail.mit.edu/jaffer/Color/Dictionaries and found the NBS/ISCC System, which labels colors more straightforwardly as "grayish yellow green" or "moderate orange yellow" etc.

For the "typical colorfields," I originally wanted to output the name of the color under the cursor as a text on hover. This was more complicated than I had assumed, especially when trying to get the actual color under the cursor. In the end I settled with creating manually-generated HTML image maps of the regions on the color bar and wheel, manually naming these regions in their "title" fields by their color, and displaying the title as a tooltip when you hover over those regions.

## Ethical Decisions
### What motivated you to complete this project? What features did you want to create and why?

My friend is colorblind (with a combination of deuteranopia and protanopia). We are classmates in the architecture program at the Graduate School of Design, where much of our efforts are spent on visual representation. He makes beautiful work, but due to his unfamiliarity with a full range of color, many of the images in his portfolio tend to be in black and white, especially from earlier work.

These days, he produces many high-resolution rendered images in color, and often asks me to cross-check his images to help make sure the colors appear natural, or sometimes simply to colormatch across different images or objects. For him it is difficult to tell apart red/green/yellow/brown, or blue/purple, which sometimes results in uncannily colored trees, skies, wood or concrete surfaces, etc. in his images. Sometimes it's a matter of the overall mood or temperature of the image.

The intention is to create a tool which would help someone like him become more familiar with the non-colorblind spectrum of color. This includes two main features: (1) something that would help him better read standard color-picker field UIs in standard design softwares (ie. hue bars and color wheels), by telling him where different colors are typically located within those fields, and (2) something that would allow him to select a color from an image he's working on, and for it to spit back out the conventionally understood name for that color.

### Who are the intended users of your project? What do they want, need, or value?

The intended direct users of this project are colorblind designers who are concerned about the color-related "naturalness" of their visual work's portrayal of natural entities. In the most basic sense, these are people who care about and/or are interested in how non-colorblind people see the world.

As for indirect users, perhaps this might include developers of design softwares and colorpicker UIs who would like to better serve (and/or understand) colorblind users of their own.

### How does your project's impact on users change as the project scales up?

Among the biggest concerns are potential security issues that may arise from the HTML eyedropper tool, which is able to read pixels anywhere on the user's screen (and other linked display screens). I lack the knowledge to predict these issues in detail, but it seems to me that someone could implement this tool on a site and misuse it in order to possibly retrieve otherwise private onscreen information from its users.

Also mildly concerned about the subjectivities of color and many different color dictionaries out there which might make it futile to attempt to implement a singular web app/program/etc. that fairly serves colorblind users. It might be a touchy topic? I imagine it'd be nice to allow the user to feed in their personally preferred color dictionaries for the eyedropper to read against, or even to create their own color dictionary.
