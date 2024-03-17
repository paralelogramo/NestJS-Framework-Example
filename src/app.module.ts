import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResearcherModule } from './researcher/researcher.module';
import { ConferenceModule } from './conference/conference.module';
import { EditionModule } from './edition/edition.module';
import { ArticleModule } from './article/article.module';
import { AuthorModule } from './author/author.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeOrmConfigService';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiResponseInterceptor } from './interceptors/api-response-interceptor';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    JwtModule.register({
      secret: 'THISISAVERYSECRETKEYANDSHOULDNOTBESHAREDWITHANYONEELSE',
      signOptions: { expiresIn: '24h' }
    }),
    ResearcherModule, 
    ConferenceModule, 
    EditionModule, 
    ArticleModule, 
    AuthorModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
  ],
  exports: [
    JwtModule
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('/api/auth/**').forRoutes('*');
  }
}
