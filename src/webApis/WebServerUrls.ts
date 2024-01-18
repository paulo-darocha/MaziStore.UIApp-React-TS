const serverScheme = import.meta.env.VITE_SCHEME;
const serverPort = import.meta.env.VITE_PORT;
const serverHost = import.meta.env.VITE_HOST;

export const server =
   serverPort == 0 || serverPort == undefined
      ? `${serverScheme}://${serverHost}`
      : `${serverScheme}://${serverHost}:${serverPort}`;
      
export const serverApi = `${server}/api`;
