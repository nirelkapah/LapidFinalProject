const Event = require('../../models/event')


module.exports = {

    events: async () => { //what happens when i use query > events
        try {
            const events = await Event.find()
            return events
            .map(event => {
               return {...event._doc, _id: event.id, date: new Date(event._doc.date).toISOString() }}
           )

        }catch (err) {
            throw err
        }
    },

    createEvent: async (args) => { //what happens when i use mutation > createEvents
            try {
                const event = new Event({
                    // _id: Math.random().toString(),
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price, 
                    date: new Date(args.eventInput.date)
                });
    
                const result = await event.save();
                
                createdEvent = {...result._doc, _id: event.id, date: new Date(event._doc.date).toISOString()};
                return createdEvent

            } catch (err) {
                throw err
            }
            
    }
}