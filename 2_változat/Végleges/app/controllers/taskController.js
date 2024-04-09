const TaskModel = require('../models/taskModel');

const generateTask = (req, res) => {
  const osztaly = req.query.osztaly;
  const tipus = req.query.tipus;
  console.log(osztaly)
  console.log(tipus)

  TaskModel.generateTask(osztaly, tipus)
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: 'Nincs találat a megadott feltételekkel' });
      } else {
        res.json(task[0]);
      }
    })
    .catch((error) => {
      console.error('Hiba az adatbázislekérdezés során: ' + error.stack);
      res.status(500).json({ error: 'Hiba az adatbázislekérdezés során' });
    });
};

const getStatistics = (req, res) => {
  const operation = req.params.muvelet;

  console.log(operation)

  let userId = req.user.userId;

  TaskModel.getStatistics(userId, operation)
    .then((statistics) => {
      if (statistics.length === 0) {
        res.status(404).json({ error: 'Nincs találat a megadott felhasználóval és művelettel' });
      } else {
        res.json(statistics[0]);
      }
    })
    .catch((error) => {
      console.error('Hiba az adatbázislekérdezés során: ' + error.stack);
      res.status(500).json({ error: 'Hiba az adatbázislekérdezés során' });
    });
};

const saveResult = (req, res) => {
  let userId = req.user.userId;
  console.log(userId)
  let answer = req.body.answer;
  console.log(answer)
  let taskType = req.body.taskType;
  console.log(taskType)

  TaskModel.saveResult(userId, answer, taskType)
    .then((result) => {
      res.status(200).json({ success: 'success' });
    })
    .catch((error) => {
      console.error('Hiba az adatbázislekérdezés során: ' + error);
      res.status(500).json({ error: 'Hiba az adatbázislekérdezés során' });
    });

};


const newTask = (req, res) => {
  let userId = req.user.userId;
  console.log(userId)
  let studentClass = req.body.studentClass;
  console.log(studentClass)
  let content = req.body.content;
  console.log(content)
  let answer = req.body.answer;
  console.log(answer)

  for (let i = 0; i < content.length; i++) {
    let answers = "";
    for (let j = 0; j < 4; j++) {
      answers += answer[j][i]+";";      
    }
    answers += answer[4][i];      
    console.log(answers)
    TaskModel.newTask(userId, studentClass, content[i], answers)
      .then((result) => {
        console.log("task" + (i + 1) + " OK")
      })
      .catch((error) => {
        console.error('Hiba az adatbázislekérdezés során: ' + error);
        res.status(500).json({ error: 'Hiba az adatbázislekérdezés során' });
      });
  }
  res.status(200).json({ success: 'success' });

};


module.exports = { generateTask, getStatistics, saveResult, newTask };
