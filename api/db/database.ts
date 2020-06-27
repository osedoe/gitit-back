import { connect, Connection, connection, Schema } from 'mongoose';

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

    async connect({
        host = 'localhost',
        port = '27017',
        database,
        username,
        password
    }: DBParams): Promise<void> {
        const mongoURL = `mongodb://${host}:${port}/${database}`;
        try {
            await connect(mongoURL, { useNewUrlParser: true });
            this.assignConnectionInstance(connection);
        } catch (error) {
            console.error('Could not connect to MongoDB: ', error);
            throw error;
        }
    }

    getConnection(): Connection | undefined {
        return this.connection;
    }

    setSchema(): void {
        const userSchema = new Schema({
            username: String,
            password: String
        });
    }

    private assignConnectionInstance(connection: Connection): void {
        this.connection = connection;
    }
}

export default DBManager;
