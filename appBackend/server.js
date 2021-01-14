
var express = require('express');
var app = express();

const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);

//to get user ip
const ifaces = require('os').networkInterfaces();
var user_ipaddress;

Object.keys(ifaces).forEach(dev => {
    ifaces[dev].filter(details => {
        if (details.family === 'IPv4' && details.internal === false) {
            user_ipaddress = details.address;
        }
    });
});

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost:27017/PizzeriaDB';

var pizzaModel = require('./model/pizzaModel');
var ingredientsModel = require('./model/ingredientsModel');
var userCartModel = require('./model/userCartModel');
var guestCartModel = require('./model/guestCartModel');
var userModel = require('./model/userModel');

app.get('/', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            // console.log(req.ipInfo);
            // res.json(req.ip);
            
            res.json(user_ipaddress);
        }
    });
});

app.get('/get-pizza', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            pizzaModel.find({}, (err, result) => {
                if(err){
                    res.json({status: false, msg: 'Could not get pizza!'});
                }
                else{
                    res.json({status: true, msg: 'Successful', pizza: result});
                }
            });
        }
    });
});

app.get('/get-ingredients', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            ingredientsModel.find({}, (err, result) => {
                if(err){
                    res.json({status: false, msg: 'Could not get ingredients!'});
                }
                else{
                    res.json({status: true, msg: 'Successful', ingredients: result});
                }
            })
        }
    });
});

app.get('/get-userCount', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            userModel.count((err, result) => {
                if(err){
                    res.json('Could not get count!');
                }
                else{
                    console.log(result);
                    console.log(typeof(result));
                    res.json(result);
                }
            })
        }
    });
});

app.get('/get-user-byName/:userName', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            userModel.find({userName: req.params.userName}, (err, user) => {
                if(err){
                    res.json({status: false, msg: 'Could not get user!'});
                }
                else{
                    console.log(user);
                    res.json({status: true, msg: 'Successful', user: user});
                }
            });
        }
    });
});

app.get('/get-user-byId/:userId', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            userModel.find({userId: req.params.userId}, (err, user) => {
                if(err){
                    res.json({status: false, msg: 'Could not get user!'});
                }
                else{
                    console.log(user);
                    res.json({status: true, msg: 'Successful', user: user});
                }
            });
        }
    });
});

app.post('/register-user', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            let userObj = new userModel({
                userId: req.body.userId,
                userName: req.body.userName,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                appWalletAmount: 2000
            });

            userModel.find({userName: req.body.userName, phoneNumber: req.body.phoneNumber}, (err, user) => {
                if(err){
                    res.json('Db error!'+ err);
                }
                else{
                    if(user.length > 0){
                        res.json({status: false, msg: 'User already exists!'});
                    }
                    else{
                        console.log('adding new user');
                        userObj.save( (err, user) => {
                            if(err){
                                res.json({status: false, msg: err});
                            }
                            else{
                                res.json({status: true, msg:'User inserted successfully', user: user});
                            }
                        });
                    }
                }
            });
        }
    });
});

app.post('/validate-user', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            // let userObj = {
            //     userName: req.body.userName,
            //     password: req.body.password
            // };

            userModel.find({userName: req.body.userName, password: req.body.password}, (err, user) => {
                if(err){
                    res.json({status: false, msg: 'DB error'});
                }
                else{
                    if(user.length > 0){
                        res.json({status: true, msg: 'Login successful', user: user});
                    }
                    else{
                        res.json({status: false, msg: 'User not found! Please reigster!'});
                    }    
                }
            });
        }
    });
});

app.get('/get-from-guestCart', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            guestCartModel.find({}, (err, result) => {
                if(err){
                    res.json({status: false, msg: 'Could not get cart!'});
                }
                else{
                    res.json({status: true, msg: 'Successful',  result});
                }
            })
        }
    });
});


