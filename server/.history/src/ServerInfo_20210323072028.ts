interface ILocalInfo {
  port: number;
  host: string;
}
export interface IServerInfo {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

export let LocalInfo: ILocalInfo = {
  port: 3001,
  host: "http://localhost/",
};
