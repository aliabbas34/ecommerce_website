var mongoose=require('mongoose');
const crypto=require('crypto');
const uuidv3=require('uuid');


var userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim : true,
    },
    lastName:{
        type: String,
        maxlength: 32,
        trim: true,
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    userInfo:{
        type:String,
        trim:true,
    },
    encryPassword:{
        type: String,
        require: true,
    },
    salt:String,
    roles:{
        type:Number,
        default:0,
    },
    purchases:{
        type: Array,
        default:[],
    },

},
{timestamps: true}
);

userSchema.virtual("password")
    .set(function(password){
        this._password=password; //underscore is used to set the variable as private; not a mandate in javascript but a convention among coders.
        
        //hashing of password begins below
        this.salt=uuidv3();//salt generated and value assigned globally.
        this.encryPassword=this.securePassword(password); //assigning encrypted password by function call to securePassword.
    })
    .get(function(){
        return this._password;
    })

userSchema.methods={

    authenticate: function(plainPassword){
        return this.securePassword(plainPassword)===this.encryPassword;
    },

    securePassword: function(plainPassword){
        if(!plainPassword){
            return "";
        }
        try{
            //below code is to generate the hash value of the password.
            //that's why we are passing the hashing algorithm to be used and salt value generated.
            return crypto.createHmac('sha256',this.salt)
            .update(plainPassword)
            .digest('hex');
        }
        catch(err){
            return "";
        }
    }
}
module.exports=mongoose.model("User",userSchema);