//////////////////////working without quantity//////////////////////
// app.post('/add-to-guestCart', (req, res) => {
//     mongoose.connect(dbUrl, (err) => {
//         if(err){
//             res.json('DB connection failed!');
//         }
//         else{
//             let guestCartObj = new guestCartModel({
//                 id: user_ipaddress,
//                 name: req.body.name,
//                 price: req.body.price,
//                 image: req.body.image,
//             });
//             guestCartObj.save( (err) => {
//                 if(err){
//                     res.json({status: false, msg: err});
//                 }
//                 else{
//                     res.json({status: true, msg:'Pizza added to guest cart successfully!'});
//                 }
//             });
                
//         }
//     });
// });
//////////////////////working without quantity//////////////////////



///////////////////test/////////////////////
app.post('/add-to-guestCart', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            guestCartModel.find({name: req.body.name}, (err, cartDataResult) => {
                if(err){
                    res.json({status: false, msg: 'Could not get cart!'});
                }
                else{
                    if(cartDataResult.length > 0  && req.body.name != 'my custom pizza'){
                        console.log('cartDataResult.length > 0 : true'+ cartDataResult.length);
                        console.log('cartDataResult : '+cartDataResult);
                        console.log('typeof(cartDataResult) : '+typeof(cartDataResult));
                        console.log('cartDataResult.quantity : '+cartDataResult[0].quantity);
                        pizzaModel.find({name: req.body.name}, (err, pizzaDetails) => {
                            if(err){
                                res.json({status: false, msg: 'Could not get pizza!'});
                            }
                            else{        
                                console.log(pizzaDetails);            
                                guestCartModel.updateOne({name: req.body.name}, {$set: {quantity: cartDataResult[0].quantity+1, price: pizzaDetails[0].price*(cartDataResult[0].quantity+1)}}, (err, updatedCartDataResult) => {
                                    if(err){
                                        res.json({status: false, msg: 'could not update cart'});
                                    }
                                    else{
                                        res.json({status: true, msg: 'successful', updatedCartDataResult: updatedCartDataResult});
                                    }
                                });
                            }
                        });
                    }
                    else{
                        console.log('cartDataResult.length > 0 : false');
                        var ingredients = [];
                        if(req.body.ingredients){
                            ingredients = req.body.ingredients;
                        }
                        let guestCartObj = new guestCartModel({
                            id: user_ipaddress,
                            name: req.body.name,
                            ingredients: ingredients,
                            price: req.body.price,
                            image: req.body.image,
                            quantity: 1
                        });

                        guestCartObj.save( (err) => {
                            if(err){
                                res.json({status: false, msg: 'could not add to cart'});
                            }
                            else{
                                res.json({status: true, msg: 'added to successfully'});
                            }
                        });
                    }
                }
            });
        }
    });
});


app.get('/get-from-userCart/:userId', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            userCartModel.find({userId: req.params.userId}, (err, result) => {
                if(err){
                    res.json({status: false, msg: 'Could not get cart!'});
                }
                else{
                    res.json({status: true, msg: 'Successful',  result});
                }
            })
        }
    });
});

