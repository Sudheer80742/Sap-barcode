sap.ui.define([],()=>{
    "use restrict"

    return {eli(oAr){
        var oa=parseInt(oAr)
        if(oa>100){
            return "Success"
        }else{
            return "Error"
        }
    }
}
})