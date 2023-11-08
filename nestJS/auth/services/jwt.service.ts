import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtInterface } from '../interfaces/jwt.interface';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  /**
   *
   * @param token
   * @returns
   */
  verifyToken(token: string): JwtInterface {
    return this.jwtService.verify<JwtInterface>(token);
  }
}
