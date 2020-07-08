const express = require ('express');
const app = express();
app.use(express.json());


let resArray = [];

const server = app.listen(process.env.PORT || 3000, (err) => {
    if(err) {
        console.log('Something bad happend');
        }
    console.log(`server is listening on port: ${process.env.PORT || 3000}`); 
});1


app.get('/v1', (request, response) => {
    try {
        let result;
        if(resArray.length !== 0) {
            if(request.query) {
                const param = request.query.kindOfRestaurant;
                for (let index = 0; index < resArray.length; index++) {
                    const element = resArray[index];
                    if(param == element.kindOfRestaurant) {
                        result = resArray[index];
                        response.status(200).send(result);
                    }
                    else
                    {
                        response.status(204).send(result);
                    }
                }
            }
            else
            {
                result = resArray;
                response.status(200).send(result);
            }
        }
        else
        {
            response.status(204).send(result);
        }
    }
    catch(err) {
        response.status(500).send(err);
    }
});


app.post('/v1', (request, response) => {
    try {
        const requestBody = request.body;
        const nameArray = resArray.map( e => e.name);
        if(nameArray.indexOf(requestBody.name) !== -1) {
            response.status(400).send();            
        } else
        {
            resArray.push(requestBody);
            response.status(201).send();
        }
    }
    catch(err) {
        response.status(500).send(err);
    }
});

