const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema(
    {
        membership_id: {
            type: Schema.Types.ObjectId,
            ref: 'Membershpis',
            required: false,
            autopopulate: true,
        },
        shared_account_id: {
            type: Schema.Types.ObjectId,
            ref: 'Shared_accounts',
            required: false,
            autopopulate: true,
        },
        importo: {
            type: Number,
            required: true,
        },
        tipo: {
            type: String,
            enum: ['versamento', 'prelievo', 'pagamento'],
            required: true,
        },
        descrizione: {
            type: String,
            trim: true,
            default: null,
        },
        categoria: {
            type: String,
            enum: ['cibo', 'viaggi', 'shopping', 'bollette', 'altro'],
            default: 'altro',
        },
        data_transazione: {
            type: Date,
            default: Date.now,
        },
        stato: {
            type: String,
            enum: ['completed', 'pending', 'refused'],
            default: 'pending',
        },
        metodo_pagamento: {
            type: String,
            enum: ['carta', 'PayPal', 'Revolut', 'bonifico'],
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('Transactions', transactionSchema);
