const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const timetableSchema = new Schema({
    batchName: {
        type: String,
        required: true,
    },
    day: [
        {
            first: {
                start:{
                    type: Date
                },
                end:{
                    type: Date
                },
                subject:{
                    type: Schema.Types.ObjectId,
                    ref: 'Subject'
                },
                user:{
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                taken:{
                    type:Boolean,
                    default:true
                },
                description:{
                    type:String
                }
            },
            second: {
                start:{
                    type: Date
                },
                end:{
                    type: Date
                },
                subject:{
                    type: Schema.Types.ObjectId,
                    ref: 'Subject'
                },
                user:{
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                taken:{
                    type:Boolean,
                    default:true
                },
                description:{
                    type:String
                }
            },
            third: {
                start:{
                    type: Date
                },
                end:{
                    type: Date
                },
                subject:{
                    type: Schema.Types.ObjectId,
                    ref: 'Subject'
                },
                user:{
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                taken:{
                    type:Boolean,
                    default:true
                },
                description:{
                    type:String
                }
            },
            fourth: {
                start:{
                    type: Date
                },
                end:{
                    type: Date
                },
                subject:{
                    type: Schema.Types.ObjectId,
                    ref: 'Subject'
                },
                user:{
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                taken:{
                    type:Boolean,
                    default:true
                },
                description:{
                    type:String
                }
            },
            fifth: {
                start:{
                    type: Date
                },
                end:{
                    type: Date
                },
                subject:{
                    type: Schema.Types.ObjectId,
                    ref: 'Subject'
                },
                user:{
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                taken:{
                    type:Boolean,
                    default:true
                },
                description:{
                    type:String
                }
            },
            sixth: {
                start:{
                    type: Date
                },
                end:{
                    type: Date
                },
                subject:{
                    type: Schema.Types.ObjectId,
                    ref: 'Subject'
                },
                user:{
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                taken:{
                    type:Boolean,
                    default:true
                },
                description:{
                    type:String
                }
            },
            createdAt:{
                type:Date,
                default:Date.now
            },
            updatedAt:{
                type:Date,
            }
        }
    ]
});

const timetable = mongoose.model('timetable', timetableSchema);

module.exports = {
    timetable
}