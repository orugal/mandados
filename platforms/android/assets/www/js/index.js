$(document).ready(function(){
    app.initialize();
});

var app = {
    urlApi:"http://192.168.0.26/mandados/index.php",
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
    },
    envioAjax:function(url,datos,callback)
    {
        $.ajax({
            url:  url,
            data: datos,
            type: "POST",
            dataType: "json",
            success:function(json)
            {
                callback(json)    
            },
            error:function(e) {
                //$("#ERRORES").html(e.statusText + e.status + e.responseText);
            }
        });
    },
    enviaSolicitud:function()
    {
        var tipoSolicitud        = $("#tipoSolicitud").val();
        var ciudad      = $("#ciudad").val();
        var telefono    = $("#telefono").val();
        var fechaHora   = $("#fechaHora").val();
        var descripcion = $("#descripcion").val();

        if(tipoSolicitud == "")
        {
            app.alerta("Verifique los campos","Debe seleccionar el tipo de servicio.","Aceptar",function(){});
        }
        else if(ciudad == "")
        {
            app.alerta("Verifique los campos","Debe seleccionar la ciudad donde reside.","Aceptar",function(){});
        }
        else if(telefono == "")
        {
            app.alerta("Verifique los campos","Escriba un número de teléfono con el cual nos podamos poner en contacto con usted.","Aceptar",function(){});
        }
        else if(fechaHora == "")
        {
            app.alerta("Verifique los campos","Seleccione la fecha y la hora del servicio.","Aceptar",function(){});
        }
        else if(descripcion == "")
        {
            app.alerta("Verifique los campos","Escriba una breve descripción del servicio que le prestaremos.","Aceptar",function(){});
        }
        else
        {
            navigator.notification.confirm("Está a punto de generar una solicitud, ¿desea continuar?", function(buttonIndex){
                if(buttonIndex == 1)
                {
                    //alert("sdsd")
                    var parametros = $("#formSolicitud").serialize()+"&accion=1&idUsuario="+localStorage['sesion'];
                    app.envioAjax(app.urlApi,parametros,function(json){
                        if(json.continuar == 1)
                        {
                            app.alerta("PROCESO EXITOSO",json.mensaje,"CONTINUAR",function(){
                                document.location = 'solicitudes.html';
                            });
                        }
                        else
                        {
                            app.alerta("PROCESO FALLIDO",json.mensaje,"CONTINUAR",function(){});
                        }
                    });
                }
                else
                {
                    return false;
                }
            }, "CONFIRMACIÓN", ['Aceptar','Cancelar']);
        }
    }
};