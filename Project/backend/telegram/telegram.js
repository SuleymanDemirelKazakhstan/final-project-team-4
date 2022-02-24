const { Telegraf } = require("telegraf");
const config = require("../config/default");
const Patient = require('../models/patient.model');

let MedBot = new Telegraf("1660503992:AAFS8OT8RFktrRB9byz5i6LhFZltmVErdEo");

MedBot.on('text', async(ctx) => {
    let patient = await Patient.findOne({chat_id: id})
    if(patient.all_ok == 2){
        MedBot.telegram.sendMessage(ctx.chat.id, `Мы вас записали.`);
        patient.all_ok = 1
        patient.patient_comment = ctx.message.text
    }
});

MedBot.launch()

module.exports = {
    MedBot
};