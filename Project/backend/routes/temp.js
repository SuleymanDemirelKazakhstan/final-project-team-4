
const express = require("express");
const router = express.Router();
const dfff = require('dialogflow-fulfillment');
const Patient = require('../models/patient.model');
const Specialization = require('../models/specialization.model');
const Doctor = require('../models/doctor.model');
const DecisionTree = require('decision-tree');


router.get("/", async (req, res) => {
    
    console.log('hii');

    res.sendStatus(200);
});

router.post('/', express.json(), (req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res

    });

    async function name(agent){
        var name = agent.query;
        console.log(name)
        // let patient = await Patient.findOne({chat_id: agent.originalRequest.payload.data.from.id})
  
        // if (patient){
        //   patient.firstName = name.split(' ')[1],
        //   patient.lastName = name.split(' ')[0],
        //   patient.patronymic = name.split(' ')[2]
        //   patient.save();
        // }else{
        //   const new_patient = new Patient({
        //     chat_id: agent.originalRequest.payload.data.from.id,
        //     firstName: name.split(' ')[1],
        //     lastName: name.split(' ')[0],
        //     patronymic: name.split(' ')[2]
        //   })
        //   new_patient.save((err, saved) => {
        //     if (err){
        //       console.log(err)
        //   }});
        // }
        
        const answer = {
          "text": `${name}, правильно?`,
          "reply_markup": {
            "keyboard": [
              [
                {
                  "text": "Да",
                  "callback_data": "Да"
                }
              ],
              [
                {
                  "text": "Нет",
                  "callback_data": "Нет"
                }
              ]
            ]
          }
        };
        agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));
      
    }

    function age(agent){
        var age = agent.parameters['age'].amount;
        var unit = agent.parameters['age'].unit;

        console.log(age);
        // agent.add(`Какой Ваш пол?`);

    }

    function gender(agent){
        var gender = agent.parameters['age'].amount;
  
        console.log(gender);
        // agent.add(``);

    }

    
    function phone(agent){
        var name = agent.contexts[0].parameters['person'][0].name;
        var age = agent.contexts[1].parameters['age'].amount;
        var unit = agent.contexts[1].parameters['age'].unit;
        var gender = agent.contexts[2].parameters['Gender'];
        var phone = agent.parameters['phone-number'];


  
        console.log(name);
        console.log(age);
        console.log(unit);
        console.log(gender);
        console.log(phone);

        const payload = {
            "text": `Правильно ли введены данные:  \nИмя: ${name} \nВозраст: ${age} \nПол: ${gender} \nНомер телефона: ${phone}`,
            "reply_markup": {
              "keyboard": [
                [
                  {
                    "text": "Да",
                    "callback_data": "Да"
                  }
                ],
                [
                  {
                    "text": "Нет",
                    "callback_data": "Нет"
                  }
                ]
              ]
            }
          };


        agent.add(new dfff.Payload(agent.TELEGRAM , payload, {rawPayload: false, sendAsMessage: true}));
     

        const new_patient = new Patient({
            firstName: name.split(' ')[1],
            lastName: name.split(' ')[0],
            sex: gender,
            phoneNumber: phone,
            age: age
        })

        new_patient.save((err, saved) => {
          if (err){
            console.log(err)
        }
        });


    }
        

    async function spec(agent){
      var spec = await Specialization.find({});


      const payload = {
        "text": `Выберите специализацию: `,
        "reply_markup": {
          "keyboard": [
          ]
        }
      };

      spec.forEach(async function(element) 
      { 
        let temp = [{
          "text": element.name,
          "callback_data": element.name
        }];

        payload.reply_markup.keyboard.push(temp);

      });
      


      agent.add(new dfff.Payload(agent.TELEGRAM , payload, {rawPayload: false, sendAsMessage: true}));
      
    }



    async function doctors(agent){
      var spec = agent.parameters.Doctors;

      var spec_db = await Specialization.find({name: spec});
     
      var doc = await Doctor.find({ specialization_ids: spec_db[0].id.toString() });
      

      const payload = {
        "text": `Выберите доктора: `,
        "reply_markup": {
          "keyboard": [
          ]
        }
      };

      doc.forEach(async function(element) 
      { 

        let temp = [{
          "text": element.surname + " " + element.name,
          "callback_data": element.surname + " " + element.name
        }];

        payload.reply_markup.keyboard.push(temp);
      });


      agent.add(new dfff.Payload(agent.TELEGRAM , payload, {rawPayload: false, sendAsMessage: true}));
    }



    async function symptoms(agent){
      const symp = agent.parameters.symptom;
      
      var answer = "Я правильно понял, Вас волнует: ";
      for(let i = 0; i<symp.length-1; i++){
        answer = answer + symp[i] + ", ";
      }
      answer = answer + symp[symp.length-1]+ "?";
      
      agent.add(answer)

      // var preTrainedDecisionTree = new DecisionTree("../my_model.json");
      // te = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
      // console.log(preTrainedDecisionTree.predict(te))

    }

    async function yes(agent){
      const prev_intent = Object.keys(agent.context.contexts)[0];
      
      var answer = ""
      if (prev_intent == "namesurname-followup"){
        answer = "Можете указать свой возраст"

        agent.add(answer);
      }
      else if (prev_intent == "age-followup"){


        var age = agent.context.contexts["age-followup"].parameters['age'].amount;
        var unit = agent.context.contexts["age-followup"].parameters['age'].unit;
        let patient = await Patient.findOne({chat_id: agent.originalRequest.payload.data.from.id})
        answer = {
          "text": "Укажите свой пол",
          "reply_markup": {
            "keyboard": [
              [
                {
                  "text": "Женский",
                  "callback_data": "Женский"
                }
              ],
              [
                {
                  "text": "Мужской",
                  "callback_data": "Мужской"
                }
              ]
            ]
          }
        };
        patient.age = parseInt(age);
        await patient.save();


        agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));
      }
      else if (prev_intent == "gender-followup"){

        var gender = agent.context.contexts["gender-followup"].parameters.gender;
        console.log(gender)

        let patient = await Patient.findOne({chat_id: agent.originalRequest.payload.data.from.id})
        answer = "Можете написать свой номер телефона"

        patient.sex = gender;
        await patient.save();

        agent.add(answer);
      }
      else if (prev_intent == "phone-followup"){
        var phone = agent.context.contexts["phone-followup"].parameters["phone-number"];
        

        let patient = await Patient.findOne({chat_id: agent.originalRequest.payload.data.from.id})
        let name = patient.lastName + " " + patient.firstName + " " + patient.patronymic
        let age = patient.age
        let gender = patient.sex



        patient.phoneNumber = phone;
        await patient.save();

        answer = {
          "text": `Все правильно: \nИмя: ${name} \nВозраст: ${age} \nПол: ${gender} \nТелефон: ${phone}`,
          "reply_markup": {
            "keyboard": [
              [
                {
                  "text": "Да",
                  "callback_data": "Да"
                }
              ],
              [
                {
                  "text": "Нет",
                  "callback_data": "Нет"
                }
              ]
            ]
          }
        };
        agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));

      }

    }

    
    async function no(agent){
      const prev_intent = Object.keys(agent.context.contexts)[0];
      
      var answer = ""

      if (prev_intent == "namesurname-followup"){
        answer = "Можете повторить свое имя"
        agent.add(answer);
        agent.setFollowupEvent("triggered")

      }
      else if (prev_intent == "age-followup"){
        answer = "Можете повторить свой возраст"
        agent.add(answer);
      }
      else if (prev_intent == "gender-followup"){
        answer = {
          "text": "Укажите свой пол",
          "reply_markup": {
            "keyboard": [
              [
                {
                  "text": "Женский",
                  "callback_data": "Женский"
                }
              ],
              [
                {
                  "text": "Мужской",
                  "callback_data": "Мужской"
                }
              ]
            ]
          }
        };
        agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));
      
      }
      else if (prev_intent == "phone-followup"){
        answer = "Можете повторить свой номер телефона"
        agent.add(answer);
      }    

    }


    var intentMap = new Map();
    intentMap.set('NameSurname', name )
    intentMap.set('Age', age )
    intentMap.set('Gender', gender )
    intentMap.set('PhoneNumber', phone )
    intentMap.set('SpecializationList', spec ) 
    intentMap.set('DoctorList', doctors ) 
    intentMap.set('SymptomCheck', symptoms ) 
    intentMap.set('Yes', yes ) 
    intentMap.set('No', no ) 

    


    agent.handleRequest(intentMap);
  


});

