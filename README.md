
# SLEEPY

 A unique app that brings the best of Wysa, CBT, qualified psychologists and soothing sleep stories!
🌙 20+ sleep stories
⭐️ A healthy night time routine
⚡️ Toolkit to help feeling refreshed in the morning and to go back to sleep in night
👩‍💼 Qualified sleep coaches with personalized sleep programs

## Initialization

```bash
npm init
```

## Dependencies

```python
"dependencies": {
    "express": "^4.18.1",
    "mongoose": "^6.5.2",
    "nodemon": "^2.0.19",
    "bcrypt": "^5.0.1",
    "jsonwebtoken": "^8.5.1"
  }
```

## Server 
```python
app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});
```
## Test 
```python
npx nodemon src/index.js
```
## REST APIs 
The REST API to the example app is described below.

### Onboarding Phase
#### Request
```python
post "/register"
"https://localhost:4000/register"
```
#### Response
```python
Date: Thu, 19 Aug 2022 12:36:30 GMT 
Status: 201 Created 
Content-Type: application/json; charset=utf-8
Content-Length: 239

{
    "status": true,
    "data": "You seem to have sleep efficiency of 100%  Thats great 😎......A higher sleep efficiency score means a more refreshing and energizing sleep,which can help you move into your day with a sense of lightness and ease"
}

```
## Protection
Securing Protected Endpoints
###JWT


## Created By
SWETA
