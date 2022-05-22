# Documentation and User's Manual for cmy-OK
## by Amanda Darmosaputro

## Introduction

cmy-OK is a web-based application meant to help colorblind designers with interpreting colors onscreen. As its primary function, the website allows users to select a color from a color-field or any pixel onscreen, and to get that color's information. The project uses Python, Flask, HTML, CSS, and JavaScript.

## Compiling

After unzipping the project folder in VS Code into an isolated folder/directory, run Flask app via typing and entering "flask run". Click through the Github Preview URL output by the terminal. This will open a browser or tab window with the cmy-OK website.

## Video

Narrated video is linked here: https://youtu.be/F88Y0rHq-Wg

## Features

### Color-field and Eyedropper Tool

Upon clicking through the URL, we land on the index page of cmy-OK. From here we have a few options, but the primary tool used in this web app is the color-input field (easily implemented thanks to the basic prebuilt <input type="color"> in HTML) and the eyedropper tool, which is built within the color-input field.

The user can select a color within the color-input field in one of two ways:
1. After opening the color-input field with a click, select a color manually by clicking somewhere within the field
2. After opening the color-input field with a click, click on the eyedropper icon, which will turn the user's cursor into a magnifying lens. Then, click anywhere onscreen to pick up a pixel and its color.

Once the user selects a color, cmy-OK will get the hexcode, color name, and rgb values of the selected color, all of which will be displayed next to the color-input field (or below it if using eyedropper on the index page). They can press one of two buttons (if on the index page, only the second button):
1. "set bg" to see the color at large by setting the page background color to the selected color, or
2. "look up" is an outbound link to look up the selected color on Encycolorpedia.com.

#### Using this tool anywhere onsite

Along with its eyedropper tool, the color-input field is omnipresent, residing in the navigation bar stickied at the top of each page (in addition to the central one located on the index page). This way, the user has access to this primary tool at all times regardless of where they are within the site.

#### Using the eyedropper tool offsite

Important to note is that the eyedropper can be used to pick up any pixel on the user's screen, even beyond the website's own window, and even beyond the current monitor on any linked monitor displays. If the user primarily wishes to use the eyedropper tool for a work in progress on their computer (say for photos in Photoshop, drawings in Illustrator, renders in Rhino, etc.), they can simply remain on the index page of cmy-OK and use the eyedropper tool that resides there.

### Additional Features

The user is also provided other features:

0. Toggle dark mode
1. See typical color-fields
2. Upload and inspect an image
3. Why? & more resources

#### Toggle dark mode

Once beyond the index page, there is a dark-mode toggle button on the upper right in the navigation bar. If the user has not yet changed the page background color, this will toggle between a black background with white text and the original white background with dark text. If the user has already changed the page background color, the toggle works the same, except the background will switch between black and the user-selected color.

This feature was implemented for users who may prefer to read images within a black background.

#### See typical color-fields

On this page, users can see images of the standard forms of color-fields as seen in many design softwares, namely the (vertical) hue bar and wheel. Hovering and lingering the cursor over different parts of the color-field images will reveal in a pop-up tooltip the color name identification (or specifically, hue) of that spot or region which is being hovered over. There is a button to toggle on/off guides that roughly divide the color-field images into sections that a colorblind user may typically find harder to see.

The user may also choose to use the eyedropper tool on these color-field images.

#### Upload and inspect an image

On this page, users can upload their own image, which then resides in the static/uploads/ folder, and is displayed back to them on the refreshed webpage. File uploads are limited to .png, .jpg, and .jpeg filetypes. Once uploaded and displayed, the user can implement the eyedropper tool onto the image.

After the user is done handling the image, it is best practice for them to delete the image from the server by clicking the "delete" button below the displayed image. This is ideal both for storage-minimizing purposes on the back end, and for the interest of privacy for the user.

#### Why? & more resources

Aside from the above main features, there is an option to go to an "about" page (titled "why?") which explains the origins of cmy-OK, as well as a page with additional resources for color-reading.