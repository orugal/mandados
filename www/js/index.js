$(document).ready(function(){
    app.initialize();
});

var app = {
    startApp:function()
    {
        $('#fechaHora').datetimepicker({
            format: 'YYYY-MM-DD HH:mm'
        });
    },
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');

    },
    alerta:function(titulo,mensaje,nombreBoton,callback)
    {
        navigator.notification.alert(mensaje, callback, titulo, nombreBoton)
    },
    login:function()
    {
        //alert("sdfdasfdsf")
        var correo  =  $("#correo").val();
        var clave   =  $("#clave").val();
        if(correo == "")
        {
            app.alerta("Verifique los campos","Debe escribir su correo electrónico","Aceptar",function(){});
        }
        else if(clave == "")
        {
            app.alerta("Verifique los campos","Debe escribir su clave de acceso","Aceptar",function(){});
        }
        else
        {
            localStorage['sesion'] = 1;
            document.location = "home.html";
        }
    },
    startGPS:function()
    {
        navigator.geolocation.getCurrentPosition(function(position){
            //success
            $("#lat").val(position.coords.latitude);
            $("#lon").val(position.coords.longitude);

        },function(error){

        },{ timeout: 30000 });
    }
};