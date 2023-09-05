import { CircuitString, PrivateKey, Signature } from "snarkyjs";
import "../../lib/index"

describe("signatureMatchers", () => {
  describe("toEqualSignature", () => {
    it("should pass when signatures are equal", () => {
        const pk = PrivateKey.random();
        const str = CircuitString.fromString('message');
        const signature1 = Signature.create(pk, str.toFields());
        const signature2 = Signature.create(pk, str.toFields());
        expect(signature1).toEqualSignature(signature2);
    });

    it("should fail when signers are not equal", () => {
        const pk1 = PrivateKey.random();
        const pk2 = PrivateKey.random();
        const str = CircuitString.fromString('message');
        const signature1 = Signature.create(pk1, str.toFields());
        const signature2 = Signature.create(pk2, str.toFields());
        expect(signature1).not.toEqualSignature(signature2);
    });

    it("should fail when messages are not equal", () => {
        const pk = PrivateKey.random();
        const str1 = CircuitString.fromString('message1');
        const str2 = CircuitString.fromString('message2');
        const signature1 = Signature.create(pk, str1.toFields());
        const signature2 = Signature.create(pk, str2.toFields());
        expect(signature1).not.toEqualSignature(signature2);
    });

    it("Should fail if not proper type", () => {
        const pk = PrivateKey.random();
        const str = CircuitString.fromString('message');
        const signature = Signature.create(pk, str.toFields());
        try {
            expect("invalid").toEqualSignature(signature);
            fail("Should have thrown");
        } catch (e) {
            expect(e.message).toBe("Expected invalid to be a Signature");
        }
    })
  });

  describe("signerToBe", () => {
    it("should pass when the signer is right", () => {
        const pk = PrivateKey.random();
        const str = CircuitString.fromString('message');
        const signature = Signature.create(pk, str.toFields());
        expect(signature).signerToBe(pk.toPublicKey(), str.toFields());
    });

    it("should not pass when the signer is not right", () => {
        const pk = PrivateKey.random();
        const str = CircuitString.fromString('message');
        const signature = Signature.create(pk, str.toFields());
        const pubk = PrivateKey.random().toPublicKey();
        expect(signature).not.signerToBe(pubk, str.toFields());
    });

    it("should not pass when the message is not right", () => {
        const pk = PrivateKey.random();
        const str1 = CircuitString.fromString('message');
        const signature = Signature.create(pk, str1.toFields());
        const str2 = CircuitString.fromString('anothermessage');
        expect(signature).not.signerToBe(pk.toPublicKey(), str2.toFields());
    });
  });
});