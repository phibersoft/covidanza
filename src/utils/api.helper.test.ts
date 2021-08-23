import { failureResult, successResult } from "./api.helper";

describe("Data Handling", () => {
  test("Success Result", () => {
    const a = successResult("test");
    expect(a).toMatchObject({
      success: true,
      data: "test",
    });
  });

  test("Failure Result", () => {
    const a = failureResult("test");
    expect(a).toMatchObject({
      success: false,
      message: "test",
    });
  });
});