module.exports = router;




// queryResult.outputContexts[0].parameters.phone-number

// {
//     "responseId": "f2089b84-fa98-4a04-a679-2886d73bfd3c-9647140f",
//     "queryResult": {
//       "queryText": "8 708 1234 022",
//       "action": "DefaultWelcomeIntent.DefaultWelcomeIntent-custom.NameSurname-custom.Age-custom.Gender-custom",
//       "parameters": {
//         "phone-number": "87081234022"
//       },
//       "allRequiredParamsPresent": true,
//       "fulfillmentMessages": [
//         {
//           "text": {
//             "text": [
//               "Правильно ли введены данные: \nИмя: Дюсенова Анель\nВозраст: 20 year\nПол: #Gender-followup\nНомер телефона: 87081234022"
//             ]
//           },
//           "platform": "TELEGRAM"
//         },
//         {
//           "quickReplies": {
//             "title": "Правильно ли введены данные: Имя: #NameSurname-followup Возраст: #Age-followup Пол: #Gender-followup Номер телефона: 87081234022",
//             "quickReplies": [
//               "Да",
//               "Нет"
//             ]
//           },
//           "platform": "TELEGRAM"
//         }
//       ],
//       "outputContexts": [
//         {
//           "name": "projects/medbot-dfls/agent/sessions/3c713347-e3cc-ce50-3a9d-c3f5ba19bdae/contexts/namesurname-followup",
//           "lifespanCount": 20,
//           "parameters": {
//             "person": [
//               {
//                 "name": "Дюсенова Анель"
//               }
//             ],
//             "person.original": [
//               "Дюсенова Анель"
//             ],
//             "age": {
//               "amount": 20,
//               "unit": "year"
//             },
//             "age.original": "20",
//             "phone-number": "87081234022",
//             "phone-number.original": "8 708 1234 022"
//           }
//         },
//         {
//           "name": "projects/medbot-dfls/agent/sessions/3c713347-e3cc-ce50-3a9d-c3f5ba19bdae/contexts/age-followup",
//           "lifespanCount": 20,
//           "parameters": {
//             "age": {
//               "amount": 20,
//               "unit": "year"
//             },
//             "age.original": "20",
//             "phone-number": "87081234022",
//             "phone-number.original": "8 708 1234 022"
//           }
//         },
//         {
//           "name": "projects/medbot-dfls/agent/sessions/3c713347-e3cc-ce50-3a9d-c3f5ba19bdae/contexts/gender-followup",
//           "lifespanCount": 20,
//           "parameters": {
//             "phone-number": "87081234022",
//             "phone-number.original": "8 708 1234 022"
//           }
//         },
//         {
//           "name": "projects/medbot-dfls/agent/sessions/3c713347-e3cc-ce50-3a9d-c3f5ba19bdae/contexts/__system_counters__",
//           "parameters": {
//             "no-input": 0,
//             "no-match": 0,
//             "phone-number": "87081234022",
//             "phone-number.original": "8 708 1234 022"
//           }
//         }
//       ],
//       "intent": {
//         "name": "projects/medbot-dfls/agent/intents/11fef073-ab08-471a-af40-56194acc7b6a",
//         "displayName": "PhoneNumber"
//       },
//       "intentDetectionConfidence": 1,
//       "languageCode": "ru",
//       "sentimentAnalysisResult": {
//         "queryTextSentiment": {
//           "score": 0.1,
//           "magnitude": 0.1
//         }
//       }
//     },
//     "originalDetectIntentRequest": {
//       "source": "DIALOGFLOW_CONSOLE",
//       "payload": {}
//     },
//     "session": "projects/medbot-dfls/agent/sessions/3c713347-e3cc-ce50-3a9d-c3f5ba19bdae"
//   }