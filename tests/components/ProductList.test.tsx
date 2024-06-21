import { render, screen } from "@testing-library/react"
import ProductList from "../../src/components/ProductList"
import { server } from "../mocks/server"
import { HttpResponse, http } from "msw"
import { db } from "../mocks/db"

describe("ProductList", () => {
  const productIds: number[] = []

  beforeAll(() => {
    const number = [1, 2, 3]
    number.forEach(() => {
      const product = db.product.create()
      productIds.push(product.id)
    })
  })

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productIds } } })
  })

  it("should render a list of products", async () => {
    render(<ProductList />)

    const items = await screen.findAllByRole("listitem")
    expect(items.length).toBeGreaterThan(0)
  })

  it("should render no products available if no product is found", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])))

    render(<ProductList />)

    const message = await screen.findByText(/no products/i)
    expect(message).toBeInTheDocument()
  })
})
