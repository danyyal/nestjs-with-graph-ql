import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'backend_nestjs',  // replace with your DB username
      password: 'backend_nestjs_123',  // replace with your DB password
      database: 'test_db',        // replace with your database name
      autoLoadEntities: true,
      synchronize: true, // only for development, use migrations in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
