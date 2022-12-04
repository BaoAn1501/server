const controller = require('../components/sizes/controller');
const fs = require('fs');

class SizeController {
    
    async one (req, res, next) {
        const {id} = req.params;
        const result = await controller.getById(id);
        if(result){
            res.json(result);
        }
    }
}

module.exports = new SizeController();