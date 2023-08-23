import { Bool, Field, Int64, PrivateKey, PublicKey, Scalar, UInt32, UInt64 } from "snarkyjs";
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

  describe("toEqualPublicKey", () => {
    it("should pass when pks are equal", () => {
      const privateKey = PrivateKey.random();
      const pk1 = privateKey.toPublicKey();
      const pk2 = privateKey.toPublicKey();
      expect(pk1).toEqualPublicKey(pk2);
    });

    it("should fail when pks are not equal", () => {
      const privateKey1 = PrivateKey.random();
      const privateKey2 = PrivateKey.random();
      const pk1 = privateKey1.toPublicKey();
      const pk2 = privateKey2.toPublicKey();
      expect(pk1).not.toEqualPublicKey(pk2);
    });

    it("Should fail if not proper type", () => {
      const privateKey = PrivateKey.random();
      const pk = privateKey.toPublicKey();
      try {
        expect("invalid").toEqualPublicKey(pk);
        fail("Should have thrown");
      } catch (e) {
        expect(e.message).toBe("Expected invalid to be a PublicKey");
      }
    })
  });

  describe("toEqualInt64", () => {
    it("should pass when ints are equal", () => {
      const int1 = Int64.fromField(Field(10));
      const int2 = Int64.fromField(Field(10));
      expect(int1).toEqualInt64(int2);
    });

    it("should pass when ints are equal using a string", () => {
      const int = Int64.fromField(Field(10));
      expect(int).toEqualInt64("10");
    });

    it("should fail when fields are not equal", () => {
      const int1 = Int64.fromField(Field(20));
      const int2 = Int64.fromField(Field(10));
      expect(int1).not.toEqualInt64(int2);
    });

    it("Should fail if not proper type", () => {
      const int = Int64.fromField(Field(10));
      try {
        expect("invalid").toEqualInt64(int);
        fail("Should have thrown");
      } catch (e) {
        expect(e.message).toBe("Expected invalid to be a Int64");
      }
    })
  });

  describe("toEqualUInt64", () => {
    it("should pass when uints are equal", () => {
      const num1 = UInt64.fromFields([Field(10)]);
      expect(num1).toEqualUInt64(Field(10));
    });

    it("should pass when uints are equal using a string", () => {
      const num1 = UInt64.fromFields([Field(10)]);
      expect(num1).toEqualUInt64("10");
    });

    it("should fail when fields are not equal", () => {
      const num1 = UInt64.fromFields([Field(20)]);
      expect(num1).not.toEqualUInt64(Field(10));
    });

    it("Should fail if not proper type", () => {
      try {
        expect("invalid").toEqualUInt64(Field(20));
        fail("Should have thrown");
      } catch (e) {
        expect(e.message).toBe("Expected invalid to be a UInt64");
      }
    })
  });

  describe("toEqualUInt64", () => {
    it("should pass when uints are equal", () => {
      const num1 = UInt32.fromFields([Field(10)]);
      expect(num1).toEqualUInt32(Field(10));
    });

    it("should pass when uints are equal using a string", () => {
      const num1 = UInt32.fromFields([Field(10)]);
      expect(num1).toEqualUInt32("10");
    });

    it("should fail when fields are not equal", () => {
      const num1 = UInt32.fromFields([Field(20)]);
      expect(num1).not.toEqualUInt32(Field(10));
    });

    it("Should fail if not proper type", () => {
      try {
        expect("invalid").toEqualUInt32(Field(20));
        fail("Should have thrown");
      } catch (e) {
        expect(e.message).toBe("Expected invalid to be a UInt32");
      }
    })
  });
});
