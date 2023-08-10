import { Bool } from "snarkyjs";
import "../../lib/index"
import "../../lib/types"

describe("boolMatchers", () => {
  describe("toBeTrue", () => {
    it("should pass when the value is true", () => {
      const value = new Bool(true);
      expect(value).toBeTrue();
    });

    it("should fail when the value is false", () => {
      const value = new Bool(false);
      expect(() => expect(value).toBeTrue()).toThrowError();
    });
  });

  describe("toBeFalse", () => {
    it("should pass when the value is false", () => {
      const value = new Bool(false);
      expect(value).toBeFalse();
    });

    it("should fail when the value is true", () => {
      const value = new Bool(true);
      expect(() => expect(value).toBeFalse()).toThrowError();
    });
  });
});