sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project10.controller.View3", {
        onInit: function () {
            // Initialize a JSON Model
            this.oModel = new JSONModel({
                imageData: null
            });
            this.getView().setModel(this.oModel);
        },

        onOpeningCam: function () {
            // Check if the browser supports getUserMedia
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Create a video element if it doesn't already exist
                    this.video = document.createElement("video");
                    // this.video.setAttribute("width","320")
                    // this.video.setAttribute("height","240")
                    this.video.setAttribute("autoplay", true);
                    // Clear the container and append the video element
                    const oVBox = this.getView().byId("cont");
                    oVBox.removeAllItems();
                    oVBox.getDomRef().appendChild(this.video); 
                    this.getView().byId("cam").setVisible(false)
                    this.getView().byId("pic").setVisible(true)
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then((stream) => {
                            this.stream = stream; // Store the media stream
                            this.video.srcObject = stream;
                        })
                        .catch((error) => {
                            console.error("Error accessing the camera: ", error);
                        });

            } else {
                console.error("Camera not supported on this browser.");
            }
        },

        onTakePicture: function (oEve) {
            // Create a canvas to take the snapshot
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            context.drawImage(this.video, 0, 0);
            const imageData = canvas.toDataURL("image/png");

            // Store image data in the JSON model
            this.oModel.setProperty("/imageData", imageData);

            // Update the Image control source
            this.getView().byId("capturedImage").setSrc(imageData);
            this.getView().byId("imageInfo").setText("Image captured!");

            // Stop the video stream
           this.stream.getTracks().forEach(track => track.stop());
            this.video.pause();

            // Clear the video element from the container
            const oVBox = this.getView().byId("cont");
            oVBox.removeAllItems(); // Clear the video element
           // this.video = null; // Reset video reference
           this.getView().byId("cont").setVisible(false)
           oEve.getSource().setVisible(false)
           this.getView().byId("upd").setVisible(true)
        },
        AddImage(){
            this.getView().byId("cont").setVisible(true)
            this.onOpeningCam()
        }
    });
});
