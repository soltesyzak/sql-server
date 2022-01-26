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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = __importDefault(require("express"));
const profileModel = __importStar(require("../models/profile"));
const profileRouter = express_1.default.Router();
exports.profileRouter = profileRouter;
profileRouter.get("/", async (req, res) => {
    profileModel.findAll((err, profiles) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        return res.status(200).json({ data: profiles });
    });
});
profileRouter.post("/", async (req, res) => {
    const newProfile = req.body;
    profileModel.create(newProfile, (err, id) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        return res.status(200).json({ profileId: id });
    });
});
profileRouter.get("/:id", async (req, res) => {
    const profileId = Number(req.params.id);
    profileModel.findOne(profileId, (err, profile) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        return res.status(200).json({ data: profile });
    });
});
profileRouter.put("/:id", async (req, res) => {
    const profile = req.body;
    profileModel.update(profile, (err) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        return res.status(200).json({ OK: true });
    });
});
