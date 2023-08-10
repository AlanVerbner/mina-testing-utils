import { Field } from "snarkyjs";
import configFieldMatchers from "../../lib/matchers/field";

configFieldMatchers();

describe("Field", () => {
  describe("toEqual", () => {
    it("should pass when fields are equal", () => {
      const field1 = Field.from(42);
      const field2 = Field.from(42);

      expect(field1 as Field).toEqual(field2 as Field);
    });

    it("should fail when fields are not equal", () => {
      const field1 = Field.from(42);
      const field2 = Field.from(43);

      expect(field1).not.toEqual(field2);
    });
  });
});
