import { Branded } from '@/common/types/types';
import { Injectable } from '@nestjs/common';

type Token = Branded<
  {
    accessToken: string;
    refreshToken: string;
    tokenExpires: number;
  },
  'token'
>;

@Injectable()
export class AuthService {
  constructor() // private readonly configService: ConfigService<AllConfigType>,
  // private readonly jwtService: JwtService,
  // @InjectRepository(UserEntity)
  // private readonly userRepository: Repository<UserEntity>,
  // @InjectQueue(QueueName.EMAIL)
  // private readonly emailQueue: Queue<IEmailJob, any, string>,
  // @Inject(CACHE_MANAGER)
  // private readonly cacheManager: Cache,
  {}

  /**
   * Sign in user
   * @param dto LoginReqDto
   * @returns LoginResDto
  //  */
  // async signIn(dto: LoginReqDto): Promise<LoginResDto> {
  //   const { email, password } = dto;
  //   const user = await this.userRepository.findOne({
  //     where: { email },
  //     select: ['id', 'email', 'password'],
  //   });

  //   const isPasswordValid =
  //     user && (await verifyPassword(password, user.password));

  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException();
  //   }

  //   const hash = crypto
  //     .createHash('sha256')
  //     .update(randomStringGenerator())
  //     .digest('hex');

  //   const session = new SessionEntity({
  //     hash,
  //     userId: user.id,
  //     createdBy: SYSTEM_USER_ID,
  //     updatedBy: SYSTEM_USER_ID,
  //   });
  //   await session.save();

  //   const token = await this.createToken({
  //     id: user.id,
  //     sessionId: session.id,
  //     hash,
  //   });

  //   return plainToInstance(LoginResDto, {
  //     userId: user.id,
  //     ...token,
  //   });
  // }

  // async register(dto: RegisterReqDto): Promise<RegisterResDto> {
  //   // Check if the user already exists
  //   const isExistUser = await UserEntity.exists({
  //     where: { email: dto.email },
  //   });

  //   if (isExistUser) {
  //     throw new ValidationException(ErrorCode.E003);
  //   }

  //   // Register user
  //   const user = new UserEntity({
  //     email: dto.email,
  //     password: dto.password,
  //     first_name: dto.firstName,
  //     last_name: dto.lastName,
  //     createdBy: SYSTEM_USER_ID,
  //     updatedBy: SYSTEM_USER_ID,
  //   });

  //   await user.save();

  //   // Send email verification
  //   const token = await this.createVerificationToken({ id: user.id });
  //   const tokenExpiresIn = this.configService.getOrThrow(
  //     'auth.confirmEmailExpires',
  //     {
  //       infer: true,
  //     },
  //   );
  //   await this.cacheManager.set(
  //     createCacheKey(CacheKey.EMAIL_VERIFICATION, user.id),
  //     token,
  //     ms(tokenExpiresIn),
  //   );
  //   await this.emailQueue.add(
  //     JobName.EMAIL_VERIFICATION,
  //     {
  //       email: dto.email,
  //       token,
  //     } as IVerifyEmailJob,
  //     { attempts: 3, backoff: { type: 'exponential', delay: 60000 } },
  //   );

  //   return plainToInstance(RegisterResDto, {
  //     userId: user.id,
  //   });
  // }

  // async logout(userToken: JwtPayloadType): Promise<void> {
  //   await this.cacheManager.store.set<boolean>(
  //     createCacheKey(CacheKey.SESSION_BLACKLIST, userToken.sessionId),
  //     true,
  //     userToken.exp * 1000 - Date.now(),
  //   );
  //   await SessionEntity.delete(userToken.sessionId);
  // }

  // async refreshToken(dto: RefreshReqDto): Promise<RefreshResDto> {
  //   const { sessionId, hash } = this.verifyRefreshToken(dto.refreshToken);
  //   const session = await SessionEntity.findOneBy({ id: sessionId });

  //   if (!session || session.hash !== hash) {
  //     throw new UnauthorizedException();
  //   }

  //   const user = await this.userRepository.findOneOrFail({
  //     where: { id: session.userId },
  //     select: ['id'],
  //   });

  //   const newHash = crypto
  //     .createHash('sha256')
  //     .update(randomStringGenerator())
  //     .digest('hex');

  //   SessionEntity.update(session.id, { hash: newHash });

  //   return await this.createToken({
  //     id: user.id,
  //     sessionId: session.id,
  //     hash: newHash,
  //   });
  // }

  // async verifyAccessToken(token: string): Promise<JwtPayloadType> {
  //   let payload: JwtPayloadType;
  //   try {
  //     payload = this.jwtService.verify(token, {
  //       secret: this.configService.getOrThrow('auth.secret', { infer: true }),
  //     });
  //   } catch {
  //     throw new UnauthorizedException();
  //   }

  //   // Force logout if the session is in the blacklist
  //   const isSessionBlacklisted = await this.cacheManager.store.get<boolean>(
  //     createCacheKey(CacheKey.SESSION_BLACKLIST, payload.sessionId),
  //   );

  //   if (isSessionBlacklisted) {
  //     throw new UnauthorizedException();
  //   }

  //   return payload;
  // }

  // private verifyRefreshToken(token: string): JwtRefreshPayloadType {
  //   try {
  //     return this.jwtService.verify(token, {
  //       secret: this.configService.getOrThrow('auth.refreshSecret', {
  //         infer: true,
  //       }),
  //     });
  //   } catch {
  //     throw new UnauthorizedException();
  //   }
  // }

  // private async createVerificationToken(data: { id: string }): Promise<string> {
  //   return await this.jwtService.signAsync(
  //     {
  //       id: data.id,
  //     },
  //     {
  //       secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
  //         infer: true,
  //       }),
  //       expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
  //         infer: true,
  //       }),
  //     },
  //   );
  // }

  // private async createToken(data: {
  //   id: string;
  //   sessionId: string;
  //   hash: string;
  // }): Promise<Token> {
  //   const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
  //     infer: true,
  //   });
  //   const tokenExpires = Date.now() + ms(tokenExpiresIn);

  //   const [accessToken, refreshToken] = await Promise.all([
  //     await this.jwtService.signAsync(
  //       {
  //         id: data.id,
  //         role: '', // TODO: add role
  //         sessionId: data.sessionId,
  //       },
  //       {
  //         secret: this.configService.getOrThrow('auth.secret', { infer: true }),
  //         expiresIn: tokenExpiresIn,
  //       },
  //     ),
  //     await this.jwtService.signAsync(
  //       {
  //         sessionId: data.sessionId,
  //         hash: data.hash,
  //       },
  //       {
  //         secret: this.configService.getOrThrow('auth.refreshSecret', {
  //           infer: true,
  //         }),
  //         expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
  //           infer: true,
  //         }),
  //       },
  //     ),
  //   ]);
  //   return {
  //     accessToken,
  //     refreshToken,
  //     tokenExpires,
  //   } as Token;
  // }
}
