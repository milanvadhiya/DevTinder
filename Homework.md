-create a repositery,
- Intiliaze the repositery,
- node_modules, package.json,package-lock.json,
- Install Expres..
- Create a server
- Listen on port 3000,
- Write a request handles for '/test','/hello',
- Install nodemon and update Scripts Inside package.json.

- initilize git,
- .gitignore,
- create a remote repo on github,
- push all code to remote origin,
- play with rout extension and route extension ex: /hello , / , hello/2 , /xyz....
- Order of a route metter a lot,

- install postman app and make a workspace/collection > test api called....
- write a logic of handle get, post, patch, delete, put api called and test them on a postman
- expore routing and use of +,? ,*  in the rotes,
- use of regex in routes /a/ , /.*fly$/...regex
- reading a queory params
- reading dynamic routes 

- multiple route handlers...play with code
- next() function
- next function and errors along with res.send()
- app.use("/user",[a,b,c],d,e,f,[g],h)

- read about middleware. and why do you nneed it.
- how express js handled request behinf the scenes...
- diffrence between app.use vs app.all  
- write a dumy auth for admin
- write a dummy auth for user.. and play with it


- connection databse with mongoes atlas
 - install mongoose library
 - connected your application to the database <connnection url> / DevTinder
 - call db before starting application on a server
 - create a userschema and model for user
 - create signup api to add data
 - push data to databse using postman api wrap inside post api..
 - always db operation wraped the inside try and catch block

 -diffrenece betwen js object and json..
 - add express.json() middlemen
 - make a signup api dynamic take data from end user
 - findone and find diffrenece 
 - if a same email id mupletiple , then which document return
 - create a user where get data by id using findById 
 - create a delete user api..
 - update api user 
 - explore a moongoose documention
 - what are the option in a model 
 - Api - update with a email.
 


 - explore schema type option and add require, minlength, mon ,max, maxlenganth, timestamp:true, imporoved the user schema
 - add timestamp 
 - api level validation on post request and patch request 
 - data senitization  add api level validation for each feild
 - explore validator library
 - used validation for password and email and photoURl...
 -  NEVER EVER TRUST REQ.BODY IT TAKE INFINTE MALICIOUS DATA AND CRASHED OUR APPLICATIOn..

 - valid data in signUp api
 - install Bcrypt Library
 - create a passwordhash using bcrypt.hash(password,round)..& save user in databse..
 - compare password throw error if user valid or valid user 

 s2E10
 - install cookies parser 
 - install jsonweb token
 - create get / profile api and check if get the cookie back
 - install jsonwebtoken
 - in login api , after email and password validalition create  jwt token and send the user in cookies
 - read the cookies and find the user who is. 
 - user Auth middlewre
 - add useauth middleware in profile api and sendConnectionrequest api
 - set the expirt token and cokkies 
 - create userschema method getJwt()
 - create userSchema method validatepassword use bcrpt.comprare(passwordinputbyuse, passwordhas)

  s2E11
  - Explore tinder api's
  - create a list of all api's
  - group the multiple routes of api's
  - read documentation of express rourer
  - create rotes folder or managig a auth, profile , request routers
  - create authRouter, profileRouter, requestRouter
  - import these router in app.js
  - creaate a logout api
  - create a profile/edit api
  - create a forgot password api

  S2E12
  - create a connection request
  - send connection request api
  - proper validation of data
  - thinK about all corner cases
  - $or and $and query in mongoose
  - schema.pre function 
  - read more about indexes
  - why do you index in db
  - what is the advantages and disadavatages of creatind index
  - what if i creted a lots of index and disadvanatages of it
  - read about the compound index
  

 