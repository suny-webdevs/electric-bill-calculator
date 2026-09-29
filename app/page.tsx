"use client"

import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { calculator, initialInvoice, Invoice } from "@/lib/utility/calculator"

export default function HomePage() {
  const [units, setUnits] = useState("")
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice)
  const [error, setError] = useState("")
  const invoiceRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const win = window as any
    const popoverTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="popover"]'),
    )

    popoverTriggerList.forEach((popoverTriggerEl) => {
      if (win.bootstrap) {
        new win.bootstrap.Popover(popoverTriggerEl)
      }
    })
  }, [])

  const handleSubmit = () => {
    const value = Number(units)

    if (!value || value <= 0) {
      setError("Please enter a valid unit number")
      return
    }

    setError("")
    setInvoice(calculator(value))
    setUnits("")
  }

  const handleReset = () => {
    setError("")
    setUnits("")
    setInvoice(initialInvoice)
  }

  const handlePdf = () => {
    if (typeof window === "undefined" || !invoiceRef.current) {
      return
    }

    const win = window as any
    if (!win.html2pdf) {
      return
    }

    const options = {
      margin: 0.5,
      filename: "electric-bill-invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    }

    win.html2pdf().from(invoiceRef.current).set(options).save()
  }

  return (
    <main className="page">
      <header className="bg-primary py-2 mb-5 position-fixed top-0 start-0 w-100 text-center">
        <span className="px-5 text-light text-lg">
          Electric Bill Calculator
        </span>
      </header>

      <div className="container mt-5 pt-4">
        <div className="hstack gap-3 mt-3">
          <input
            className="form-control"
            type="text"
            placeholder="Enter unit here..."
            value={units}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUnits(event.target.value)
            }
            autoFocus
          />
          <Button
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <div className="vr" />
          <Button
            type="button"
            variant="destructive"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>

        {error ? <div className="alert alert-danger mt-3">{error}</div> : null}

        <div
          className="container my-3 border border-primary border-1 px-5 py-4 w-100"
          id="invoice"
          ref={invoiceRef}
        >
          <h3 className="display-4 mb-4">Electric Bill Invoice</h3>
          <p id="unitNumber">Unit: {invoice.unitNumber}</p>
          <p id="netCharge">Net Charge: {invoice.netCharge} Taka</p>
          <p id="demandCharge">Demand Charge: {invoice.demandCharge} Taka</p>
          <p id="vat">Vat(5.4%): {invoice.vat} Taka</p>
          <p id="meterCharge">Meter Charge: {invoice.meterCharge} Taka</p>
          <hr />
          <p
            className="fw-bold"
            id="totalCharge"
          >
            Total Charge: {invoice.totalCharge} Taka
          </p>
          <p className="copyright w-100 float-end">
            &copy; Powered by{" "}
            <a href="https://github.com/suny-dev">Md Suny Shaikh</a>
          </p>
        </div>

        <Button
          type="button"
          className="w-100"
          variant="secondary"
          onClick={handlePdf}
        >
          Download bill invoice
        </Button>

        <br />

        <a
          href="https://github.com/suny-dev/electric-bill-calculator/"
          className="text-primary my-3 d-inline-block"
        >
          Contribute on github in this project
        </a>
      </div>
    </main>
  )
}
