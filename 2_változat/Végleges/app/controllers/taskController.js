const TaskModel = require('../models/taskModel');

const generateTask = (req, res) => {
  const osztaly = req.query.osztaly;
  const tipus = req.query.tipus;

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

  // Token ellenőrzése és felhasználói azonosító lekérése
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

  //userId, answer, taskType
  TaskModel.saveResult(userId, answer, taskType)
    .then((result) => {
        res.status(200).json({ success: 'success' });
    })
    .catch((error) => {
      console.error('Hiba az adatbázislekérdezés során: ' + error);
      res.status(500).json({ error: 'Hiba az adatbázislekérdezés során' });
    });

};


module.exports = { generateTask, getStatistics, saveResult };
