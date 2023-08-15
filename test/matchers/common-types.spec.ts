import { Bool, Field } from "snarkyjs";
import configFieldMatchers from "../../lib/matchers/common-types";

configFieldMatchers();

describe("Common Types", () => {
  describe("toEqualField", () => {
    it("should pass when fields are equal", () => {
      expect(Field(42)).toEqualField(Field(42));
    });

    it("should pass when fields are equal if using a string", () => {
      expect(Field(42)).toEqualField("42");
    });

    it("should fail when fields are not equal", () => {
      expect(Field(42)).not.toEqual(Field(43));
    });

    it("Should fail if not proper type", () => {
      try {
        expect("invalid").toEqualField(Field(1));
        fail("Should have thrown");
      } catch (e) {
        expect(e.message).toBe("Expected invalid to be a Field");
      }
    })
  });

  describe("toEqualBool", () => {
    it("should pass when booleans are equal", () => {
      expect(Bool(true)).toEqualBool(Bool(true));
    });

    it("should fail when booleans are not equal", () => {
      expect(Bool(true)).not.toEqualBool(Bool(false));
    });

    it("should fail when booleans are not equal if using native type", () => {
      expect(Bool(true)).toEqualBool(true);
    });

    it("Should fail if not proper type", () => {
      try {
        expect("invalid").toEqualBool(false);
        fail("Should have thrown");
      } catch (e) {
        expect(e.message).toBe("Expected invalid to be a Bool");
      }
    })
  });
});
