import * as mongoose from 'mongoose';

interface DBParams {
  host?: string;
  port?: string | number;
  database?: string;
  username?: string;
  password?: string;
}

class DBManager {
  private static instance: DBManager;
  host?: string;
  port?: string;
  database?: string;
  options?: string;
  private connection: mongoose.Connection = {} as mongoose.Connection;

  private constructor() {
    // Do nothing
  }

  static getInstance(): DBManager {
    if (!DBManager.instance) {
      DBManager.instance = new DBManager();
    }

    return DBManager.instance;
  }

  async connect({
                  host = 'localhost',
                  port = '27017',
                  database,
                  username,
                  password
                }: DBParams): Promise<void> {
    const mongoURL = `mongodb://${host}:${port}/${database}`;
    try {
      const conn = await mongoose.createConnection(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 50
      });
      if (!conn) {
        throw Error('No connection instance');
      }
      this.connection = mongoose.connection;

    } catch (error) {
      console.error('Could not connect to MongoDB: ', error);
      throw error;
    }
  }

  static connect({ host, port, database }: DBParams): Promise<void> {
    console.log('🥁 Connecting to DB...');
    return DBManager.getInstance().connect({ host, port, database });
  }

  getConnection(): mongoose.Connection {
    return this.connection;
  }

  static getConnection(): mongoose.Connection {
    return DBManager.getInstance().getConnection();
  }

  setModel<T extends mongoose.Document>(name: string, schema: mongoose.Schema): void {
    mongoose.connection.model<T>(name, schema);
  }

  static setModel<T extends mongoose.Document>(name: string, schema: mongoose.Schema): void {
    DBManager.getInstance().setModel<T>(name, schema);
  }

  getUserModel() {
    return mongoose.connection.get;
    const User = mongoose.model('user', UserSchema);
  }
  
}

export default DBManager;
