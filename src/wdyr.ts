import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

if (process.env.NODE_ENV === "development") {
  console.log("why did you render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
