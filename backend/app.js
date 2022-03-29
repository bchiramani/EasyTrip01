const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const app = express();
mongoose.connect('mongodb://localhost:27017/ProjectCroco');

const User = require('./models/user');
const Experience = require('./models/experience');
const ServiceProvider = require('./models/serviceProvider');
const Message = require('./models/message');
const Admin = require('./models/admin');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'images/jpg': 'jpg'
}
const storage = multer.diskStorage({
    //config de destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    //config du filename
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '_' + Date.now() + '-amani-' + '.' + extension;
        cb(null, imgName);
    }
})
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

/******************************************************************************************** */
//business logic for adding userrrrrrrrrr (signup)
app.post("/api/users/signup", multer({ storage: storage }).single('image'), (req, res) => {
    console.log("here userApp:add user ", req.body)
    console.log(res.file);
    bcrypt.hash(req.body.password, 10).then(
        (cryptPwd) => {
            console.log(cryptPwd);
            console.log("l' image est", req.file.filename);
            url = req.protocol + '://' + req.get('host');
            const userObj = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                country: req.body.country,
                email: req.body.email,
                password: cryptPwd,
                image: url + '/images/' + req.file.filename,
            });
            console.log(userObj);
            userObj.save((err, result) => {
                if (err) {
                    console.log('Here error with database', err.errors.email)
                    if (err.errors.email) {
                        res.status().json({
                            code: '0'
                        })
                    }
                } else {
                    res.status(200).json({
                        code: '1'
                    });
                }
            });
        }
    );

});

//business logic for signin(login )
app.post("/api/users/login", (req, res) => {
    console.log("Backend command for sign in", req.body);
    User.findOne({ email: req.body.email }).then(
        (emailResult) => {
            console.log("here find user by email result ", emailResult)
            if (!emailResult) {
                res.status(200).json({
                    code: 'O'
                })
            }
            return bcrypt.compare(req.body.password, emailResult.password)
        }
    ).then(
        (pwdResult) => {
            if (!pwdResult) {
                res.status(200).json({
                    code: '1'
                })
            }
            User.findOne({ email: req.body.email }).then(
                (finalResult) => {
                    let userToSend = {
                        firstName: finalResult.firstName,
                        lastName: finalResult.lastName,
                        image: finalResult.image,
                        email: finalResult.email,
                        age: finalResult.age,
                        bio: finalResult.bio,
                        posts: finalResult.posts
                    }
                    console.log(userToSend);
                    res.status(200).json({
                        code: '2',
                        user: userToSend
                    })
                }
            )
        }
    )

});

//business logic for editing user 
app.put("/api/users/:id", (req, res) => {

    Chef.updateOne({ _id: req.params.id }, req.body).then(
        (result) => {
            res.status(200).json({
                message: 'user updated with success'
            })
        }
    )
});

//business logic for getting all users 
app.get("/api/users", (req, res) => {
    console.log("here app: get all users ");
    User.find().then(
        (result) => {
            console.log("here after find users", result);
            res.status(200).json({
                users: result,
                message: "here all users"
            })
        }

    );
});

//business logic to delete user
app.delete("/api/users/:id", (req, res) => {
    console.log("app to delete user");
    User.deleteOne({ _id: req.params.id }).then(
        (result) => {
            res.status(200).json({
                message: 'user deleted with success'
            })
        }
    )
});
/******************************************************************************************** */
//business logic for adding an experience
app.post("/api/experiences/addExperience", multer({ storage: storage }).single('images'), (req, res) => {
    //single('images')=> images heya eli jeyetna m service
    console.log("here experienceApp:add experience ", req.body);
    console.log("limage est", req.file);
    url = req.protocol + '://' + req.get('host');

    experienceObj = new Experience({
        title: req.body.title,
        destination: req.body.destination,
        description: req.body.description,
        images: url + '/images/' + req.file.filename,
        writer: req.body.writer,
        dat: req.body.date,
        like: [],
        comment: []
    });
    // User.findOne({ email: req.body.email }).then
    // User.updateOne({ email: req.params.email }, req.body).then(
    //     (result) => {
    //         res.status(200).json(
    //             {
    //                 message: 'experience'
    //             }
    //         )
    //     }
    // ) => i want to add the experience to the table of experieences
    experienceObj.save((err, result) => {
        if (err) {
            console.log('Here error with database', err.errors);
            res.status(200).json({
                code: '0'
            });
        } else {
            res.status(200).json({
                code: '1'
            });
        }
    });

});
//business logic to edit experience 
app.put("/api/experiences/:id", (req, res) => {

        Experience.updateOne({ _id: req.params.id }, req.body).then(
            (result) => {
                res.status(200).json({
                    message: 'experience edited with success'
                });
            }
        )
    })
    //business logic to get all experiences
