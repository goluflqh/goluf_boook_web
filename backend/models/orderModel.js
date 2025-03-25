import moongoose from "mongoose";

const orderSchema = new moongoose.Schema({
   userId: {type: String, require: true},
   items: {type: Array, require: true},
   amount: {type: Number, require: true},
   address: {type: Object, require: true},
   status: {type: String, require: true, default: 'Order placed'},
   paymentMethod: {type: String, require: true},
   payment: {type: Boolean, require: true, default: false},
   date: {type: Number, require: true},
})

const orderModel = moongoose.model.order || moongoose.model('order', orderSchema);

export default orderModel
