## Control de flujo
1- Usuarios solicitan partida entregando su nick
2- Se registra el usuario en el array de la partida.
  Entidad usuario:
    ```js
    {
      id: string,
      nick: string,
      socketid: string,
      points: integer
    }
    ```
  Entidad juegos:
    ```
    {
      'partida_string': [ entidad_usuario, entidad_usuario2 ]
    }
    ```
  3- Cuando hay una partida completa se envian emits de confirmacion a los usuarios para que su controller se desbloquee. En su "controler" se puede ver su nick(o color) y con su puntuacion.

  4- Se manda un emit al mainboard para iniciar partida.

## Control de datos de la partida
* Los pad de cada jugador envian la direccion donde debe ir el pad.
* Cuando se marca un gol se puede mandar un evento a los jugadores frenando la pantalla o mostrando un mensaje de "GOL!!" y actualizando las puntuaciones.