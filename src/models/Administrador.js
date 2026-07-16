/* 
    Campos:
    name
    email
    password
    isVerified
    loginAttempts
    timeOut

*/

import mongoose, {Schema,model} from "mongoose";

const AdministradorSchema = new Schema (
    {
        name: {type: String}
    },
    {
        email: {type: String}
    },
    {
        password: {type: String}
    },        
    {
        isVerified: {type: Boolean}
    },
    {
        timestamps: true,
        strict: false,
    }
);

export default model ("Admin", AdministradorSchema);