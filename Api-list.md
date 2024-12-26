# Dev-Tinde Apis


## Userauth 
    ~ post /auth/signup
    ~ post /auth/login
    ~ post /logout

## ProfileRouter
    ~ GET/profile/view
    ~ PATCH /profile/edit
    -PATCH /profile/password

# status : ignore,interested,accepted,rejected

## connectionrequestROuter
    post /request/send/interested/:userId
    post /request/send/ignore/:userId
    post / request/review/accepted/requestId
    post / request/review/rejected/requestId

## UserRouter
    GET /connections
    GET / requests/recevied
    GET/feed -gets you the Profiles Of other users on platforms
