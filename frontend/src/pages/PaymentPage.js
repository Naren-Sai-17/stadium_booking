import React, { useEffect } from 'react'

export default function PaymentPage() {
    useEffect(() => {
        document.title = 'Select Seats - Sports League'
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>PaymentPage</div>
    )
}
