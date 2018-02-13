# JavaScript
JavaScript: langage interprété

## Design pattern en JavaScript:

### 1. Fonctions de callback

```
myFunction('data', function (err, data) {

});

// Code here (when is it run ?!)
```

Exécution de myFunction en premier avec le params 'data', puis la function de callbac.

Problème: bordélique, car si il y a du code après, on ne sait pas quand le code est exécuté.

Ce n'est quasiment plus utilisé (seule utilisation: Node module core de Node, qui ne sont pas encore passé aux promesses).

### 2. Promises

```
myFunction('data')
  .then(function (data) {
    // if everything is alright
  })
  .catch(function (err) {
    // if there is an error
  });
```

### 3. Async / Await

```
async function myFunction(a, b) {
  await
}
```

## Ce qu'il faut pour un server HTTP classic minimal:

### 1. Serveur HTTP
### 2. Connexion à la DB
### 3. Routes
### 4. Sécurité
### 5. Middlewares

Viens s'intercaler entre la request et la response pour exécuter quelques choses.

Il peut y avoir plusieurs middlewares. req ==> middleware1, middleware2 ==> res

## Annexes:

URL = Toute l'URL avec le http:// etc.
URI = A partir du /example (domaine.com/example)

### Route code
2XX = bien passé

200: OK

201: Created

202: Accepted

204: No-Content (delete)


4XX = User errors

403: Not authorized

404: Not found


5XX = Server errors


ForeignKey = Clef secondaire, qui fait toujours référence à une PrimaryKey.
