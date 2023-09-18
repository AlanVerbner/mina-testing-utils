import configFieldMatchers from "./matchers/common-types";
import configBoolMatchers  from "./matchers/bool";
import configSignatureMatchers from "./matchers/signature";
import configFailMatchers from "./matchers/to-fail";
import configChangeBalance from "./matchers/to-change-balance";
import configEmitEvents from "./matchers/to-emit-event";

configFieldMatchers();
configBoolMatchers();
configSignatureMatchers();
configFailMatchers();
configChangeBalance();
configEmitEvents();
