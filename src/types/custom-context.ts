import { Context } from "telegraf";
import Polyglot from "node-polyglot";

export interface MyContext extends Context {
  polyglot: Polyglot;
}
