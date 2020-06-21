import { connect, Connection, Schema, connection } from 'mongoose';

interface DBParams {
    host?: string;
    port?: string | number;
    database?: string;
    username?: string;
    password?: string;
}

export class DBManager {
    private static instance: DBManager;
    host?: string;
    port?: string;
    database?: string;
    options?: string;
    private connection?: Connection;

    private constructor() {
        // Do nothing
    }

    static getInstance(): DBManager {
        if (!DBManager.instance) {
            DBManager.instance = new DBManager();
        }

        return DBManager.instance;
    }

    static connect({ host, port, database }: DBParams): Promise<void> {
        return DBManager.getInstance().connect({ host, port, database });
    }

    static getConnection(): Connection | undefined {
        return DBManager.getInstance().getConnection();
    }

    connect({ host = 'localhost', port = '27017', database, username, password }: DBParams): Promise<void> {
        const mongoURL = `mongodb://${username}:${password}@${host}:${port}/${database}`;
        return connect(mongoURL, { useNewUrlParser: true })
            .then(() => {
                console.log('Connected to MongoDD');
                this.assignConnectionInstance(connection);
            }).catch(err => console.error('Could not connect to MongoDB', err));
    }

    getConnection(): Connection | undefined {
        return this.connection;
    }

    setSchema(): void {
        const schema = new Schema({
            username: String,
            password: String
        });
    }

    private assignConnectionInstance(connection: Connection): void {
        this.connection = connection;
    }


}
