const AbstractRepository = require("./AbstractRepository");

class ContactRepository extends AbstractRepository {
  constructor() {
    super({ table: "Contact" });
  }

  async create({ firstName, lastName, email, message }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstName, lastName, email, message) VALUES (?, ?, ?, ?)`,
      [firstName, lastName, email, message]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(id, { firstName, lastName, email, message }) {
    const query = `UPDATE ${this.table} SET firstName = ?, lastName = ?, email = ?, message = ? WHERE id = ?`;
    await this.database.query(query, [firstName, lastName, email, message, id]);
  }
}

module.exports = ContactRepository;
