$(function () {
    'use strict';

    var s,
        app = {

        settings : {
            a: 'b'
        },
        init : function(){
            s = this.settings;

            this.bindUiActions();
            this.socketConnect();
            this.socketEvents();
            this.cubeStuff();
        },

        bindUiActions : function () {
            var self = this;
        },

        socketConnect : function(){
            this.socket = io.connect();
        },

        socketEvents : function() {
            var self = this;

            this.socket.on('update', function(data){
                console.log("update: ", data);
            });
        },

        cubeStuff : function() {
            var container,
                stats;

            var camera,
                scene,
                renderer;

            var cube,
                plane;

            var targetRotation = 0;
            var targetRotationOnMouseDown = 0;

            var mouseX = 0;
            var mouseXOnMouseDown = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            init();
            animate();

            function init() {

                container = $('.container');

                camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
                camera.position.y = 150;
                camera.position.z = 500;

                scene = new THREE.Scene();

                // Cube
                var geometry = new THREE.BoxGeometry( 200, 200, 200 );

                for ( var i = 0; i < geometry.faces.length; i += 2 ) {

                    console.log("loop", i);

                    //var hex = Math.random() * 0xffffff;
                    var lightblue = 0x2980b9;
                    var darkerBlue = 0x3498db;
                    var purple = 0x9b59b6;
                    var salmon = 0xe74c3c;
                    var yellow = 0xf1c40f;

                    switch(i){

                        case 0 :
                            geometry.faces[ i ].color.setHex( lightblue );
                            geometry.faces[ i + 1 ].color.setHex( lightblue);
                        break;
                        case 2 :
                            geometry.faces[ i ].color.setHex( salmon );
                            geometry.faces[ i + 1 ].color.setHex( salmon );
                        break;
                        case 4:
                            geometry.faces[ i ].color.setHex( purple );
                            geometry.faces[ i + 1 ].color.setHex( purple);
                        break;
                        case 6 :
                            geometry.faces[ i ].color.setHex( purple );
                            geometry.faces[ i + 1 ].color.setHex( lightblue);
                        break;
                        case 8 :
                            geometry.faces[ i ].color.setHex( purple );
                            geometry.faces[ i + 1 ].color.setHex( purple);
                        break;
                        case 10:
                            geometry.faces[ i ].color.setHex( yellow );
                            geometry.faces[ i + 1 ].color.setHex( yellow);
                        break;
                    }

                }

                var material = new THREE.MeshBasicMaterial( {
                    vertexColors: THREE.FaceColors,
                    overdraw: 0.5
                });

                cube = new THREE.Mesh( geometry, material );
                cube.position.y = 150;
                scene.add( cube );

                // Plane
                var geometry = new THREE.PlaneGeometry( 200, 200 );
                geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

                var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

                plane = new THREE.Mesh( geometry, material );
                scene.add( plane );

                renderer = new THREE.CanvasRenderer();
                renderer.setClearColor( 0xf0f0f0 );

                renderer.setSize( window.innerWidth, window.innerHeight );

                container.append( renderer.domElement );

                document.addEventListener( 'mousedown', onDocumentMouseDown, false );
                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );

                //

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            //

            function onDocumentMouseDown( event ) {

                event.preventDefault();

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'mouseup', onDocumentMouseUp, false );
                document.addEventListener( 'mouseout', onDocumentMouseOut, false );

                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDown = targetRotation;

            }

            function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;

                targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

            }

            function onDocumentMouseUp( event ) {

                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

            }

            function onDocumentMouseOut( event ) {

                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

            }

            function onDocumentTouchStart( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();

                    mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                    targetRotationOnMouseDown = targetRotation;

                }

            }

            function onDocumentTouchMove( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

                }

            }

            function animate() {

                requestAnimationFrame( animate );

                render();

            }

            function render() {

                plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;

                targetRotation = 0.8;
                //console.log(cube.material);

                renderer.render( scene, camera );

            }
            setTimeout(function(){

                var geometry = new THREE.BoxGeometry( 200, 200, 200 );

                for ( var i = 0; i < geometry.faces.length; i += 2 ) {

                    console.log("loop", i);

                    //var hex = Math.random() * 0xffffff;
                    var lightblue = 0x2980b9;
                    var darkerBlue = 0x3498db;
                    var purple = 0x9b59b6;
                    var salmon = 0xe74c3c;
                    var yellow = 0xf1c40f;

                    switch(i){

                        case 0 :
                            geometry.faces[ i ].color.setHex( yellow );
                            geometry.faces[ i + 1 ].color.setHex( yellow);
                        break;
                        case 2 :
                            geometry.faces[ i ].color.setHex( yellow );
                            geometry.faces[ i + 1 ].color.setHex( yellow );
                        break;
                        case 4:
                            geometry.faces[ i ].color.setHex( yellow );
                            geometry.faces[ i + 1 ].color.setHex( yellow);
                        break;
                        case 6 :
                            geometry.faces[ i ].color.setHex( yellow );
                            geometry.faces[ i + 1 ].color.setHex( yellow);
                        break;
                        case 8 :
                            geometry.faces[ i ].color.setHex( yellow );
                            geometry.faces[ i + 1 ].color.setHex( yellow);
                        break;
                        case 10:
                            geometry.faces[ i ].color.setHex( yellow );
                            geometry.faces[ i + 1 ].color.setHex( yellow);
                        break;
                    }

                }

                var material = new THREE.MeshBasicMaterial( {
                    vertexColors: THREE.FaceColors,
                    overdraw: 0.5
                });

                cube.material = material;

            }, 4000)

        }
    };

    app.init();
});
