import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

const env = dotenv.config();

export class Config {
  private static instance: Config;

  private readonly serverPort: string | number;

  private readonly dbHost: string;
  private readonly dbPort: string | number;
  private readonly dbName?: string;
  private readonly dbUsername?: string;
  private readonly dbPassword?: string;

  private readonly environment?: string;
  private readonly jwtKey?: string;

  private constructor() {
    if (env.error) {
      throw env.error;
    }

    this.serverPort = env.parsed?.SERVER_PORT ?? '3000';

    this.dbHost = env.parsed?.DB_HOST ?? 'localhost';
    this.dbPort = env.parsed?.DB_PORT ?? '27017';
    this.dbName = env.parsed?.DB_NAME;
    this.dbUsername = env.parsed?.DB_USERNAME;
    this.dbPassword = env.parsed?.DB_PASSWORD;

    this.environment = process.env.NODE_ENV;
    this.jwtKey = env.parsed?.JWT_KEY;
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  getServerPort(): string | number {
    return this.serverPort;
  }

  static getServerPort(): string | number | undefined {
    return Config.getInstance().getServerPort();
  }

  getHost(): string {
    return this.dbHost;
  }

  static getHost(): string {
    return Config.getInstance().getHost();
  }

  getDbPort(): string | number {
    return this.dbPort;
  }

  static getDbPort(): string | number {
    return Config.getInstance().getDbPort();
  }

  getDbName(): string | undefined {
    return this.dbName;
  }

  static getDbName(): string | undefined {
    return Config.getInstance().getDbName();
  }

  getDbUsername(): string | undefined {
    return this.dbUsername;
  }

  static getDbUsername(): string | undefined {
    return Config.getInstance().getDbUsername();
  }

  getDbPassword(): string | undefined {
    return this.dbPassword;
  }

  static getDbPassword(): string | undefined {
    return Config.getInstance().getDbPassword();
  }

  getJwtKey(): Secret {
    return this.jwtKey as Secret;
  }

  static getJwtKey(): Secret {
    return Config.getInstance().getJwtKey();
  }

  getEnvironment(): string | undefined {
    return this.environment;
  }

  static getEnvironment(): string | undefined {
    return Config.getInstance().getEnvironment();
  }

  static isDevelopmentEnvironment(): boolean {
    return Config.getInstance().getEnvironment() === 'development';
  }

  static isProductionEnvironment(): boolean {
    return Config.getInstance().getEnvironment() === 'production';
  }
}
