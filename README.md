# authentication

## How to run the application
Run following command from root folder to start service and database both </br>
Note: no need to to install any dependencies other than docker, [click here to install docker](https://docs.docker.com/engine/install)
```
 docker-compose up --build
```


## There are two controllers in this repo,
1. Authentication (Login + 2fa)
2. User management (CRUD for users)

## Database used
1. mongodb (develop env)
2. in-memory mongodb, for unit tests (test env)

## Deployment
Kubernetes yaml files are added to deploy deployemnts and service in a cluster </br>
Note: Ingress file is also added fr custom network layer settings

## Two Factor Authentication
I have used qr codes to generate tokens(otp), after registration user receives google chart url, that qr code can be read by google authenticator or any totp applicaton

## API Interface
Documentation - [Postman Doc](https://documenter.getpostman.com/view/13138181/TzRSiTwR) Choose authentication environment </br>
                All required sample responses are saved in document

Collection - [Postman Collection](https://www.postman.com/collections/94c837176e9d581c2828)
