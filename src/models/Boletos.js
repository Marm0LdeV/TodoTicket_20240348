/* 
    Campos:

    customerId
    quantity
    purchaseDate
    total
    paymentStatus
    transactionId

*/

import mongoose, {Schema,model} from "mongoose";

const BoletosSchema = new Schema (
    {
        customerId: {type: mongoose.Schema.Types.ObjectId,
                    ref: "Customers",
        }
    },
    {
        quantity: {type: Number}
    },
    {
        purchaseDate: {type: String}
    },        
    {
        total: {type: String}
    },
    {
        paymentStatus: {type: String}
    },
    {
        TransactionId: {type: mongoose.Schema.Types.ObjectId,
                    ref: "Customers",
        }
    },
);

export default model ("Boletos", BoletosSchema);