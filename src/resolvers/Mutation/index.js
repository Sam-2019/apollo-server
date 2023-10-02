import * as Child from './child.js'
import * as Member  from "./member.js";
import * as SundayService  from "./sundayService.js";
import * as Payment  from "./payment.js";
import * as Pledge  from "./pledge.js";
import * as Visitor  from "./visitor.js";
// import * as Vehicle from "./vehicles.js";
import * as User  from "./user.js";
import * as Logout  from "./logout.js";

const Mutation = {
  ...Child,
  ...Member,
  ...SundayService,
  ...Payment,
  ...Pledge,
  ...Visitor,
  // ...Vehicle,
  ...User,
  ...Logout,
};

export default Mutation;
