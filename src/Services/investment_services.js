const InvestmentService = {
    getAllInvestments(knex) {
        return knex.select('*').from('investments')
    },
    insertInvestment(knex, newInvestment) {
        return knex
            .insert(newInvestment)
            .into('investments')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('investments').select('*').where('id', id).first()
    },
    deleteInvestment(knex, id) {
        return knex('investments')
            .where({ id })
            .delete()
    },
    updateInvestment(knex, id, newInvestmentFields) {
        return knex('investments')
            .where({ id })
            .update(newInvestmentFields)
    },
}

module.exports = InvestmentService;