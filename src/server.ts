import express, { Request, Response } from 'express';
import morgan from 'morgan'
import os from 'os';
import salaoRoutes from './routes/salao.routes';
import cors from 'cors'
import serviceRoutes from './routes/service.routes';
import horarioRoutes from './routes/horario.routes';
import geolocalizationRoutes from './routes/geolocalization.routes';
import colaboradorRoutes from './routes/colaborador.routes';
import ClientRoutes from './routes/cliente.routes';
import salaoColaboradorRoutes from './routes/salaoColaborador.routes';
import DocumentsRoute from './routes/documents.routes';

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/salao', salaoRoutes);
app.use('/services', serviceRoutes);
app.use('/horario', horarioRoutes);
app.use('/geolocalizations', geolocalizationRoutes);
app.use('/colaboradores', colaboradorRoutes);
app.use('/client', ClientRoutes);
app.use("/salaocolaboradores", salaoColaboradorRoutes)
app.use("/document", DocumentsRoute)

app.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'Hello World'
  });
});

app.listen(8000, () => {
  const ipAddress = getContainerIPAddress();

  if (ipAddress?.startsWith("192")) {
    console.log(`\n__ ALERT ~/ \n\nServer is running at \n http://${ipAddress}:8000/ <----  \n`);
  } else {
    console.error('Unable to find the IP address of the container.');
  }
});

/**
 * Função que retorna o endereço IP do contêiner, se encontrado.
 * @returns {string|null} O endereço IP do contêiner, ou null se não encontrado.
 */
function getContainerIPAddress() {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    const containerInterface = interfaces?.find(isContainerInterface);

    if (containerInterface) {
      return containerInterface.address;
    }
  }

  return null;
}

/**
 * Função auxiliar para verificar se uma interface de rede é a do contêiner.
 *
 * @param {Object} interfaceInfo - Informações da interface de rede. Veja a descrição abaixo para os detalhes das propriedades.
 * @returns {boolean} Retorna true se a interface não é interna (do tipo loopback) e pertence à família de endereços IPv4, caso contrário retorna false.
 *
 * @description
 * Informações da interface de rede:
 * - `internal` (boolean): Indica se a interface é interna (do tipo loopback) ou não.
 * - `family` (string): A família de endereços IP da interface de rede. No contexto deste código, representa o tipo de protocolo IP utilizado (por exemplo, "IPv4" ou "IPv6").
 */
function isContainerInterface(interfaceInfo: { internal: boolean, family: string }) {
  return !interfaceInfo.internal && interfaceInfo.family === 'IPv4';
}
