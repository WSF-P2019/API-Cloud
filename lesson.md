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

## Mesure de sécurité principale à mettre en place sur une API:

### CORS (Cross origin ressource sharing) - Vérification de la provenance d'une request:
Exemple: www.bar.com qui fait des requests sur api.bar.com, il faut vérifier que les users qui font les requests sont autorisés à faire les requests. Quels sont les domaines qui sont autorisés à faire des requêtes sur notre API. Quelles sont les méthods que l'on autorisent.

### CSRF (Token unique):
Token unique que le back connait. Protection des routes d'API via un token unique sur les routes formulaires.

### Headers:
X-API-Key ou X-API-Token sont présents sur chacune des requests. On vérifie que les headers pour l'authentification sont présents.

### Request-rate limiting:
Demande du cache avec une base de donnée dédiée, tel ou tel users n'ont pas le droit de faire plus de X requests / minutes. Sur Twitter par exemple il y a une limite (pas plus de 400req/min/ip).

### Request-size limiting:
Exemple: POST or PUT user, qui peut mettre un fichier, il faut que la size soit limitée, sinon on plante le serveur. On limite donc la taille en byte, de la requête (seulement quelques bytes).

### Déroulé de l'action lors d'une request:
1. On vérifie les CORS
2. Plugin (middleware): vérifié les headers
3. Validations router
4. Handler (donc traitement de la request) puis envois de la response

## DataBase pour les API:
### Transactionnelle (donnée de production - temps réel)
### Cache (donnée de production - temps réel)
### Time-Series (donnée de production - temps réel)
### WORKFLOW / PROCESS : ETL - Extraction, Transformation, Loading de data:
Pour faire de l'analytics, base de donnée commune pour analyser la DB transactionnelle et la DB Time-Series (le cache en général ça sert à rien de l'analyser). Qui tape donc dans une dernière DB.

## Type d'API:
### SOAP:
A oublier, année 90, développé en Java ou .NET.

### REST:
Route d'API distinctes les unes des autres et séparées par ressources.

### GraphQL:

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
