from flask import Flask, flash, redirect, request, render_template, url_for, send_from_directory
import os
import urllib.request
from werkzeug.utils import secure_filename


# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Specify folder for uploaded images
UPLOAD_FOLDER = "static/uploads/"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Specify file extensions to only allow common static images
ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg"])

# Secret key for session
app.secret_key = "i_am_a_secret"


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/")
def index():
    """Homepage"""
    return render_template("index.html")

@app.route("/fields", methods=["GET", "POST"])
def fields():
    """Study standard colorfields"""
    return render_template("fields.html")

@app.route("/image", methods=["GET", "POST"])
def upload_image():
    """Upload image to be checked"""

    # User reached route via POST (as by submitting a form via POST)
    # Flask image upload guided by: https://flask.palletsprojects.com/en/2.1.x/patterns/fileuploads/
    if request.method == "POST":
        # Check if we already have a file
        if "file" not in request.files:
            flash("No file part")
            return redirect("/image")

        # Get file from form on page
        file = request.files["file"]

        # If no image uploaded, return message
        if file.filename == "":
            flash("No image selected for uploading")
            return redirect(request.url)

        # Check if there is a file and if it has an allowed file extension
        if file and allowed_file(file.filename):
            # Get the filename to make path for stored image
            filename = secure_filename(file.filename)

            # Save image into folder path of uploaded images
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

            # Flash message urging user to delete image when done
            flash("Image successfully uploaded and displayed below. Please take care to read our text below your image.")
            return render_template("image.html", filename=filename)

        # If user uploaded invalid filetype, return message
        else:
            # Message: Allowed file types are .png, .jpg, and .jpeg!
            ext = ', '.join(ALLOWED_EXTENSIONS)
            message = "Allowed file types are " + str(ext).upper() + "!"

            # Flash message
            flash(message)
            return redirect("/image")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("image.html")

@app.route("/display/<filename>")
def display_image(filename):
    """Create URL for image to be displayed"""

    # Guided by: https://tutorial101.blogspot.com/2021/04/python-flask-upload-and-display-image.html

    # Return stored image url to display via HTML <img src="">
    return redirect(url_for("static", filename="uploads/" + filename), code=301)

@app.route("/delete/<filename>", methods=["GET", "POST"])
def delete_image(filename):
    """Allow user to delete image from server"""

    # Guided by: https://stackoverflow.com/questions/68903485/flask-delete-image-from-static-boostrap-card

    # Delete file with filename from /static/uploads/
    os.remove(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    return redirect("/image")

@app.route("/about")
def about():
    """About CMY-ok"""
    return render_template("about.html")

@app.route("/test")
def test():
    """More resources"""
    return render_template("ughcopy.html")