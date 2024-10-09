sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "../util/JsBarcode"

],
    function (Controller, formatter) {
        "use strict";

        return Controller.extend("project10.controller.View1", {
            formatter: formatter,
            onInit: function () {
                var dModel = {
                    "Sam": [{
                        name: "sudheer",
                        id: 64
                    },
                    {
                        name: "raji",
                        id: 57
                    }
                    ]
                }
                var oD = new sap.ui.model.json.JSONModel(dModel)
                this.getView().setModel(oD, "eata");
                var oData = new sap.ui.model.json.JSONModel("/model/Sam.json")
                this.getView().setModel(oData, "data");
            },
            async onShow() {
                this.oDialog ??= await this.loadFragment({
                    name: "project10.fragments.add"
                })
                this.oDialog.open()
            },
            onClick(oEvent) {
                this.getOwnerComponent().getRouter().navTo("RouteView2", {
                    path: oEvent.getSource().getBindingContextPath()
                })
            },
            async onReq1() {
                this.oDialog1 ??= await this.loadFragment({
                    name: "project10.fragments.tab"
                })
                this.oDialog1.open()
            },
            onClickThis(oEvent) {
                this.oDialog1.close()
                var oPath = oEvent.getSource().getCells()[1].getText();
                this.byId("val").setValue(oPath);
            },
            onNav3() {
                this.getOwnerComponent().getRouter().navTo("RouteView3")
            },
            onGenerateBarcode() {
                var oInput = this.byId("barcodeInput").getValue();
                var oData = "https://barcodeapi.org/api/" + oInput;
                this.byId("barcode").setSrc(oData);
            },
            onNav4() {
                this.getOwnerComponent().getRouter().navTo("RouteView4")
            },
            onGenerateBarcode1() {
                var oInput = this.byId("barcodeInput1").getValue();
                JsBarcode(".barcode1", oInput, {
                    width: 1,
                    height: 50,
                    fontSize: 10
                });
            }
        });
    });
