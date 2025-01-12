module.exports = function() {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://api-maps.yandex.ru/2.1/?apikey=035b796f-9668-4e4d-9fa3-dd2a1ca31999&lang=ru_RU" type="text/javascript"></script>
        <style>
            body {
                margin: 0;
            }
            
            .map-holder {
                width: 100%;
                height: 100vh;
                border: 1px solid #000;
            }
        </style>
        <title>Map</title>
    </head>
    
    <body>
        <div id="map" class="map-holder">
        </div>
        <script>
            ymaps.ready(init);
    
            function init() {
                var myMap = new ymaps.Map("map", {
                    center: [55.76, 37.64],
                    zoom: 7,
                    controls: []
                });
            }
        </script>
    </body>
    
    </html>`
}