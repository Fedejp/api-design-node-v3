import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'complete', 'pastdue'], // No solo required, sino que tambien tiene que ser una de esas tres cosas
      default: 'active' // uno de los enum
    },
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId, // este campo tiene el ID de un documento 'ref'
      ref: 'user', // el nombre del model que referencia
      required: true
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true
    }
  },
  { timestamps: true }
)

itemSchema.index({ list: 1, item: 1 }, { unique: true }) // Genero un indice compuesto para que haya solo un item con un cierto nombre por lista. El orden aca importa.
export const Item = mongoose.model('item', itemSchema)
