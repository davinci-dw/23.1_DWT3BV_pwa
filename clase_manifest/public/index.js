if(navigator.serviceWorker && navigator.serviceWorker.register){
    navigator.serviceWorker.register('sw.js')
    .then(function(reg){
        console.log('Registro exitoso', reg)
    })
    .catch(function(err){
        console.warn('Error al tratar de registrar el sw', err)
    })
}