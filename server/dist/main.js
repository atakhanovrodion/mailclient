"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ServerInfo_1 = require("./ServerInfo");
var IMAP = __importStar(require("./IMAP"));
var SMTP = __importStar(require("./SMTP"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});
app.get("/mailboxes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serverInfo, imapWorker, mailboxes, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("GET /mailboxes ");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                serverInfo = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "serverinfo.json")).toString());
                imapWorker = new IMAP.Worker(serverInfo);
                return [4, imapWorker.getListOfMailboxes()];
            case 2:
                mailboxes = _a.sent();
                console.log("GET /mailboxes", mailboxes);
                res.json(mailboxes);
                return [3, 4];
            case 3:
                err_1 = _a.sent();
                console.log("GET /mailboxes error", err_1);
                res.send(err_1);
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
app.post("/auth", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serverInfo, imapWorker, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("POST /auth s", req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                serverInfo = {
                    imap: {
                        host: req.body.host,
                        port: 993,
                        auth: { user: req.body.user, pass: req.body.password },
                    },
                    smtp: {
                        host: req.body.hostsmtp,
                        port: 465,
                        auth: { user: req.body.user, pass: req.body.password },
                    },
                };
                imapWorker = new IMAP.Worker(serverInfo);
                return [4, imapWorker.Auth()];
            case 2:
                _a.sent();
                fs_1.default.writeFile(path_1.default.join(__dirname, "..", "serverinfo.json"), JSON.stringify(serverInfo), function (err) {
                    if (err)
                        throw err;
                    res.send("succes");
                });
                return [3, 4];
            case 3:
                err_2 = _a.sent();
                console.log("error", err_2);
                res.send("error");
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
app.get("/mailboxes/:mailbox", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serverInfo, imapWorker, messages, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("GET /mailboxes/" + req.params.mailbox + " ");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                serverInfo = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "serverinfo.json")).toString());
                imapWorker = new IMAP.Worker(serverInfo);
                return [4, imapWorker.getMailbox({
                        mailbox: req.params.mailbox,
                    })];
            case 2:
                messages = _a.sent();
                console.log("GET /mailboxes/:mailbox", messages);
                res.json(messages);
                return [3, 4];
            case 3:
                err_3 = _a.sent();
                console.log("error", err_3);
                res.send("error");
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
app.get("/mailboxes/:mailbox/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serverInfo, imapWorker, messageBody, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("GET /mailboxes/" + req.params.mailbox + "/" + req.params.id + " ");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                serverInfo = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "serverinfo.json")).toString());
                imapWorker = new IMAP.Worker(serverInfo);
                return [4, imapWorker.getMessageBody({
                        mailbox: req.params.mailbox,
                        id: parseInt(req.params.id, 10),
                    })];
            case 2:
                messageBody = _a.sent();
                console.log("/GET messageBody", messageBody);
                res.send(messageBody);
                return [3, 4];
            case 3:
                err_4 = _a.sent();
                console.log("error", err_4);
                res.send("error");
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
app.delete("/mailboxes/:mailbox/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serverInfo, imapWorker, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("DELETE /mailboxes/" + req.params.mailbox + "/" + req.params.id + " ");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                serverInfo = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "serverinfo.json")).toString());
                imapWorker = new IMAP.Worker(serverInfo);
                return [4, imapWorker.deleteMessage({
                        mailbox: req.params.mailbox,
                        id: parseInt(req.params.id, 10),
                    })];
            case 2:
                _a.sent();
                console.log("/DELETE");
                res.send("ok");
                return [3, 4];
            case 3:
                err_5 = _a.sent();
                console.log("error:", err_5);
                res.send(err_5);
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
app.post("/message", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serverInfo, smptWorker, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("/POST message ", req.body);
                serverInfo = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "serverinfo.json")).toString());
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                smptWorker = new SMTP.Worker(serverInfo);
                return [4, smptWorker.sendMail(req.body)];
            case 2:
                _a.sent();
                res.send("ok");
                return [3, 4];
            case 3:
                err_6 = _a.sent();
                console.log("POST /messages: Error", err_6);
                res.send("err");
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
app.listen(ServerInfo_1.LocalInfo.port, function () {
    console.log("Server on");
});
//# sourceMappingURL=main.js.map