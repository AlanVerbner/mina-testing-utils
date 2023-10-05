import { Bool, Field } from "o1js";
import "../../lib/index"
import "../../lib/types"

describe("boolMatchers", () => {
  describe("Wrong Type", () => {
    it("should not pass when variable is not Bool", () => {
      const value = new Field(1);
      expect(() => expect(value).toBeTrue()).toThrowError("Expected 1 to be a Bool");
    });
  });
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