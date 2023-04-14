import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const redisClient = createClient();
  redisClient
    .connect()
    .then(() => console.log('Подключились к редису'))
    .catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
  });

  app.use(
    session({
      store: redisStore,
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: Number(configService.get<string>('SESSION_MAX_AGE')),
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
  console.log('Server started on port ' + PORT);
}
bootstrap();
