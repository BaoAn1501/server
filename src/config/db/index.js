const mongoose = require('mongoose');
async function connect(){
    try {
        mongoose.connect('mongodb+srv://uyentrang:1507@cluster0.umcpe3p.mongodb.net/Graduation?retryWrites=true&w=majority', {  
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('>>>>>>>>>> DB Connected!!!!!!');
    } catch(error){
        console.log('>>>>>>>>> DB Error: ', error);
    }
}

module.exports = {connect};