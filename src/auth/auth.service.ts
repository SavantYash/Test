import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: { email: string, password: string }) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });

            if (existingUser) {
                throw new ConflictException('Email already exists');
            }

            const hash = await bcrypt.hash(dto.password, 10);

            return this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                },
            });
        } catch (error: any) {
            console.log(error);
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException('Email already exists');
            }

            throw error;
        }
    }

    async login(dto: { email: string, password: string }) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const valid = await bcrypt.compare(
            dto.password,
            user.password,
        );

        if (!valid) {
            throw new UnauthorizedException();
        }

        return {
            access_token: this.jwtService.sign({
                sub: user.id,
                email: user.email,
            }),
        };
    }
}
