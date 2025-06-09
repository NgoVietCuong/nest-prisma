import { CommandFactory } from 'nest-commander';
import { CommandModule } from './commands';

async function bootstrap() {
  await CommandFactory.run(CommandModule, ['warn', 'error']);
}

void bootstrap();
