import { describe, it } from "vitest"
import { db } from "./mocks/db"

describe("group", () => {
  it("should", () => {
    db.product.create({ name: "Apple" })
    console.log(db.product.count())
  })
})
