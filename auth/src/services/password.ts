import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = await this.createBuffer({ password, salt });

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, password: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = await this.createBuffer({ password, salt });

    return buffer.toString('hex') === hashedPassword;
  }

  static async createBuffer({ password, salt }: { password: string; salt: string; }): Promise<Buffer> {
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return buffer;
  }
}