app.get("/api/experiences", (req, res) => {
    console.log("here app: get all experiences ");
    Experience.find().then(
        (result) => {
            console.log("here after find experiences", result);
            res.status(200).json({
                experiences: result,
                message: "here all experiences"
            })
        }

    );
});
//business logic to get experience by id
app.get("/api/experiences/:id", (req, res) => {
    console.log('here app to get experience by id ', req.params.id);
    Experience.findOne({ _id: req.params.id }).then(
        (result) => {
            res.status(200).json({
                experience: result,
                message: 'experience found'
            });
        }
    )

});
//business logic to get experience by writer email
app.get("/api/experiences/writerEmail/:writeremail", (req, res) => {
    console.log('here app to get experience by writer email ', req.body);
    Experience.find({ writer: req.params.writeremail }).then(
        (result) => {
            res.status(200).json({
                experiences: result,
                message: 'experience found'
            });
            console.log(result);
        }
    )

});
//business logic to get experience by writer name
app.get("/api/experiences/writerName/:writername", (req, res) => {
    console.log('here app to get experience by writer name ', req.params.writername);
    User.find({ firstName: req.params.writerName, lastName: req.params.writerName }).then(
            (result) => {
                console.log(result);
            }
        ).then(
            (result) => {
                Experience.find({ writer: result.email }).then(
                    (experiences) => {
                        res.status(200).json({
                            experiences: result,
                            message: 'experience found'
                        });
                        console.log(result);
                    }
                )
            }
        )
        // User.find({ lastName: req.params.writerName }).then(
        //         (result) => {
        //             console.log(result);
        //         }
        //     )
        // Experience.find({ writer: req.params.writeremail }).then(
        //     (result) => {
        //         res.status(200).json({
        //             experiences: result,
        //             message: 'experience found'
        //         });
        //         console.log(result);
        //     }
        // )

});
//business logic to delete experience
app.delete("/api/experiences/:id", (req, res) => {
    console.log("app to delete experience");
    Experience.deleteOne({ _id: req.params.id }).then(
        (result) => {
            res.status(200).json({
                message: 'experience deleted with success'
            })
        }
    )
});
//business logic to like experience 
app.put("/api/experiences/like/:id", (req, res) => {
        console.log("helloo like you", req.body)
        Experience.findOne({ id: req.params.id }).then(
                (result) => {
                    console.log(result);
                    res.status(200).json({
                        message: 'experience found'
                    });
                    console.log(res.status);
                }
            ).then(
                (experience) => {
                    console.log(experience)
                }
            )
            // Experience.updateOne({ _id: req.params.id }, req.body).then(
            //     (result) => {
            //         res.status(200).json({
            //             message: 'experience edited with success'
            //         });
            //     }
            // )
    })
    /************************************************************************* */
    //business logic to like experience 
app.put("/api/serviceProviders/signupProvider", (req, res) => {
    console.log("here userApp:add user ", req.body)
        // cryptage du mdp , 10 c est le degres du cryptage
    bcrypt.hash(req.body.password, 10).then(
        (cryptPwd) => {
            console.log(cryptPwd);
            console.log("limage est", req.file);
            url = req.protocol + '://' + req.get('host');
            const serviceProviderObj = new ServiceProvider({
                name: req.body.name,
                email: req.body.email,
                type: req.body.type,
                images: url + '/images/' + req.file.filename,
                password: cryptPwd
            });
            console.log(serviceProviderObj);
            serviceProviderObj.save((err, result) => {
                if (err) {
                    console.log('Here error with database', err.errors.email)
                    if (err.errors.email) {
                        res.status().json({
                            code: '0'
                        })
                    }
                } else {
                    res.status(200).json({
                        code: '1'
                    });
                }
            });
        }
    );

});


/*********************************************************************************************** */

