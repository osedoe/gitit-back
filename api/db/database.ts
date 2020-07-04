import * as mongoose from 'mongoose';
import { Connection, Document, Model, Schema } from 'mongoose';
import { UserModel, UserSchema } from '../model/User';

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

  async connect({ host = 'localhost', port = '27017', database, username, password }: DBParams): Promise<Connection> {
    console.log('🥁 Connecting to DB...');

    const mongoURL = `mongodb://${host}:${port}/${database}`;
    try {
      const conn = await mongoose.createConnection(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, poolSize: 50 });

      if (!conn) {
        throw Error('No connection instance');
      }
      this.connection = conn;
      return conn;

    } catch (error) {
      console.error('Could not connect to MongoDB: ', error);
      throw error;
    }
  }

  static connect({ host, port, database }: DBParams): Promise<Connection> {
    return DBManager.getInstance().connect({ host, port, database });
  }

  getConnection(): Connection {
    return this.connection;
  }

  static getConnection(): Connection {
    return DBManager.getInstance().getConnection();
  }

  setModel<T extends Document>(name: string, schema: Schema): void {
    mongoose.connection.model<T>(name, schema);
  }

  static setModel<T extends Document>(name: string, schema: Schema): void {
    DBManager.getInstance().setModel<T>(name, schema);
  }

  getUserModel(): Model<UserModel> {
    return this.connection.model<UserModel>('user', UserSchema);
  }

  static getUserModel(): Model<UserModel> {
    return DBManager.getInstance().getUserModel();
  }

}

export default DBManager;
