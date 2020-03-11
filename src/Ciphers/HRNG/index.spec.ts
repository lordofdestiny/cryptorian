import { HRNG } from "./index";

import "../../jestModule";

describe("HRNG tests", () => {
  test("drawHRNG", () => {
    const hrng = new HRNG(10, 0, 2);
    const text = hrng.drawHRNG();
    expect(text).toBeDefined();
    console.log("\n" + text + "\n");
  });
});
