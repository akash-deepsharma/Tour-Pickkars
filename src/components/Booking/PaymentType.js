import { decrypt, encrypt } from "@/functions/crypt";

export default function PaymentType({
  paybleType,
  setPaybleType,
  fullAmount,
  slug,
  razorpay_key,
}) {
  const bookingData = (() => {
    try {
      return JSON.parse(decrypt(localStorage.getItem(`enlive_${slug}`))) || {};
    } catch {
      return {};
    }
  })();

  localStorage.setItem(
    `enlive_${slug}`,
    encrypt(
    JSON.stringify({
      ...bookingData,
      payment_type: paybleType,
    }))
  );
  return (
    <div className="min_box-detail container my-4 p-4">
      <div className="detail-section-header mb-4">
        <h3 className="section-title-premium">Payment Options</h3>
      </div>

      <div className="row g-3">
        {/* Partial Payment */}
        <div className="col-md-6">
          <div
            className={`payment-method-card ${paybleType === "half" ? "active" : ""}`}
            onClick={() => setPaybleType("half")}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="payment-card-icon">💳</div>
              <div className="form-check m-0">
                <input
                  type="radio"
                  className="form-check-input"
                  name="payment"
                  checked={paybleType === "half"}
                  readOnly
                />
              </div>
            </div>
            <h5 className="fw-bold text-dark mb-1">
              Pay {razorpay_key.package_amount_percent}% Advance
            </h5>
            <p className="text-muted small mb-3">Secure your spot with a partial payment</p>
            <div className="payment-amount-display">
              <span className="fs-4 fw-800 text-primary">₹ {((fullAmount * razorpay_key.package_amount_percent) / 100).toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Full Payment */}
        <div className="col-md-6">
          <div
            className={`payment-method-card ${paybleType === "full" ? "active" : ""}`}
            onClick={() => setPaybleType("full")}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="payment-card-icon">💰</div>
              <div className="form-check m-0">
                <input
                  type="radio"
                  className="form-check-input"
                  name="payment"
                  checked={paybleType === "full"}
                  readOnly
                />
              </div>
            </div>
            <h5 className="fw-bold text-dark mb-1">Full Payment</h5>
            <p className="text-muted small mb-3">Complete your booking in one go</p>
            <div className="payment-amount-display">
              <span className="fs-4 fw-800 text-primary">₹ {fullAmount.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
