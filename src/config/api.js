/*export const BASIC_AUTH_11 = {
  username: "ws.rbu11",
  password: "sonda2023",
};
export const BASIC_AUTH_13 = {
  username: "ws.rbu13",
  password: "sonda2023",
};

export const XML_AUTH_11 = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get="https://sonda.com/posicionamientoenlineaws/ws/GetPosicionEnLineaPass">
  <soapenv:Header/>
  <soapenv:Body>
      <get:GetPosicionEnLineaPass>
          <get:usuario>ws.rbu11</get:usuario>
          <get:clave>sonda2023</get:clave>
      </get:GetPosicionEnLineaPass>
  </soapenv:Body>
  </soapenv:Envelope>
`;

export const XML_AUTH_13 = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get="https://sonda.com/posicionamientoenlineaws/ws/GetPosicionEnLineaPass">
  <soapenv:Header/>
  <soapenv:Body>
      <get:GetPosicionEnLineaPass>
          <get:usuario>ws.rbu13</get:usuario>
          <get:clave>sonda2023</get:clave>
      </get:GetPosicionEnLineaPass>
  </soapenv:Body>
  </soapenv:Envelope>
`;*/

export const BASIC_AUTH_11 = {
  username: "ws.rbu_U11",
  password: "sonda2023",
};

export const BASIC_AUTH_13 = {
  username: "ws.rbu_U13",
  password: "sonda2023",
};

export const XML_AUTH_11 = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get="https://sonda.com/posenlineaRBUws/ws/GetPosenLineaRBU">
  <soapenv:Header/>
  <soapenv:Body>
      <get:GetPosenLineaRBU>
          <get:usuario>ws.rbu_U11</get:usuario>
      </get:GetPosenLineaRBU>
  </soapenv:Body>
  </soapenv:Envelope>
`;

export const XML_AUTH_13 = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get="https://sonda.com/posenlineaRBUws/ws/GetPosenLineaRBU">
  <soapenv:Header/>
  <soapenv:Body>
      <get:GetPosenLineaRBU>
          <get:usuario>ws.rbu_U13</get:usuario>
      </get:GetPosenLineaRBU>
  </soapenv:Body>
  </soapenv:Envelope>
`;