
const express = require("express");
const router = express.Router();
const dfff = require('dialogflow-fulfillment');
const Patient = require('../models/patient.model');
const Specialization = require('../models/specialization.model');
const Doctor = require('../models/doctor.model');
const Visit = require('../models/visit.model');
const {spawn} = require('child_process');
const {PythonShell} =require('python-shell');
const Disease = require('../models/disease.model');


router.get("/", async (req, res) => {
    
    console.log('hii');

    res.sendStatus(200);
});

router.post('/', express.json(), (req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res

    });

    const prev_intent = Object.keys(agent.context.contexts)[0];
    console.log(prev_intent)

    async function name(agent){
        var name = agent.query;
        console.log(name)
        let patient = await Patient.findOne({chat_id: agent.originalRequest.payload.data.from.id})
  
        if (patient){
          patient.firstName = name.split(' ')[1],
          patient.lastName = name.split(' ')[0],
          patient.patronymic = name.split(' ')[2]
          await patient.save();
        }else{
          const new_patient = new Patient({
            chat_id: agent.originalRequest.payload.data.from.id,
            firstName: name.split(' ')[1],
            lastName: name.split(' ')[0],
            patronymic: name.split(' ')[2]
          })
          new_patient.save((err, saved) => {
            if (err){
              console.log(err)
          }});
        }
        
        const answer = {
          "text": `${name}, правильно?`,
          "reply_markup": {
            "inline_keyboard": [
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
              "inline_keyboard": [
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
          "inline_keyboard": [
          ]
        }
      };

      doc.forEach(async function(element) 
      { 

        let temp = [{
          "text": element.surname + " " + element.name,
          "callback_data": element.surname + " " + element.name,
          "url": `https://c7811266f66f.ngrok.io/doctor/${element.id}/user/${agent.originalRequest.payload.data.from.id}`
        }];

        payload.reply_markup.inline_keyboard.push(temp);
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
      const payload = {
        "text": answer,
        "reply_markup": {
          "inline_keyboard": [
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
      agent.add(new dfff.Payload(agent.TELEGRAM ,payload , {rawPayload: false, sendAsMessage: true}));
    }

    async function yes(agent){
      const prev_intent = Object.keys(agent.context.contexts)[0];
      let patient = await Patient.findOne({chat_id: agent.originalRequest.payload.data.callback_query.from.id})
        
      // console.log(prev_intent)
      var answer = ""
      
      if (prev_intent == "namesurname"){
        if(patient.all_ok){
          let name = "";
          if(patient.patronymic){
            name = patient.lastName + " " + patient.firstName + " " + patient.patronymic
          }else{
            name = patient.lastName + " " + patient.firstName
          }
          let age = patient.age
          let gender = patient.sex
          let phone = patient.phoneNumber;
          await patient.save();

          answer = {
            "text": `Все правильно: \nИмя: ${name} \nВозраст: ${age} \nПол: ${gender} \nТелефон: ${phone}`,
            "reply_markup": {
              "inline_keyboard": [
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
          agent.context.set({
            'name':'all-followup',
            'lifespan': 1,
            'parameters':{
              'yn':'idk'
              }
          });
          agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));

          
        }else{
          answer = "Можете указать свой возраст"
          agent.add(answer);
        }
      }
      else if (prev_intent == "age-followup"){
        if(patient.all_ok){
          var age = agent.context.contexts["age-followup"].parameters['age'].amount;
          var unit = agent.context.contexts["age-followup"].parameters['age'].unit;
          let name = "";
          if(patient.patronymic){
            name = patient.lastName + " " + patient.firstName + " " + patient.patronymic
          }else{
            name = patient.lastName + " " + patient.firstName
          }
          let gender = patient.sex
          let phone = patient.phoneNumber;
          patient.age = parseInt(age);
          await patient.save();

          answer = {
            "text": `Все правильно: \nИмя: ${name} \nВозраст: ${age} \nПол: ${gender} \nТелефон: ${phone}`,
            "reply_markup": {
              "inline_keyboard": [
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
          agent.context.set({
            'name':'all-followup',
            'lifespan': 1,
            'parameters':{
              'yn':'idk'
              }
          });
          agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));

          
        }else{
          var age = agent.context.contexts["age-followup"].parameters['age'].amount;
          var unit = agent.context.contexts["age-followup"].parameters['age'].unit;
          answer = {
            "text": "Укажите свой пол",
            "reply_markup": {
              "inline_keyboard": [
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
      }
      else if (prev_intent == "gender-followup"){

        if(patient.all_ok){
          var gender = agent.context.contexts["gender-followup"].parameters.gender;
          
          let name = "";
          if(patient.patronymic){
            name = patient.lastName + " " + patient.firstName + " " + patient.patronymic
          }else{
            name = patient.lastName + " " + patient.firstName
          }
          let age = patient.age
          let phone = patient.phoneNumber;
          patient.sex = gender;
          await patient.save();

          answer = {
            "text": `Все правильно: \nИмя: ${name} \nВозраст: ${age} \nПол: ${gender} \nТелефон: ${phone}`,
            "reply_markup": {
              "inline_keyboard": [
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
          agent.context.set({
            'name':'all-followup',
            'lifespan': 1,
            'parameters':{
              'yn':'idk'
              }
          });
          agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));

          
        }else{
          var gender = agent.context.contexts["gender-followup"].parameters.gender;

          answer = "Можете написать свой номер телефона"

          patient.sex = gender;
          await patient.save();
          agent.add(answer);
        }
      }
      else if (prev_intent == "phone-followup"){
        var phone = agent.context.contexts["phone-followup"].parameters["phone-number"];
        patient.all_ok = true;

        // let patient = await Patient.findOne({chat_id: agent.originalRequest.payload.data.from.id})
        let name = "";
        if(patient.patronymic){
          name = patient.lastName + " " + patient.firstName + " " + patient.patronymic
        }else{
          name = patient.lastName + " " + patient.firstName
        }
        let age = patient.age
        let gender = patient.sex



        patient.phoneNumber = phone;
        await patient.save();

        answer = {
          "text": `Все правильно: \nИмя: ${name} \nВозраст: ${age} \nПол: ${gender} \nТелефон: ${phone}`,
          "reply_markup": {
            "inline_keyboard": [
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
        agent.context.set({
          'name':'all-followup',
          'lifespan': 1,
          'parameters':{
            'yn':'idk'
            }
        });
        agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));

      }
      else if (prev_intent == "symptomcheck-followup"){
        const symp = agent.context.contexts['symptomcheck-followup'].parameters.symptom;
        var diseases;
        console.log(symp)
        let options = {
          mode: 'text',
          pythonOptions: ['-u'], // get print results in real-time
          scriptPath: '/home/anel/Desktop/final-project-team-4/Project/backend/python', //If you are having python_test.py script in same folder, then it's optional.
          args: symp //An argument which can be accessed in the script using sys.argv[1]
        };
      
        PythonShell.run('script.py', options, async function (err, result){
          if (err) throw err;
          diseases = result.toString();
          console.log('result: ', result.toString());
          // var diseases_db = await Disease.find({name_en: diseases});
          var spec_db;
          for(let i = 0; i<diseases_db.specialization_ids.length-1; i++){
            s = await Specialization.find({id: diseases_db.specialization_ids[i]});
            spec_db.push(s)
          }
          const answer = `По тем симптомам, что Вы нам дали, алгоритм предпологает что у Вас может быть: ${dataToSend}.  Доктора:.`
          
          const payload = {
            "text": answer,
            "reply_markup": {
              "inline_keyboard": [
              ]
            }
          };
          // var spec_db = await Specialization.find({id: spec});
          for(let i = 0; i<spec_db.length-1; i++){
            var doc = await Doctor.find({ specialization_ids: spec_db[i].id.toString()});
            
            

            doc.forEach(async function(element) 
            { 

              let temp = [{
                "text": element.surname + " " + element.name,
                "callback_data": element.surname + " " + element.name,
                "url": `https://c7811266f66f.ngrok.io/doctor/${element.id}/user/${agent.originalRequest.payload.data.from.id}`
              }];

              payload.reply_markup.inline_keyboard.push(temp);
            });
          }
          // var doc = await Doctor.find({ specialization_ids: spec_db[0].id.toString() });
          

          


          agent.add(new dfff.Payload(agent.TELEGRAM , payload, {rawPayload: false, sendAsMessage: true}));
        
          agent.add(answer);
        });
      } 
      else if (prev_intent == "defaultwelcomeintent-followup" || patient.all_ok || all-followup) {
        answer = {
          "text": "Чем я могу Вам помочь?",
          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  "text": "Симптомы",
                  "callback_data": "Симптомы"
                }
              ],
              [
                {
                  "text": "Список врачей",
                  "callback_data": "Список врачей"
                }
              ],
              [
                {
                  "text": "История",
                  "callback_data": "История"
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
      console.log(prev_intent)
      var answer = ""

      if (prev_intent == "defaultwelcomeintent-followup") {
        answer = "Можете написать свое имя"
        agent.add(answer);

      }
      else if (prev_intent == "namesurname"){
        answer = "Можете повторить свое имя"
        agent.add(answer);

      }
      else if (prev_intent == "age-followup"){
        answer = "Можете повторить свой возраст"
        agent.add(answer);
      }
      else if (prev_intent == "gender-followup"){
        answer = {
          "text": "Укажите свой пол",
          "reply_markup": {
            "inline_keyboard": [
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
      else if (prev_intent == "symptomcheck-followup"){
        answer = "Можете повторить что Вас волнует"
        agent.add(answer);

      }  
      else if (prev_intent == "all-followup"){

        answer = {
          "text": `Что указано не правильно?`,
          "reply_markup": {
            "inline_keyboard": [
              [
                {
                  "text": "Ф.И.О",
                  "callback_data": "Ф.И.О"
                }
              ],
              [
                {
                  "text": "Возраст",
                  "callback_data": "Возраст"
                }
              ],
              [
                {
                  "text": "Пол",
                  "callback_data": "Пол"
                }
              ],
              [
                {
                  "text": "Телефон",
                  "callback_data": "Телефон"
                }
              ]
            ]
          }
        };
        // patient.all_ok = false;
        // await patient.save();

        agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));
      }
    }


    async function welcome(agent){
      let patient = await Patient.findOne({chat_id: agent.originalRequest.payload.data.from.id})
  
      let answer  = "";
      if (patient){

        
        patient.all_ok = true;
        let name = "";
        if(patient.patronymic){
          name = patient.lastName + " " + patient.firstName + " " + patient.patronymic
        }else{
          name = patient.lastName + " " + patient.firstName
        }
        const age = patient.age
        const sex = patient.sex 
        const phone = patient.phoneNumber
        answer = {
          "text": `Здравствуйте! У меня сохранились Ваши данные с прошлого раза как Вы мне писали. Правильно: \nИмя: ${name} \nВозраст: ${age}\nПол: ${sex}\nТелефон: ${phone}?`,
          "reply_markup": {
            "inline_keyboard": [
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
        agent.context.set({
          'name':'all-followup',
          'lifespan': 1,
          'parameters':{
            'yn':'idk'
            }
        });
        agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));
        await patient.save();
      }else{
        answer = "Здравствуй! Я Мед Бот, я помогу Вам записаться к врачу.  Как Вас зовут? (Ф.И.О)"
        agent.add(answer);
      }
      
    }


    async function docname(agent){
      const doc = agent.query;
      let doctor = await Doctor.findOne({name: doc.split(" ")[1], surname: doc.split(" ")[0]})
  
      console.log("doc: ",doctor);
      let answer = "ahhh"
      agent.add(answer);
    }

    async function history(agent){
      let id;
      if (agent.originalRequest.payload.data.callback_query){
        id = agent.originalRequest.payload.data.callback_query.from.id
      }else{
        id = agent.originalRequest.payload.data.from.id;
      }
      let visit = await Visit.find({user_id: id})


      if(visit){
        let answer = "Ваша история:"
        for (var i = 0; i < visit.length; i++) {
          let doctor = await Doctor.findOne({id: visit[i].doctor_id})
          let doc_name = doctor.surname + " " + doctor.name + " " + doctor.patronymic
          let date = visit[i].date
          let symptoms = ''
          let analysis = ''
          let diseases = ''
          let cbv = visit[i].comment_befor_visit;
          let recept = visit[i].recept;
          let cav = visit[i].comment_after_visit;

          visit[i].symptoms.forEach(e => {
            symptoms = symptoms + e + " "
          });
          visit[i].list_of_analysis.forEach(e => {
            analysis = analysis + e + " "
          });
          visit[i].predicted_diseases.forEach(e => {
            diseases = diseases + e + " "
          });

          answer = answer + `\n${i+1}. Доктор: ${doc_name}\nДата приема: ${date}\nСимптомы: ${symptoms}\nПредиетед дезис бай телегармбот: ${diseases}\nАнализы: ${analysis}\nКомментарий до визита: ${cbv}\nКомментарий после визита: ${cav}\nРецепт: ${recept}`
          
        }
        agent.add(answer);

        
      }else{
        let answer = "Нет истории"
        agent.add(answer);
      }

      answer = {
        "text": "Чем я могу Вам помочь?",
        "reply_markup": {
          "inline_keyboard": [
            [
              {
                "text": "Симптомы",
                "callback_data": "Симптомы"
              }
            ],
            [
              {
                "text": "Список врачей",
                "callback_data": "Список врачей"
              }
            ],
            [
              {
                "text": "История",
                "callback_data": "История"
              }
            ]
          ]
        }
      };
      agent.add(new dfff.Payload(agent.TELEGRAM , answer, {rawPayload: false, sendAsMessage: true}));
    

    }


    var intentMap = new Map();
    intentMap.set('NameSurname', name )
    intentMap.set('PhoneNumber', phone )
    intentMap.set('SpecializationList', spec ) 
    intentMap.set('DoctorList', doctors ) 
    intentMap.set('SymptomCheck', symptoms ) 
    intentMap.set('Yes', yes ) 
    intentMap.set('No', no ) 
    intentMap.set('DefaultWelcomeIntent', welcome ) 
    intentMap.set('DoctorListName', docname ) 
    intentMap.set('History', history ) 


    


    agent.handleRequest(intentMap);
  


});

module.exports = router;




