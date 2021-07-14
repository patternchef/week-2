const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAll();
    res.json(calendars);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const cal = await CalendarDAO.getById(req.params.id);
    if (!cal || JSON.stringify(cal) === '{}') {
      res.sendStatus(404);
      return;
    } else if (!req.body.name) {
      res.sendStatus(400);
      return;
    } else {
      const updatedCal = await CalendarDAO.updateById(req.params.id, req.body);
      res.json(updatedCal);
    }
  } catch (e) {
    if (e.message.includes('validation failed:')) {
      res.status(400).send(e.message);
    }
    else {
      res.status(500).send(e.message);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cal = req.body;
    if (!cal || JSON.stringify(cal) === '{}') {
      res.status(400).send('Calendar is required');
    }
    else {
      const savedCal = await CalendarDAO.create(cal);
      res.json(savedCal);
    }
  } catch (e) {
    if (e.message.includes('validation failed:')) {
      res.status(400).send(e.message);
    }
    else {
      res.status(500).send(e.message);
    }
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (!calendar) {
      res.status(404).send('Calendar not found');
      return;
    }
    await CalendarDAO.removeById(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;