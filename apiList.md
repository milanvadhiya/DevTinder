# DevTinder APi's

## authRouter
- post / signup
- post /login
- post /logout

## profileRouter
- get/profile/view
- patch/profile/edit
- patch/profile/password

## connectionRequestRouter

 post/request/send/:staus/:userId
- post/request/send/intersted/:userId
- post/request/send/ignored/:userId

post/request/review/:status/:requestId
- post/request/review/accepted/:userId
- post/request/review/rejected/:userId

## userRouter
- get /user/requests/received
- get /user/connections
- get /user/feed  