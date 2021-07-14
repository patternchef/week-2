const { Router } = require("express");
const router = Router({ mergeParams: true });
const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');

router.get("/", async (req, res, next) => {
    try {
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        if (!calendar) {
            res.sendStatus(404);
            return;
        }
        const events = await EventDAO.getAll(req.params.calendarId);
        res.json(events);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const event = await EventDAO.getById(req.params.id);
        if (!event || event.calendarId != req.params.calendarId) {
            res.sendStatus(404);
            return;
        }
        res.json(event);
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        if (!calendar) {
            res.sendStatus(404);
        } else {
            req.body.calendarId = calendar._id;
            const savedEvent = await EventDAO.create(req.body);
            res.json(savedEvent);
        }
    } catch (e) {
        if (e.message.includes('validation failed:')) {
            res.status(400).send(e.message);
        } else {
            res.status(500).send(e.message);
        }
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        const event = await EventDAO.getById(req.params.id);
        if (!calendar || !event || req.params.calendarId != event.calendarId.toString()) {
            res.sendStatus(404);
        } else {
            const result = await EventDAO.updateById(req.params.id, req.body);
            res.json(result);
        }
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const calendar = await CalendarDAO.getById(req.params.calendarId);
        const event = await EventDAO.getById(req.params.id);
        if (!calendar || !event || req.params.calendarId != event.calendarId.toString()) {
            res.sendStatus(404);
        } else {
            const deleteEvent = await EventDAO.removeById(req.params.id);
            if (deleteEvent) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (e) {
        next(e);
    }
});
module.exports = router;