const Events = require('../models/events');

module.exports.create = async (event) => {
    return await Events.create(event);
};

module.exports.getAll = async (id) => {
    try {
        return await Events.find({ calendarId: id }).lean();
    } catch (e) {
        return null;
    }
};

module.exports.getById = async (id) => {
    try {
        const event = await Events.findOne({ _id: id }).lean();
        return event;
    } catch (e) {
        return null;
    }
};

module.exports.updateById = async (id, newData) => {
    try {
        const event = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
        return event;
    } catch (e) {
        return null;
    }
};

module.exports.removeById = async (id) => {
    try {
        return await Events.deleteOne({ _id: id });
    } catch (e) {
        return null;
    }
};