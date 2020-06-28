import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

const env = dotenv.config();

export class Config {
  private static instance: Config;

  private readonly host: string;
  private readonly port: string;
  private readonly database?: string;
  private readonly username?: string;
  private readonly password?: string;
  private readonly jwtKey?: string;

  private constructor() {
    if (env.error) {
      throw env.error;
    }

    this.host = env.parsed?.HOST ?? 'localhost';
    this.port = env.parsed?.PORT ?? '27017';
    this.database = env.parsed?.DATABASE;
    this.username = env.parsed?.USERNAME;
    this.password = env.parsed?.PASSWORD;
    this.jwtKey = env.parsed?.JWT_KEY;
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }

  getHost(): string {
    return this.host;
  }

  static getHost(): string {
    return Config.getInstance().getHost();
  }

  getPort(): string {
    return this.port;
  }

  static getPort(): string {
    return Config.getInstance().getPort();
  }

  getDatabase(): string | undefined {
    return this.database;
  }

  static getDatabase(): string | undefined {
    return Config.getInstance().getDatabase();
  }

  getUsername(): string | undefined {
    return this.username;
  }

  static getUsername(): string | undefined {
    return Config.getInstance().getUsername();
  }

  getPassword(): string | undefined {
    return this.password;
  }

  static getPassword(): string | undefined {
    return Config.getInstance().getPassword();
  }

  getJwtKey(): Secret {
    return this.jwtKey as Secret;
  }

  static getJwtKey(): Secret {
    return Config.getInstance().getJwtKey();
  }
}
