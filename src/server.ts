require('dotenv').config();

import { apiService } from './index';
import { routes } from './routes';
const port = Number(process.env.SERVER_PORT)

apiService.start(port)
apiService.routes(routes)


