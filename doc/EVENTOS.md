## Esdeveniments que pot rebre
- up
- down
- stop
  - Els tres controls basics generalment els rebrà el "mainboard" i conte:
  ```js
  { id: 'integer' }
  ```
- register
  - El misatje que envia el mainboard:

  ```js
  { nick: 'mainboard' }
  ```
  - El misatje que envien els pad:

  ```js
  { nick: 'string' }
  ```

## Eventos que envia
- start
  - El mainboard envia el misatje cuant te un usuari nou.  Conte el identificador i el nick del usuari.

  ```js
  { id: 'integer', nick: 'string' } 
  ```

- mainboard
  - Si un usuari solicita un "register" i no hi ha el mainboard disponible retornara:

  ```js
  { msg: 'noserver' }
  ```

  - En cas de que el mainboard es desconecti, s'envia a tots els usuaris registrats a la partida amb el contingut:

  ```js
  { msg: 'down' }
  ```