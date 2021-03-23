import path from "path";
import fs from "fs";

interface IServerInfo {
  smpt: {
    port: number;
    host: string;
  };
  imap: {
    port: number;
    host: string;
  };
}
interface ILocalInfo {
  port: number;
  host: string;
}
export let LocalInfo: ILocalInfo = {
  port: 3001,
  host: "http://localhost/",
};