app.post('/add-to-userCart', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            userCartModel.find({userId: req.body.userId, name: req.body.name}, (err, cartDataResult) => {
                if(err){
                    res.json({status: false, msg: 'Could not get cart!'});
                }
                else{

                    if(cartDataResult.length > 0 && req.body.name != 'my custom pizza'){
                        console.log('cartDataResult.length > 0 : true'+ cartDataResult.length);
                        console.log('cartDataResult : '+cartDataResult);
                        console.log('typeof(cartDataResult) : '+typeof(cartDataResult));
                        console.log('cartDataResult.quantity : '+cartDataResult[0].quantity);
                        pizzaModel.find({name: req.body.name}, (err, pizzaDetails) => {
                            if(err){
                                res.json({status: false, msg: 'Could not get pizza!'});
                            }
                            else{        
                                console.log(pizzaDetails);            
                                userCartModel.updateOne({userId: req.body.userId, name: req.body.name}, {$set: {quantity: cartDataResult[0].quantity+1, price: pizzaDetails[0].price*(cartDataResult[0].quantity+1)}}, (err, updatedCartDataResult) => {
                                    if(err){
                                        res.json({status: false, msg: 'could not update cart'});
                                    }
                                    else{
                                        res.json({status: true, msg: 'successful', updatedCartDataResult: updatedCartDataResult});
                                    }
                                });
                            }
                        });
                    }
                    else{
                        var ingredients = [];
                        if(req.body.ingredients){
                            ingredients = req.body.ingredients;
                        }
                        console.log(ingredients);
                        let userCartObj = new userCartModel({
                            userId: req.body.userId,
                            name: req.body.name,
                            ingredients: ingredients,
                            price: req.body.price,
                            image: req.body.image,
                            quantity: 1
                        });
                        
                        userCartObj.save( (err) => {
                            if(err){
                                res.json({status: false, msg: err});
                            }
                            else{
                                res.json({status: true, msg:'Pizza added to user cart successfully!'});
                            }
                        });
                    }
                }
            });
        }
    });
});

app.post('/delete-one-from-guestCart', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            console.log(req.body.orderId);
            guestCartModel.find({_id: req.body.orderId} ,(err, cartDataResult) => {
                if(err){
                    res.json({status: false, msg: 'Could not get cartData!'});
                }
                else{
                    if(cartDataResult[0].quantity > 1){
                        console.log('decrese quantity by 1');
                        pizzaModel.find({name: req.body.name}, (err, pizzaDetails) => {
                            if(err){
                                res.json({status: false, msg: 'Could not get pizza!'});
                            }
                            else{        
                                console.log(pizzaDetails);            
                                guestCartModel.updateOne({_id: req.body.orderId}, {$set: {quantity: cartDataResult[0].quantity-1, price: cartDataResult[0].price-pizzaDetails[0].price}}, (err, updatedCartDataResult) => {
                                    if(err){
                                        res.json({status: false, msg: 'could not update cart'});
                                    }
                                    else{
                                        res.json({status: true, msg: 'successful', updatedCartDataResult: updatedCartDataResult});
                                    }
                                });
                            }
                        });
                    }
                    else{
                        guestCartModel.deleteOne({_id: req.body.orderId}, (err) => {
                            if(err){
                                res.json({status: false, msg: err});
                            }
                            else{
                                res.json({status: true, msg:'Pizza removed from guest cart successfully!'});
                            }
                        });
                    }
                }
            });
        }
    });
});

app.get('/delete-all-from-guestCart', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            console.log(err);
            res.json('DB connection failed!');
        }
        else{
            console.log('deleting all');
            guestCartModel.deleteMany({}, (err) => {
                if(err){
                    res.json({status: false, msg: err});
                }
                else{
                    res.json({status: true, msg:'Emptied guest cart successfully!'});
                }
            });
        }
    });
});

app.post('/delete-one-from-userCart', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            // const pizza_name = req.body.name;
            console.log(req.body.orderId);
            console.log(req.body.name);
            userCartModel.find({userId: req.body.userId, _id: req.body.orderId} ,(err, cartDataResult) => {
                if(err){

                }
                else{
                    if(cartDataResult[0].quantity > 1){
                        console.log('decrese quantity by 1');
                        pizzaModel.find({name: req.body.name}, (err, pizzaDetails) => {
                            if(err){
                                res.json({status: false, msg: 'Could not get pizza!'});
                            }
                            else{        
                                console.log(pizzaDetails);            
                                userCartModel.updateOne({_id: req.body.orderId, userId: req.body.userId}, {$set: {quantity: cartDataResult[0].quantity-1, price: cartDataResult[0].price-pizzaDetails[0].price}}, (err, updatedCartDataResult) => {
                                    if(err){
                                        res.json({status: false, msg: 'could not update cart'});
                                    }
                                    else{
                                        res.json({status: true, msg: 'successful', updatedCartDataResult: updatedCartDataResult});
                                    }
                                });
                            }
                        });
                    }
                    else{
                        userCartModel.deleteOne({_id: req.body.orderId}, (err) => {
                            if(err){
                                res.json({status: false, msg: err});
                            }
                            else{
                                res.json({status: true, msg:'Pizza removed from user cart successfully!'});
                            }
                        });
                    }
                }
            });   
        }
    });
});


