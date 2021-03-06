import Event from "./entity/Event";
import SurveyQuestion from "./entity/SurveyQuestion";
import SurveyResult from "./entity/SurveyResult";
import Receipt from "./entity/Receipt";
import EventParticipant from "./entity/EventParticipant";
import Payment from "./entity/Payment";
import UserProfile from "./entity/UserProfile";

import {
  ConnectionManager,
  ConnectionOptions,
  getManager,
  getConnection,
  createConnection
} from "typeorm";
const connectionManager = new ConnectionManager();
const ormConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [
    Event,
    SurveyQuestion,
    SurveyResult,
    EventParticipant,
    Receipt,
    Payment,
    UserProfile
  ],
  synchronize: true,
  logging: false
};

console.log(JSON.stringify(ormConfig, null, 4));

class ConnectDB {
  constructor() {}
  connect = async () => {
    return await createConnection(ormConfig);
  };
  getRepository = (entityName: any) => {
    return getConnection().getRepository(entityName);
  };
  getManager = () => {
    return getManager();
  };
}

export default new ConnectDB();
