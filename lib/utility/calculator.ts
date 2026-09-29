export interface Invoice {
  unitNumber: number
  netCharge: number
  demandCharge: number
  vat: number
  meterCharge: number
  totalCharge: number
}

export const initialInvoice: Invoice = {
  unitNumber: 0,
  netCharge: 0,
  demandCharge: 60,
  vat: 0,
  meterCharge: 10,
  totalCharge: 0,
}

export const calculator = (units: number) => {
  const demandCharge = 60
  const meterCharge = 10
  let netCharge = 0

  if (units <= 75) {
    netCharge = Math.round(units * 4.19)
  } else if (units <= 200) {
    netCharge = Math.round(75 * 4.19 + (units - 75) * 5.72)
  } else if (units <= 300) {
    netCharge = Math.floor(75 * 4.19 + 125 * 5.72 + (units - 200) * 6)
  } else if (units <= 400) {
    netCharge = Math.floor(
      75 * 4.19 + 125 * 5.72 + 100 * 6 + (units - 300) * 6.34,
    )
  } else if (units <= 600) {
    netCharge = Math.floor(
      75 * 4.19 + 125 * 5.72 + 100 * 6 + 100 * 6.34 + (units - 400) * 9.94,
    )
  } else {
    netCharge = Math.floor(
      75 * 4.19 +
        125 * 5.72 +
        100 * 6 +
        100 * 6.34 +
        200 * 9.94 +
        (units - 600) * 9.94,
    )
  }

  const vat = Math.round(netCharge * 0.054)
  const totalCharge = netCharge + demandCharge + meterCharge + vat

  return {
    unitNumber: units,
    netCharge,
    demandCharge,
    vat,
    meterCharge,
    totalCharge,
  }
}
