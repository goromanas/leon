import { Environment } from 'app/model/environment';

const environment: Environment = process.env.NODE_ENV as Environment;

export { environment };
