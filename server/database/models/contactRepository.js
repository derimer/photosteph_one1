const AbstractRepository = require("./AbstractRepository");

class ContactRepository extends AbstractRepository {
  constructor() {
    super({ table: "Contact" });
  }

  async create(Contact) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstName, lastName, email, message) VALUES (?, ?, ?, ?)`,
      [contact.firstName, contact.lastName, contact.email, contact.message]
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

  async update() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }
}

module.exports = ContactRepository;
