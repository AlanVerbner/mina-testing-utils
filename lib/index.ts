import configFieldMatchers from "./matchers/common-types";
import configBoolMatchers  from "./matchers/bool";
import configSignatureMatchers from "./matchers/signature";
import configFailMatchers from "./matchers/to-fail";

configFieldMatchers();
configBoolMatchers();
configSignatureMatchers();
configFailMatchers();