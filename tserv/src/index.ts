// import "@babel/polyfill";
import {runModbus} from './controllers/modPooling';
import {runWebSocketServer} from './controllers/clientsCommunication';
import {runRulesEngine} from './controllers/rulesEngine';

runModbus();
runWebSocketServer();
runRulesEngine();
