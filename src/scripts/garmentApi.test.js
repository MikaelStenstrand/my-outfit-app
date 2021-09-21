const garmentApi = require("./garmentApi")
// @ponicode
describe("garmentApi.createGarmentAPI", () => {
    test("0", async () => {
        await garmentApi.createGarmentAPI({ name: "Edmond", description: "No description available.", type: "number", photoURI: "1.0.0" })
    })

    test("1", async () => {
        await garmentApi.createGarmentAPI({ name: "Anas", description: "Print Base", type: "number", photoURI: "^5.0.0" })
    })

    test("2", async () => {
        await garmentApi.createGarmentAPI({ name: "Michael", description: " description ", type: "number", photoURI: "^5.0.0" })
    })

    test("3", async () => {
        await garmentApi.createGarmentAPI({ name: "Michael", description: "No description.", type: "number", photoURI: "1.0.0" })
    })

    test("4", async () => {
        await garmentApi.createGarmentAPI({ name: "Michael", description: "No description available.", type: "number", photoURI: "v4.0.0-rc.4" })
    })

    test("5", async () => {
        await garmentApi.createGarmentAPI(undefined)
    })
})

// @ponicode
describe("garmentApi.listGarmentsAPI", () => {
    test("0", async () => {
        await garmentApi.listGarmentsAPI(["--testrunner=", "--%s", "-created", "-updated", "-resolved", "--email", "--pw", "--domain", "--localtime", "--utc", "--count", "--topcount", "unknown option: ", "--user", "--embed", "--include-dir", "--cleanup", "--annotate-coverage", "--convert-range", "--line-directives", "--no-c-in-traceback", "--gdb", "--gdb-outdir", "--lenient", -2, -3, "--capi-reexport-cincludes", "--fast-fail", "--old-style-globals", "--directive", "Unknown debug flag: %s\n", "Unknown compiler flag: %s\n", "-u", "--image", "-i"])
    })

    test("1", async () => {
        await garmentApi.listGarmentsAPI(false)
    })

    test("2", async () => {
        await garmentApi.listGarmentsAPI(undefined)
    })
})

// @ponicode
describe("garmentApi.deleteGarmentAPI", () => {
    test("0", async () => {
        await garmentApi.deleteGarmentAPI({ id: "bc23a9d531064583ace8f67dad60f6bb" })
    })

    test("1", async () => {
        await garmentApi.deleteGarmentAPI({ id: 12345 })
    })

    test("2", async () => {
        await garmentApi.deleteGarmentAPI({ id: 56784 })
    })

    test("3", async () => {
        await garmentApi.deleteGarmentAPI({ id: 987650 })
    })

    test("4", async () => {
        await garmentApi.deleteGarmentAPI({ id: 12 })
    })

    test("5", async () => {
        await garmentApi.deleteGarmentAPI({ id: Infinity })
    })
})

// @ponicode
describe("garmentApi.subscribeToUpdateGarmentAPI", () => {
    test("0", async () => {
        await garmentApi.subscribeToUpdateGarmentAPI("bc23a9d531064583ace8f67dad60f6bb")
    })

    test("1", async () => {
        await garmentApi.subscribeToUpdateGarmentAPI(9876)
    })

    test("2", async () => {
        await garmentApi.subscribeToUpdateGarmentAPI("da7588892")
    })

    test("3", async () => {
        await garmentApi.subscribeToUpdateGarmentAPI("c466a48309794261b64a4f02cfcc3d64")
    })

    test("4", async () => {
        await garmentApi.subscribeToUpdateGarmentAPI(12345)
    })

    test("5", async () => {
        await garmentApi.subscribeToUpdateGarmentAPI(undefined)
    })
})

// @ponicode
describe("garmentApi.subscribeToCreateGarmentAPI", () => {
    test("0", async () => {
        await garmentApi.subscribeToCreateGarmentAPI("bc23a9d531064583ace8f67dad60f6bb")
    })

    test("1", async () => {
        await garmentApi.subscribeToCreateGarmentAPI("da7588892")
    })

    test("2", async () => {
        await garmentApi.subscribeToCreateGarmentAPI(12345)
    })

    test("3", async () => {
        await garmentApi.subscribeToCreateGarmentAPI("c466a48309794261b64a4f02cfcc3d64")
    })

    test("4", async () => {
        await garmentApi.subscribeToCreateGarmentAPI(9876)
    })

    test("5", async () => {
        await garmentApi.subscribeToCreateGarmentAPI(undefined)
    })
})

// @ponicode
describe("garmentApi.subscribeToDeleteGarmentAPI", () => {
    test("0", async () => {
        await garmentApi.subscribeToDeleteGarmentAPI(12345)
    })

    test("1", async () => {
        await garmentApi.subscribeToDeleteGarmentAPI("bc23a9d531064583ace8f67dad60f6bb")
    })

    test("2", async () => {
        await garmentApi.subscribeToDeleteGarmentAPI("c466a48309794261b64a4f02cfcc3d64")
    })

    test("3", async () => {
        await garmentApi.subscribeToDeleteGarmentAPI(9876)
    })

    test("4", async () => {
        await garmentApi.subscribeToDeleteGarmentAPI("da7588892")
    })

    test("5", async () => {
        await garmentApi.subscribeToDeleteGarmentAPI(undefined)
    })
})
