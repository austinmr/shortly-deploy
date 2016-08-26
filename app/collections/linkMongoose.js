var Schema = mongoose.Schema;

var linkSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
},  { timestamps: { createdAt: 'createdAt' } });


var Link = mongoose.model('Link', linkSchema); 

module.exports = Link; 


// The permitted SchemaTypes are

// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array