app.post('/delete-all-from-userCart', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            console.log(req.body.userId);
            userCartModel.deleteMany({userId: req.body.userId}, (err) => {
                if(err){
                    res.json({status: false, msg: err});
                }
                else{
                    res.json({status: true, msg:'Emptied user cart successfully!'});
                }
            });
        }
    });
});


app.post('/update-user-wallet-balance-after-payment', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed');
        }
        else{
            console.log('/update-user-wallet-balance-after-payment');
            console.log(req.body.userId);
            console.log(req.body.appWalletAmount);
            console.log(req.body.billAmount);
            if(req.body.billAmount > req.body.appWalletAmount){
                res.json({status: false, msg: 'Payment failed! Insufficient Wallet Balance!'});
            }
            else{
                userModel.updateOne({userId: req.body.userId}, {$set: {appWalletAmount: req.body.appWalletAmount-req.body.billAmount}}, (err, updatedUserInfo) => {
                    if(err){
                        res.json({status: false, msg: err});
                    }
                    else{
                        res.json({status: true, msg: 'Payment Successful! User wallet balance updated successfully', updatedUserInfo: updatedUserInfo});
                    }
                });
            }
        }
    });
});


app.post('/update-user-wallet-balance-after-topUp', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed');
        }
        else{
            console.log('/update-user-wallet-balance-after-topUp');
            console.log(req.body.userId);
            console.log(req.body.appWalletAmount);
            console.log(req.body.topUpAmount);
            if(req.body.topUpAmount > 1000){
                res.json({status: false, msg: 'Top up failed! Max. top up of only 1000 is allowed!'});
            }
            else if((req.body.appWalletAmount+req.body.topUpAmount) > 5000){
                res.json({status: false, msg: 'Top up failed! Wallet limit of 5000 exceeded!'});
            }
            else{
                userModel.updateOne({userId: req.body.userId}, {$set: {appWalletAmount: req.body.appWalletAmount+req.body.topUpAmount}}, (err, updateQueryResult) => {
                    if(err){
                        res.json({status: false, msg: err});
                    }
                    else{
                        console.log(updateQueryResult);
                        userModel.find({userId: req.body.userId}, (err, updatedUserInfo) => {
                            if(err){
                                res.json({status: false, msg: 'ould not get user info!'});
                            }
                            else{
                                console.log(updatedUserInfo[0].appWalletAmount);
                                res.json({status: true, msg: 'TopUp Successful! User wallet balance updated successfully', updatedUserWalletAmount: updatedUserInfo[0].appWalletAmount});
                            }
                        });                        
                    }
                });
            }
        }
    });
});


app.post('/update-user-info', (req, res) => {
    mongoose.connect(dbUrl, (err) => {
        if(err){
            res.json('DB connection failed!');
        }
        else{
            console.log('/update-user-info');
            console.log(req.body.userId);
            console.log(req.body.userName);
            console.log(req.body.password);
            userModel.updateOne({userId: req.body.userId}, {$set: {userName: req.body.userName, password: req.body.password, phoneNumber: req.body.phoneNumber}}, (err, updateQueryResponse) => {
                if(err){
                    res.json({status: false, msg: 'Could not update user info!'});
                }
                else{
                    console.log(updateQueryResponse);
                    userModel.find({userId: req.body.userId}, (err, updatedUser) => {
                        if(err){
                            res.json({status: false, msg: 'Could not get user info!'});
                        }
                        else{
                            res.json({status: true, msg: 'User info updated successfully!', user: updatedUser});
                        }
                    });
                }
            });
        }
    });
});




app.listen( 3010, () => {
    console.log('Server running on port 3010.');
})