//business logic for getting all serviceProviders
app.get("/api/serviceProviders", (req, res) => {
    console.log("here app: get all service providers ");
    ServiceProvider.find().then(
        (result) => {
            console.log("here after find serviceProviders", result);
            res.status(200).json({
                serviceProviders: result,
                message: "here all serviceProviders"
            })
        }

    );
});
//business logic for adding a service provider (signup)
app.post("/api/serviceProviders/signup", multer({ storage: storage }).single('image'), (req, res) => {
    console.log("here serviceProviderApp:add serviceProvider ", req.body)
    console.log(res.file);
    bcrypt.hash(req.body.password, 10).then(
        (cryptPwd) => {
            console.log(cryptPwd);
            console.log("limage est", req.file.filename);
            url = req.protocol + '://' + req.get('host');
            const serviceProviderObj = new ServiceProvider({
                name: req.body.name,
                email: req.body.email,
                password: cryptPwd,
                image: url + '/images/' + req.file.filename,
            });
            console.log("voila notre objet", serviceProviderObj);
            serviceProviderObj.save((err, result) => {
                if (err) {
                    console.log('Here error with database', err.errors.email)
                    if (err.errors.email) {
                        res.status().json({
                            code: '0'
                        })
                    }
                } else {
                    res.status(200).json({
                        code: '1'
                    });
                }
            });
        }
    );
})



//business logic for signin as a service provider(login )
app.post("/api/serviceProviders/login", (req, res) => {
    console.log("Backend command for sign in", req.body);
    ServiceProvider.findOne({ email: req.body.email }).then(
        (emailResult) => {
            console.log("here find service provider by email result ", emailResult)
            if (!emailResult) {
                res.status(200).json({
                    code: 'O'
                })
            }
            return bcrypt.compare(req.body.password, emailResult.password)
        }
    ).then(
        (pwdResult) => {
            if (!pwdResult) {
                res.status(200).json({
                    code: '1'
                })
            }
            ServiceProvider.findOne({ email: req.body.email }).then(
                (finalResult) => {
                    let serviceProviderToSend = {
                        name: finalResult.name,
                        email: finalResult.email,
                        type: finalResult.type,
                        bio: finalResult.bio,
                        image: finalResult.image,
                        posts: finalResult.posts
                    }
                    res.status(200).json({
                        code: '2',
                        serviceProvider: serviceProviderToSend
                    })
                }
            )
        }
    )

});
app.delete("/api/serviceProviders/:id", (req, res) => {
    console.log("app to delete serviceProviders");
    ServiceProvider.deleteOne({ _id: req.params.id }).then(
        (result) => {
            res.status(200).json({
                message: 'service Provider deleted with success'
            })
        }
    )
});
/************************************************************************************************/
//business logic for adding message
app.post("/api/messages", (req, res) => {

    const messageObj = new Message({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        content: req.body.content
    });
    messageObj.save((err, result) => {
        if (err) {
            console.log('here error with DB', err);
        } else {
            res.status(200).json({
                message: 'message added with success'
            });
        }
    })

});
// business logic for deleting a message
app.delete("/api/messages/:id", (req, res) => {
    console.log("app to delete a message");
    Message.deleteOne({ _id: req.params.id }).then(
        (result) => {
            res.status(200).json({
                message: 'Message deleted with success'
            })
        }
    )
});
//business logic for getting all messages
app.get("/api/messages", (req, res) => {
    console.log("here app: get all messages ");
    Message.find().then(
        (result) => {
            console.log("here after find messages", result);
            res.status(200).json({
                messages: result,
                message: "here all messages"
            })
        }

    );
});
/********************************************************************** */
//business logic for adding admin 
app.post("/api/admins/addAdmin", (req, res) => {
    console.log("here adminApp:add admin ", req.body)
    bcrypt.hash(req.body.password, 10).then(
        (cryptPwd) => {
            console.log(cryptPwd);
            const adminObj = new Admin({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                function: req.body.function,
                email: req.body.email,
                password: cryptPwd,
            });
            console.log(adminObj);
            adminObj.save((err, result) => {
                if (err) {
                    console.log('Here error with database', err.errors.email)
                    if (err.errors.email) {
                        res.status().json({
                            code: '0'
                        })
                    }
                } else {
                    res.status(200).json({
                        code: '1'
                    });
                }
            });
        }
    );

});

//business logic for getting all admins 
app.get("/api/admins", (req, res) => {
    console.log("here app: get all admins ");
    Admin.find().then(
        (result) => {
            console.log("here after find admins", result);
            res.status(200).json({
                admins: result,
                message: "here all admins"
            })
        }

    );
});
/********************************************************************** */
module.exports = app;